import React from 'react';
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { db } from '../../firebase/db';
import {
  getDoc,
  doc,
  collection,
  query,
  orderBy,
  getDocs,
} from 'firebase/firestore';
import { AdminPageLayout } from '../../components/admin/AdminPageLayout';
import { IUser } from '../../models';
import { Column } from 'react-table';
import { DefaultTable } from '../../components/tables';
import { FaEye } from 'react-icons/fa';
import {
  TableActionButtonStyled,
  TableActionContainerStyled,
} from '../../styles/components/tables/DefaultTable';
import AdminViewUserModal from '../../components/admin/AdminViewUserModal';
import { ClipLoaderSpinner } from '../../components/spinners';

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

  React.useEffect(() => {
    async function getUsers() {
      try {
        setLoading(true);

        const first = query(
          collection(db, 'users'),
          orderBy('firstName'),
          orderBy('lastName')
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
