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
  onSnapshot,
  query,
  where,
  orderBy,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { IPost, IPostStatus } from '../../models';
import { AdminPageLayout } from '../../components/admin/AdminPageLayout';
import { ClipLoaderSpinner } from '../../components/spinners';
import {
  TableActionButtonStyled,
  TableActionContainerStyled,
} from '../../styles/components/tables/DefaultTable';
import { FaCheck, FaEye, FaTimes } from 'react-icons/fa';
import { Column } from 'react-table';
import { DefaultTable } from '../../components/tables';
import convertTimestampToDate from '../../lib/covertTimestampToDate';
import Link from 'next/link';
import { confirmAlert } from '../../components/alerts/ConfirmAlert';
import { toast } from 'react-toastify';

export function AdminReviewPosts() {
  const [loading, setLoading] = React.useState(false);
  const [postsPendingApproval, setPostsPendingApproval] = React.useState<
    IPost[]
  >([]);

  React.useEffect(() => {
    setLoading(true);

    const postsPendingApprovalQuery = query(
      collection(db, 'posts'),
      where('status', '==', IPostStatus.PENDING_APPROVAL),
      orderBy('createdAt')
    );

    const unsubPostsPendingApproval = onSnapshot(
      postsPendingApprovalQuery,
      (querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((doc) => {
          const post = doc.data();
          post.id = doc.id;
          posts.push(post);
        });

        setLoading(false);
        setPostsPendingApproval([...posts]);
      }
    );

    return () => {
      unsubPostsPendingApproval();
    };
  }, []);

  const data = React.useMemo(
    () =>
      postsPendingApproval.map((post) => {
        return {
          id: post.id,
          title: post.title,
          author: post.author.name,
          createdAt: convertTimestampToDate(post.createdAt as Timestamp),
        };
      }),
    [postsPendingApproval]
  );

  const handleApprove = (pid: string) => {
    confirmAlert({
      title: 'Confirmation',
      message: 'Approve this post?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => updatePostStatus(pid, IPostStatus.APPROVED),
        },
        {
          label: 'No',
          onClick: () => null,
        },
      ],
    });
  };

  const handleReject = (pid: string) => {
    confirmAlert({
      title: 'Confirmation',
      message: 'Reject this post?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => updatePostStatus(pid, IPostStatus.REJECTED),
        },
        {
          label: 'No',
          onClick: () => null,
        },
      ],
    });
  };

  async function updatePostStatus(pid: string, status: IPostStatus) {
    try {
      const docRef = doc(db, 'posts', pid);

      if (status === IPostStatus.APPROVED)
        await updateDoc(docRef, {
          status: status,
          approvedAt: new Date(),
        });
      else
        await updateDoc(docRef, {
          status: status,
        });

      toast.success(`Post ${status.toLowerCase()} updated successfully`);
    } catch (err) {
      console.error(err);
    }
  }

  const columns: Array<Column<IPost>> = React.useMemo(
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
              <Link href={`/posts/preview/${originalRow.id}`} passHref>
                <a>
                  <FaEye />
                </a>
              </Link>
            </TableActionButtonStyled>

            <TableActionButtonStyled
              onClick={() => handleApprove(originalRow.id)}
            >
              <FaCheck color="lightgreen" />
            </TableActionButtonStyled>

            <TableActionButtonStyled
              onClick={() => handleReject(originalRow.id)}
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
    <AdminPageLayout title="Review Posts">
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
})(AdminReviewPosts);
