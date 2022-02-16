import React from 'react';
import { IPost } from '../../interfaces';
import { storage, ref, getDownloadURL } from '../../firebase/storage';
import {
  LatestPostItemStyled,
  PostDescriptionContainerStyled,
  PostImageContainerStyled,
} from '../../styles/components/home/LatestPostItem';
import DefaultImage from '../image/DefaultImage';
import Link from 'next/link';

interface Props {
  post: IPost;
}

export function LatestPostItem({ post }: Props) {
  const [coverImage, setCoverImage] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function getCoverImage() {
      try {
        const coverImageRef = ref(
          storage,
          `posts/${post.id}/${post.coverImage}`
        );
        const url = await getDownloadURL(coverImageRef);

        setCoverImage(url);
      } catch (err) {
        console.error(err);

        setCoverImage(null);
      }
    }

    getCoverImage();
  }, [post]);

  return (
    <Link href={`/posts/${post.id}`} passHref>
      <LatestPostItemStyled>
        <PostImageContainerStyled>
          <DefaultImage objectFit="cover" layout="fill" src={coverImage} />
        </PostImageContainerStyled>

        <PostDescriptionContainerStyled>
          <h2>{post.title}</h2>
          <span>By {post.authorName}</span>
          <span>Posted at {post.approvedAt}</span>
        </PostDescriptionContainerStyled>
      </LatestPostItemStyled>
    </Link>
  );
}
