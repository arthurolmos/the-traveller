import React from 'react';
import { IPost } from '../../models';
import { storage, ref, getDownloadURL } from '../../firebase/storage';
import {
  CommunityPostItemStyled,
  PostDescriptionContainerStyled,
  PostImageContainerStyled,
} from '../../styles/components/community/CommunityPostItem';
import DefaultImage from '../image/DefaultImage';
import Link from 'next/link';
import { GoLocation } from 'react-icons/go';

interface Props {
  post: IPost;
}

export function CommunityPostItem({ post }: Props) {
  const [coverImage, setCoverImage] = React.useState(null);

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
          <span>
            <GoLocation /> {post.country.label}
          </span>
          <span>By {post.author.name}</span>
          <span>Posted on {post.approvedAt}</span>
        </PostDescriptionContainerStyled>
      </CommunityPostItemStyled>
    </Link>
  );
}
