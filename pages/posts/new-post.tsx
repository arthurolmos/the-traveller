import React from 'react';
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import DefaultInput from '../../components/input/DefaultInput';
import MainContainer from '../../components/layout/MainContainer';
import PageComponent from '../../components/layout/PageComponent';
import QuillInput from '../../components/input/QuillInput';
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
  ThumbnailPreviewContainerStyled,
  ThumbnailPreviewStyled,
} from '../../styles/pages/NewPost';
import LabelInput from '../../components/input/LabelInput';

export function NewPost() {
  const router = useRouter();
  const AuthUser = useAuthUser();
  const uid = AuthUser.id;

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

      // Creates the Document on Firestore
      const docRef = await addDoc(collection(db, `posts`), {
        uid,
        title,
        text,
        review: true,
        coverImageTitle,
      });

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

      toast.success(`Document written with ID: ${docRef.id}`);

      setLoading(false);

      router.push('/posts');
    } catch (e) {
      setLoading(false);
      console.error('Error adding document: ', e);
    }
  };

  const handleCoverFileInput = (e: React.FormEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement).files[0];

    console.log(file.size);
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
          <img src={URL.createObjectURL(image)} />
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
                <img src={URL.createObjectURL(coverImage)} />
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

          <div
            style={{
              marginTop: 40,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {loading ? (
              <BeatLoaderSpinner loading={loading} />
            ) : (
              <DefaultButton
                title="Submit for Review"
                inverted
                onClick={submit}
              />
            )}
          </div>
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
