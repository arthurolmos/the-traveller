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
import { FaEye, FaEdit, FaTimes } from 'react-icons/fa';
import {
  TableActionButtonStyled,
  TableActionContainerStyled,
} from '../../styles/components/tables/DefaultTable';

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
  const [users, setUsers] = React.useState<IUser[]>([]);

  React.useEffect(() => {
    async function getUsers() {
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
    }

    getUsers();
  }, []);

  const data = React.useMemo(() => users, [users]);

  const columns: Array<Column<IUser>> = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id', // accessor is the "key" in the data
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
        accessor: (originalRow, rowIndex) => (
          <TableActionContainerStyled>
            <TableActionButtonStyled onClick={() => console.log(originalRow)}>
              <FaEye />
            </TableActionButtonStyled>
            <TableActionButtonStyled onClick={() => console.log(originalRow)}>
              <FaEdit />
            </TableActionButtonStyled>
            <TableActionButtonStyled onClick={() => console.log(originalRow)}>
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
      <DefaultTable columns={columns} data={data} />
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
