import React from 'react';
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { db, getDoc, doc } from '../../firebase/db';
import { AdminPageLayout } from '../../components/admin/AdminPageLayout';
import { IUser } from '../../models';
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
} from '../../firebase/db';
import { Column } from 'react-table';
import { DefaultTable } from '../../components/tables';
import { FaEye, FaTimes } from 'react-icons/fa';
import {
  TableActionButtonStyled,
  TableActionContainerStyled,
} from '../../styles/components/tables/DefaultTable';
import AdminViewUserModal from '../../components/admin/AdminViewUserModal';
import { ClipLoaderSpinner } from '../../components/spinners';
import { confirmAlert } from '../../components/alerts/ConfirmAlert';

// // Get the last visible document
// const lastVisible =
//   documentSnapshots.docs[documentSnapshots.docs.length - 1];
// console.log('last', lastVisible);

// // Construct a new query starting at this document,
// // get the next 25 cities.
// const next = query(collection(db, "cities"),
//     orderBy("population"),
//     startAfter(lastVisible),
//     limit(25));

export function AdminManageUsers() {
  const [loading, setLoading] = React.useState(false);
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [selected, setSelected] = React.useState<IUser | null>(null);
  const [open, setOpen] = React.useState(false);

  const openViewModal = (user: IUser) => {
    setSelected(user);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelected(null);
  };

  const handleDeleteUser = (user: IUser) => {
    const { id, firstName, lastName } = user;

    confirmAlert({
      title: 'Confirmation',
      message: `Confirm exclusion of user ${firstName} ${lastName}?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => null,
        },
        {
          label: 'No',
          onClick: () => null,
        },
      ],
    });
  };

  React.useEffect(() => {
    async function getUsers() {
      try {
        setLoading(true);

        // Query the first page of docs
        const first = query(
          collection(db, 'users'),
          orderBy('firstName'),
          orderBy('lastName'),
          limit(25)
        );

        const documentSnapshots = await getDocs(first);

        const users: IUser[] = [];
        documentSnapshots.forEach((doc) => {
          const user = doc.data();
          user.id = doc.id;

          users.push(user as IUser);
        });

        setUsers(users);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    getUsers();
  }, []);

  const data = React.useMemo(() => users, [users]);

  const columns: Array<Column<IUser>> = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'FIRST NAME',
        accessor: 'firstName',
      },
      {
        Header: 'LAST NAME',
        accessor: 'lastName',
      },
      {
        Header: 'EMAIL',
        accessor: 'email',
      },
      {
        Header: 'ACTIONS',
        accessor: (originalRow) => (
          <TableActionContainerStyled>
            <TableActionButtonStyled onClick={() => openViewModal(originalRow)}>
              <FaEye />
            </TableActionButtonStyled>

            <TableActionButtonStyled
              onClick={() => handleDeleteUser(originalRow)}
            >
              <FaTimes />
            </TableActionButtonStyled>
          </TableActionContainerStyled>
        ),
        id: 'action',
      },
    ],
    []
  );

  return (
    <AdminPageLayout title="Manage Users">
      <AdminViewUserModal open={open} user={selected} close={closeModal} />
      {/* <AdminEditUserModal open={open.edit} user={selected} close={closeModal} /> */}
      {loading ? (
        <ClipLoaderSpinner loading={loading} />
      ) : (
        <DefaultTable columns={columns} data={data} />
      )}
    </AdminPageLayout>
  );
}

async function isUserAdmin(uid: string) {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const user = docSnap.data();

    return user.isAdmin;
  } else {
    return false;
  }
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
  const isAdmin = await isUserAdmin(AuthUser.id);

  if (!isAdmin) {
    return {
      notFound: true,
    };
  }
});

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(AdminManageUsers);
