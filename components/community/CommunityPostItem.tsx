import React from 'react';
import { IPost } from '../../interfaces';
import { storage, ref, getDownloadURL } from '../../firebase/storage';
import {
  CommunityPostItemStyled,
  PostDescriptionContainerStyled,
  PostImageContainerStyled,
} from '../../styles/components/community/CommunityPostItem';
import DefaultImage from '../image/DefaultImage';
import Link from 'next/link';

interface Props {
  post: IPost;
}

export function CommunityPostItem({ post }: Props) {
  const [coverImage, setCoverImage] = React.useState(null);

  const shortDescription =
    post.text.length > 120 ? post.text.substring(0, 120) + '...' : post.text;

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
      <CommunityPostItemStyled>
        <PostImageContainerStyled>
          <DefaultImage src={coverImage} layout="fill" objectFit="cover" />
        </PostImageContainerStyled>

        <PostDescriptionContainerStyled>
          <h2>{post.title}</h2>
          <span>By {post.authorName}</span>
          <span>Posted on {post.approvedAt}</span>
          <div dangerouslySetInnerHTML={{ __html: shortDescription }} />
        </PostDescriptionContainerStyled>
      </CommunityPostItemStyled>
    </Link>
  );
}
