import React from 'react';
import { IPost } from '../../interfaces';
import { storage, ref, getDownloadURL } from '../../firebase/storage';
import Image from 'next/image';
import { BeatLoaderSpinner } from '../spinners/BeatLoader';

interface Props {
  latestPosts: IPost[];
}

function LatestPostItem({ post }) {
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

    if (post.coverImage) {
      getCoverImage();
    }
  }, [post]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        padding: 15,
        width: 600,
        height: 250,
        gap: 20,
      }}
    >
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {loading ? (
          <BeatLoaderSpinner loading={loading} />
        ) : (
          coverImage && <Image src={coverImage} layout="fill" />
        )}
      </div>

      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
        }}
      >
        <h2>{post.title}</h2>
        <span>By {post.authorName}</span>
        <span>Posted at {post.approvedAt}</span>
      </div>
    </div>
  );
}

export default function LatestPostsSection({ latestPosts }: Props) {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: '1rem 3rem',
      }}
    >
      <h1 style={{ fontSize: '3em' }}>Latest Community Posts</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }}
      >
        {latestPosts.map((post) => {
          return <LatestPostItem post={post} />;
        })}
      </div>
    </section>
  );
}
