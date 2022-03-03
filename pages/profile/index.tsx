import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import Image from 'next/image';
import React from 'react';
import { db, doc, getDoc, updateDoc } from '../../firebase/db';
import {
  ref,
  storage,
  uploadBytes,
  getDownloadURL,
} from '../../firebase/storage';
import { MainContainer, PageComponent } from '../../components/layouts';
import { updateProfile } from '../../firebase/auth';
import {
  CameraIconContainerStyled,
  ContentWrapperStyled,
  ImageContainerStyled,
  ImageContainerWrapperStyled,
  ProfileDescriptionStyled,
  ProfileHeaderStyled,
  ProfileSocialStyled,
} from '../../styles/pages/profile';
import placeholder from '../../public/assets/users/placeholder.svg';
import { LabelInput, SocialNetworkInput } from '../../components/inputs';
import { IUser } from '../../models';
import { DefaultButton } from '../../components/buttons';
import { FaCamera } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import {
  ClipLoaderSpinner,
  BeatLoaderSpinner,
} from '../../components/spinners';

interface Props {
  user: IUser;
}

export function Profile(props: Props) {
  const { user } = props;
  const AuthUser = useAuthUser();
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [loading, setLoading] = React.useState(false);
  const [loadingProfilePicture, setLoadingProfilePicture] =
    React.useState(false);
  const [firstName, setFirstName] = React.useState(user.firstName);
  const [lastName, setLastName] = React.useState(user.lastName);
  const [instagram, setInstagram] = React.useState(
    user.social?.instagram ? user.social.instagram : ''
  );
  const [facebook, setFacebook] = React.useState(
    user.social?.facebook ? user.social.facebook : ''
  );
  const [twitter, setTwitter] = React.useState(
    user.social?.twitter ? user.social.twitter : ''
  );
  const [profilePicture, setProfilePicture] = React.useState<string | null>(
    null
  );
  const [preview, setPreview] = React.useState<File | null>(null);

  React.useEffect(() => {
    async function getProfilePicture() {
      try {
        setLoadingProfilePicture(true);

        const pathReference = ref(
          storage,
          `/users/${user.id}/${user.profilePicture}`
        );
        console.log({ pathReference });

        const url = await getDownloadURL(pathReference);
        console.log({ url });

        setProfilePicture(url);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingProfilePicture(false);
      }
    }

    if (user.profilePicture) getProfilePicture();
  }, [user]);

  async function updateDB({
    firstName,
    lastName,
    profilePicture = null,
    social = null,
  }: {
    firstName: string;
    lastName: string;
    profilePicture?: string;
    social: {
      instagram: string;
      facebook: string;
      twitter: string;
    };
  }) {
    const userRef = doc(db, 'users', user.id);
    await updateDoc(userRef, {
      firstName,
      lastName,
      profilePicture,
      social,
    });
  }

  async function uploadProfilePicture({
    name,
    picture,
  }: {
    name: string;
    picture: File;
  }) {
    const profilePicRef = ref(storage, `users/${user.id}/${name}`);

    const resp = await uploadBytes(profilePicRef, picture);
    return resp.ref.toString();
  }

  async function updateAuthProfile({
    displayName,
    photoURL = AuthUser.photoURL,
  }: {
    displayName: string;
    photoURL?: string;
  }) {
    await updateProfile(AuthUser.firebaseUser, {
      displayName,
      photoURL,
    });
  }

  const submit = async () => {
    try {
      setLoading(true);

      // Sets the profile pic title
      let profilePictureTitle: string | null = null;
      if (preview) {
        const name = preview.name.split('.')[0];
        const ext = preview.name.split('.').pop();
        profilePictureTitle = `${name}-${Date.now()}.${ext}`;
      } else {
        profilePictureTitle = user.profilePicture;
      }

      // Updates the Document on Firestore
      await updateDB({
        firstName,
        lastName,
        profilePicture: profilePictureTitle,
        social: {
          instagram,
          facebook,
          twitter,
        },
      });

      // Uploads ProfilePicture to Storage
      let photoURL: string | null = null;
      if (preview)
        photoURL = await uploadProfilePicture({
          name: profilePictureTitle,
          picture: preview,
        });

      await updateAuthProfile({
        displayName: `${firstName} ${lastName}`,
        photoURL,
      });

      toast.success(`Profile successfully updated!`);

      setLoading(false);

      router.push('/');
    } catch (e) {
      setLoading(false);
      console.error('Error adding document: ', e);
    }
  };

  return (
    <MainContainer title="My Profile">
      <PageComponent title={`${user.firstName} ${user.lastName}`}>
        <ContentWrapperStyled>
          <ProfileHeaderStyled>
            {loadingProfilePicture ? (
              <ClipLoaderSpinner loading={loadingProfilePicture} size={180} />
            ) : (
              <ImageContainerWrapperStyled
                onClick={() => inputRef.current.click()}
              >
                <ImageContainerStyled>
                  <input
                    type="file"
                    style={{ visibility: 'hidden' }}
                    ref={inputRef}
                    onChange={(e) => setPreview(e.target.files[0])}
                  />
                  <Image
                    src={
                      preview
                        ? URL.createObjectURL(preview)
                        : profilePicture
                        ? profilePicture
                        : placeholder
                    }
                    alt="Profile Picture"
                    layout="fill"
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOsrAcAAXcA+tGTVsYAAAAASUVORK5CYII="
                    priority
                  />
                </ImageContainerStyled>
                <CameraIconContainerStyled>
                  <FaCamera size={26} color="black" />
                </CameraIconContainerStyled>
              </ImageContainerWrapperStyled>
            )}
            <a>{user.email}</a>
          </ProfileHeaderStyled>

          <ProfileDescriptionStyled>
            <h2>Profile Info</h2>
            <div>
              <LabelInput
                value={firstName}
                label="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <LabelInput
                value={lastName}
                label="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </ProfileDescriptionStyled>

          <ProfileSocialStyled>
            <h2>Social Medias</h2>
            <div>
              <SocialNetworkInput
                socialNetwork="Instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
              <SocialNetworkInput
                socialNetwork="Facebook"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
              <SocialNetworkInput
                socialNetwork="Twitter"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>
          </ProfileSocialStyled>

          {loading ? (
            <BeatLoaderSpinner loading={loading} />
          ) : (
            <DefaultButton title="Save" onClick={submit} inverted />
          )}
        </ContentWrapperStyled>
      </PageComponent>
    </MainContainer>
  );
}

async function getUserProfile(uid: string) {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const user = docSnap.data();
    user.id = docSnap.id;

    return user;
  } else {
    return null;
  }
}
export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
  try {
    const uid = AuthUser.id;

    const user = await getUserProfile(uid);

    if (!user) throw new Error();

    return {
      props: {
        user,
      },
    };
  } catch (err) {
    console.error(err);

    return {
      notFound: true,
    };
  }
});

export default withAuthUser<Props>({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Profile);
