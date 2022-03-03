import React from 'react';
import Link from 'next/link';
import { IPost, IPostStatus } from '../../models';
import {
  AdminPostListItemStyled,
  ItemButtonsStyled,
  PostDescriptionStyled,
} from '../../styles/components/admin/PostListItem';
import convertTimestampToDate from '../../lib/covertTimestampToDate';
import { Timestamp } from 'firebase/firestore';
import { DefaultButton } from '../buttons';
import { confirmAlert } from '../../components/alerts/ConfirmAlert';
import { db, updateDoc, doc } from '../../firebase/db';
import { toast } from 'react-toastify';

interface Props {
  item: IPost;
  index: number;
  preview?: boolean;
}

export default function PostListItem({ item, index, preview }: Props) {
  const href = preview ? `/posts/preview/${item.id}` : `/posts/${item.id}`;

  const createdAt = convertTimestampToDate(item.createdAt as Timestamp);

  const handleApprove = async (pid: string) => {
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

  const handleReject = async (pid: string) => {
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

  return (
    <AdminPostListItemStyled key={item.id} index={index}>
      <Link href={href} passHref>
        <PostDescriptionStyled>
          <h3>{item.title}</h3>
          <span>Author Name: {item.author.name}</span>
          <span>Author ID: {item.author.id}</span>
          <span>Published at: {createdAt}</span>
        </PostDescriptionStyled>
      </Link>
      <ItemButtonsStyled>
        <DefaultButton title="Approve" onClick={() => handleApprove(item.id)} />
        <DefaultButton
          title="Reject"
          inverted
          onClick={() => handleReject(item.id)}
        />
      </ItemButtonsStyled>
    </AdminPostListItemStyled>
  );
}
