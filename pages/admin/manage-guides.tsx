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
  onSnapshot,
  Timestamp,
  deleteDoc,
} from 'firebase/firestore';
import { AdminPageLayout } from '../../components/admin/AdminPageLayout';
import { IGuide } from '../../models';
import { Column } from 'react-table';
import { DefaultTable } from '../../components/tables';
import { FaEye, FaTimes } from 'react-icons/fa';
import {
  TableActionButtonStyled,
  TableActionContainerStyled,
} from '../../styles/components/tables/DefaultTable';
import { ClipLoaderSpinner } from '../../components/spinners';
import Link from 'next/link';
import convertTimestampToDate from '../../lib/covertTimestampToDate';
import { confirmAlert } from '../../components/alerts/ConfirmAlert';
import { toast } from 'react-toastify';

export function AdminManageGuides() {
  const [loading, setLoading] = React.useState(false);
  const [guides, setGuides] = React.useState<IGuide[]>([]);

  React.useEffect(() => {
    const guidesQuery = query(collection(db, 'guides'), orderBy('createdAt'));

    const unsubGuides = onSnapshot(guidesQuery, (querySnapshot) => {
      const guides = [];
      querySnapshot.forEach((doc) => {
        const guide = doc.data();
        guide.id = doc.id;
        guides.push(guide);
      });

      setLoading(false);
      setGuides([...guides]);
    });

    return () => {
      unsubGuides();
    };
  }, []);

  const data = React.useMemo(
    () =>
      guides.map((guide) => {
        return {
          id: guide.id,
          title: guide.title,
          author: guide.author.name,
          createdAt: convertTimestampToDate(guide.createdAt as Timestamp),
        };
      }),
    [guides]
  );

  const handleDelete = (gid: string) => {
    confirmAlert({
      title: 'Confirmation',
      message: 'Delete this Guide?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteGuide(gid),
        },
        {
          label: 'No',
          onClick: () => null,
        },
      ],
    });
  };

  async function deleteGuide(gid: string) {
    try {
      setLoading(true);
      const docRef = doc(db, 'guides', gid);

      await deleteDoc(docRef);

      toast.success(`Guide deleted successfully`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const columns: Array<Column<IGuide>> = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'TITLE',
        accessor: 'title',
      },
      {
        Header: 'AUTHOR',
        accessor: (originalRow) => originalRow.author,
        id: 'author',
      },
      {
        Header: 'PUBLISHED AT',
        accessor: 'createdAt',
      },
      {
        Header: 'ACTIONS',
        accessor: (originalRow) => (
          <TableActionContainerStyled>
            <TableActionButtonStyled>
              <Link href={`/guides/${originalRow.id}`} passHref>
                <a>
                  <FaEye />
                </a>
              </Link>
            </TableActionButtonStyled>

            <TableActionButtonStyled
              onClick={() => handleDelete(originalRow.id)}
            >
              <FaTimes color="red" />
            </TableActionButtonStyled>
          </TableActionContainerStyled>
        ),
        id: 'action',
      },
    ],
    []
  );

  return (
    <AdminPageLayout title="Manage Guides">
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
})(AdminManageGuides);
