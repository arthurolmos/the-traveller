import React from 'react';
import { db } from '../../firebase/db';
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { IPostStatus } from '../../models';
import { ClipLoaderSpinner } from '../../components/spinners/ClipLoader';
import Link from 'next/link';
import {
  AdminPageMenuListItemStyled,
  AdminPageMenuStyled,
  AdminPagePostsLengthStyled,
} from '../../styles/components/admin/AdminPageMenu';
import { useRouter } from 'next/router';

export function AdminMenu() {
  const route = useRouter();

  const [loading, setLoading] = React.useState(false);
  const [postsPendingApproval, setPostsPendingApproval] =
    React.useState<number>(0);

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
        setLoading(false);
        setPostsPendingApproval(querySnapshot.size);
      }
    );

    return () => {
      unsubPostsPendingApproval();
    };
  }, []);

  return (
    <AdminPageMenuStyled>
      <ul>
        <Link href="/admin" passHref>
          <AdminPageMenuListItemStyled active={route.pathname === '/admin'}>
            Home
          </AdminPageMenuListItemStyled>
        </Link>
        <Link href="/admin/write-guide" passHref>
          <AdminPageMenuListItemStyled
            active={route.pathname === '/admin/write-guide'}
          >
            Write Guide
          </AdminPageMenuListItemStyled>
        </Link>
        <Link href="/admin/review-posts" passHref>
          <AdminPageMenuListItemStyled
            active={route.pathname === '/admin/review-posts'}
          >
            Review Community's Posts
            {loading ? (
              <ClipLoaderSpinner loading={loading} size={16} />
            ) : (
              <AdminPagePostsLengthStyled>
                {postsPendingApproval}
              </AdminPagePostsLengthStyled>
            )}
          </AdminPageMenuListItemStyled>
        </Link>
        <Link href="/admin/manage-users" passHref>
          <AdminPageMenuListItemStyled
            active={route.pathname === '/admin/manage-users'}
          >
            Manage Users
          </AdminPageMenuListItemStyled>
        </Link>
      </ul>
    </AdminPageMenuStyled>
  );
}
