import React from 'react';
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import DefaultInput from '../../components/inputs/DefaultInput';
import MainContainer from '../../components/layouts/MainContainer';
import PageComponent from '../../components/layouts/PageComponent';
import QuillInput from '../../components/inputs/QuillInput';
import DefaultButton from '../../components/buttons/DefaultButton';
import { BeatLoaderSpinner } from '../../components/spinners/BeatLoader';
import { db, collection, addDoc } from '../../firebase/db';
import { storage, ref, uploadBytes } from '../../firebase/storage';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import {
  CoverImagePreviewStyled,
  FormStyled,
  InfoStyled,
  LabelStyled,
  SubmitContainerStyled,
  ThumbnailPreviewContainerStyled,
  ThumbnailPreviewStyled,
} from '../../styles/pages/posts/NewPost';
import LabelInput from '../../components/inputs/LabelInput';
import Image from 'next/image';
import { IPost, IPostStatus } from '../../interfaces';

export function NewPost() {
  const router = useRouter();

  const AuthUser = useAuthUser();
  const uid = AuthUser.id;
  const name = AuthUser.displayName;

  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [text, setText] = React.useState('');
  const [coverImage, setCoverImage] = React.useState<File | null>(null);
  const [galleryImages, setGalleryImages] = React.useState<File[]>([]);

  const coverImageInputRef = React.useRef<HTMLInputElement>();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Sets the coverImage name
      let coverImageTitle = '';
      if (coverImage) {
        const name = coverImage.name.split('.')[0];
        const ext = coverImage.name.split('.').pop();
        coverImageTitle = `${name}-${Date.now()}.${ext}`;
      }

      const newPost: IPost = {
        authorId: uid,
        authorName: name,
        title,
        text,
        status: IPostStatus.PENDING_APPROVAL,
        coverImage: coverImageTitle,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      // Creates the Document on Firestore
      const docRef = await addDoc(collection(db, `posts`), newPost);

      // Uploads Cover Image to Storage
      if (coverImageTitle !== '') {
        const imagesRef = ref(storage, `posts/${docRef.id}/${coverImageTitle}`);

        await uploadBytes(imagesRef, coverImage);
      }

      if (galleryImages.length > 0) {
        galleryImages.forEach((image) => {
          const name = image.name.split('.')[0];
          const ext = image.name.split('.').pop();
          const filename = `${name}-${Date.now()}.${ext}`;

          const imagesRef = ref(
            storage,
            `posts/${docRef.id}/gallery/${filename}`
          );

          uploadBytes(imagesRef, image);
        });
      }

      toast.success(`Post successfully published!`);

      setLoading(false);

      router.push('/posts');
    } catch (e) {
      setLoading(false);
      console.error('Error adding document: ', e);
    }
  };

  const handleCoverFileInput = (e: React.FormEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement).files[0];

    if (file?.size > 1024 * 1000 * 1000) {
      toast.warn('File size cannot exceed more than 10MB');
      setCoverImage(null);
    } else {
      setCoverImage(file);
    }
  };

  const handleGalleryFilesInput = (e: React.FormEvent<HTMLInputElement>) => {
    const fileList = (e.target as HTMLInputElement).files;

    const files = [];
    Array.from(fileList).forEach((file) => {
      if (file?.size > 1024 * 1000 * 1000) {
        toast.warn('File size cannot exceed more than 10MB');
      } else files.push(file);
    });

    setGalleryImages([...files, ...galleryImages]);
  };

  const removeFromGallery = (filename: string) => {
    const index = galleryImages.findIndex(
      (image: File) => image.name === filename
    );

    if (index < 0) return;

    galleryImages.splice(index, 1);
    setGalleryImages([...galleryImages]);
  };

  const galleryThumbnails = React.useMemo(() => {
    return galleryImages.map((image, index) => {
      return (
        <ThumbnailPreviewStyled
          onClick={() => removeFromGallery(image.name)}
          key={index}
        >
          <Image
            src={URL.createObjectURL(image)}
            layout="fill"
            objectFit="cover"
          />
        </ThumbnailPreviewStyled>
      );
    });
  }, [galleryImages]);

  return (
    <MainContainer title="Write a Post!">
      <PageComponent title="Write a Post!">
        <FormStyled onSubmit={submit}>
          <DefaultInput
            value={title}
            placeholder="Title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />

          <QuillInput
            value={text}
            placeholder="Write your Post..."
            onChange={setText}
          />

          <div>
            <LabelStyled>Cover image</LabelStyled>

            <DefaultInput
              ref={coverImageInputRef}
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleCoverFileInput}
              style={{
                visibility: coverImage ? 'hidden' : 'visible',
                height: coverImage ? 0 : 'auto',
                padding: coverImage ? 0 : '10px 15px',
              }}
            />

            {coverImage && (
              <CoverImagePreviewStyled
                onClick={() => coverImageInputRef.current.click()}
              >
                <Image
                  src={URL.createObjectURL(coverImage)}
                  layout="fill"
                  objectFit="cover"
                />
              </CoverImagePreviewStyled>
            )}

            <InfoStyled>Max size 10MB. Preferred size: XXX x YYY.</InfoStyled>
          </div>

          <LabelInput
            label="Gallery"
            info="Max size 10MB. Preferred size: XXX x YYY."
            type="file"
            accept=".jpg, .jpeg, .png"
            multiple
            onChange={handleGalleryFilesInput}
          />

          <ThumbnailPreviewContainerStyled>
            {galleryThumbnails}
          </ThumbnailPreviewContainerStyled>

          <SubmitContainerStyled>
            {loading ? (
              <BeatLoaderSpinner loading={loading} />
            ) : (
              <DefaultButton
                title="Submit for Review"
                inverted
                onClick={submit}
              />
            )}
          </SubmitContainerStyled>
        </FormStyled>
      </PageComponent>
    </MainContainer>
  );
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(NewPost);
