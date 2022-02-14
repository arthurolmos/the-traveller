import React from 'react';
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import MainContainer from '../../components/layouts/MainContainer';
import { db, getDoc, doc } from '../../firebase/db';
import { storage, ref, getDownloadURL, listAll } from '../../firebase/storage';
import Image from 'next/image';
import { BeatLoaderSpinner } from '../../components/spinners/BeatLoader';
import {
  CoverImageContainerStyled,
  CoverImageDescriptionStyled,
  GalleryImageContainerStyled,
  PageContainerStyled,
  ContentContainerStyled,
  TextSectionStyled,
  GallerySectionStyled,
  GalleryGridStyled,
  ImageDisplayStyled,
  ImageDisplayContainerStyled,
} from '../../styles/pages/posts/Post';
import { FaTimes } from 'react-icons/fa';
import { IPostStatus } from '../../interfaces';

export function Post(props) {
  const { post } = props;

  const [loading, setLoading] = React.useState(false);
  const [coverImage, setCoverImage] = React.useState('');
  const [galleryImages, setGalleryImages] = React.useState<string[]>([]);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function getCoverImage() {
      setLoading(true);

      const coverImageRef = ref(
        storage,
        `posts/${post.id}/${post.coverImageTitle}`
      );
      const url = await getDownloadURL(coverImageRef);

      setLoading(false);
      setCoverImage(url);
    }

    async function getGalleryImagesPaths() {
      const galleryImagesRef = ref(storage, `posts/${post.id}/gallery`);
      const files = await listAll(galleryImagesRef);

      if (files?.items?.length > 0) {
        const paths = files.items.map((item) => item.fullPath);

        for (let i = 0; i < paths.length; i++) {
          const imageRef = ref(storage, paths[i]);
          const url = await getDownloadURL(imageRef);

          galleryImages.push(url);

          setGalleryImages([...galleryImages]);
        }
      }
    }

    getCoverImage();
    getGalleryImagesPaths();
  }, [post]);

  const galleryImageItems = React.useMemo(() => {
    return galleryImages.map((image, index) => {
      return (
        <GalleryImageContainerStyled
          key={index}
          onClick={() => setSelectedImage(image)}
        >
          <Image src={image} objectFit="cover" layout="fill" />
        </GalleryImageContainerStyled>
      );
    });
  }, [galleryImages]);

  return (
    <MainContainer title={post.title}>
      {selectedImage && (
        <ImageDisplayStyled>
          <ImageDisplayContainerStyled>
            <FaTimes onClick={() => setSelectedImage(null)} size={32} />
            <Image src={selectedImage} layout="fill" objectFit="contain" />
          </ImageDisplayContainerStyled>
        </ImageDisplayStyled>
      )}
      <PageContainerStyled>
        <CoverImageContainerStyled>
          {loading ? (
            <BeatLoaderSpinner loading={loading} />
          ) : (
            coverImage && (
              <Image objectFit="cover" layout="fill" src={coverImage} />
            )
          )}
          <CoverImageDescriptionStyled>
            <h1>{post.title}</h1>
            <h2>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Obcaecati, cupiditate?
            </h2>
            <h3>By {post.author}</h3>
          </CoverImageDescriptionStyled>
        </CoverImageContainerStyled>

        <ContentContainerStyled>
          <TextSectionStyled dangerouslySetInnerHTML={{ __html: post.text }} />

          <GallerySectionStyled>
            <h2 style={{ textAlign: 'center' }}>Gallery</h2>

            <GalleryGridStyled>{galleryImageItems}</GalleryGridStyled>
          </GallerySectionStyled>
        </ContentContainerStyled>
      </PageContainerStyled>
    </MainContainer>
  );
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ params }) => {
  const { pid } = params;

  const docRef = doc(db, 'posts', pid as string);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const post = docSnap.data();
    post.id = docSnap.id;

    if (post.status !== IPostStatus.APPROVED) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        post,
      },
    };
  } else {
    return {
      props: {
        post: null,
      },
    };
  }
});

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Post);
