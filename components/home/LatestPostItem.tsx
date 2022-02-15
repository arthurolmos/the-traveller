import React from 'react';
import { IPost } from '../../interfaces';
import { storage, ref, getDownloadURL } from '../../firebase/storage';
import { BeatLoaderSpinner } from '../spinners/BeatLoader';
import {
  LatestPostItemStyled,
  PostDescriptionContainerStyled,
  PostImageContainerStyled,
} from '../../styles/components/home/LatestPostItem';
import DefaultImage from '../image/DefaultImage';

interface Props {
  post: IPost;
}

export function LatestPostItem({ post }: Props) {
  const [loading, setLoading] = React.useState(false);
  const [coverImage, setCoverImage] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function getCoverImage() {
      try {
        setLoading(true);

        const coverImageRef = ref(
          storage,
          `posts/${post.id}/${post.coverImage}`
        );
        const url = await getDownloadURL(coverImageRef);

        setLoading(false);
        setCoverImage(url);
      } catch (err) {
        console.error(err);

        setLoading(false);
        setCoverImage(null);
      }
    }

    getCoverImage();
  }, [post]);

  return (
    <LatestPostItemStyled>
      <PostImageContainerStyled>
        {loading ? (
          <BeatLoaderSpinner loading={loading} />
        ) : (
          <DefaultImage src={coverImage} layout="fill" />
        )}
      </PostImageContainerStyled>

      <PostDescriptionContainerStyled>
        <h2>{post.title}</h2>
        <span>By {post.authorName}</span>
        <span>Posted at {post.approvedAt}</span>
      </PostDescriptionContainerStyled>
    </LatestPostItemStyled>
  );
}
