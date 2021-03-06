import React from 'react';
import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import { MainContainer } from '../../components/layouts';
import { db } from '../../firebase/db';
import { getDoc, doc } from 'firebase/firestore';
import { storage } from '../../firebase/storage';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
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
  StyledGoBack,
} from '../../styles/pages/posts/Post';
import { FaTimes } from 'react-icons/fa';
import { IPost, IPostStatus } from '../../models';
import convertTimestampToDate from '../../lib/covertTimestampToDate';
import DefaultImage from '../../components/image/DefaultImage';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Props {
  post: IPost;
}

export function Post(props: Props) {
  const { post } = props;

  const router = useRouter();

  const [coverImage, setCoverImage] = React.useState<string | null>('');
  const [galleryImages, setGalleryImages] = React.useState<string[]>([]);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

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
          <DefaultImage src={image} objectFit="cover" layout="fill" />
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
            <DefaultImage
              src={selectedImage}
              layout="fill"
              objectFit="contain"
              placeholder="blur"
            />
          </ImageDisplayContainerStyled>
        </ImageDisplayStyled>
      )}
      <PageContainerStyled>
        <CoverImageContainerStyled>
          <DefaultImage objectFit="cover" layout="fill" src={coverImage} />
          <CoverImageDescriptionStyled>
            <h1>{post.title}</h1>
            <h2>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Obcaecati, cupiditate?
            </h2>
            <span>
              By{' '}
              <Link href={`/users/${post.author.id}`} passHref>
                <a>
                  <b>{post.author.name}</b>
                </a>
              </Link>
            </span>
          </CoverImageDescriptionStyled>
        </CoverImageContainerStyled>

        <ContentContainerStyled>
          <TextSectionStyled dangerouslySetInnerHTML={{ __html: post.text }} />

          {galleryImageItems.length > 0 && (
            <GallerySectionStyled>
              <h2 style={{ textAlign: 'center' }}>Gallery</h2>

              <GalleryGridStyled>{galleryImageItems}</GalleryGridStyled>
            </GallerySectionStyled>
          )}

          <StyledGoBack onClick={() => router.back()}>Go Back </StyledGoBack>
        </ContentContainerStyled>
      </PageContainerStyled>
    </MainContainer>
  );
}

async function getPost(pid: string) {
  const docRef = doc(db, 'posts', pid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const post = docSnap.data();
    post.id = docSnap.id;

    if (post.status !== IPostStatus.APPROVED) throw new Error('Not approved');

    post.createdAt = convertTimestampToDate(post.createdAt);
    post.updatedAt = convertTimestampToDate(post.updatedAt);
    post.approvedAt = convertTimestampToDate(post.approvedAt);

    return post;
  } else {
    return null;
  }
}

export const getServerSideProps = withAuthUserTokenSSR({})(
  async ({ params }) => {
    try {
      const { pid } = params;

      const post = await getPost(pid as string);

      if (!post) throw new Error();

      return {
        props: {
          post,
        },
      };
    } catch (err) {
      console.error(err);

      return {
        notFound: true,
      };
    }
  }
);

export default withAuthUser<Props>({})(Post);
