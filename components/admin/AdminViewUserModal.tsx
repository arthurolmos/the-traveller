import React from 'react';
import { IPost, IPostStatus, IUser } from '../../models';
import DefaultModalLayout from '../modals/DefaultModalLayout';
import {
  AdminViewUserProfileHeaderStyled,
  AdminViewUserPostsContainerStyled,
  AdminViewUserPostsGridStyled,
  AdminViewUserImageContainerStyled,
  AdminViewUserPostsContainerHeaderStyled,
  AdminViewUserContentWrapperStyled,
  AdminViewUserSocialNetworkContainer,
  AdminViewUserSocialNetworkWrapper,
  // AdminViewUserPostsLengthStyled,
} from '../../styles/components/admin/AdminViewUserModal';
import {
  db,
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from '../../firebase/db';
import { ref, storage, getDownloadURL } from '../../firebase/storage';
import { ClipLoaderSpinner } from '../spinners';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import convertTimestampToDate from '../../lib/covertTimestampToDate';
import placeholder from '../../public/assets/users/placeholder.svg';

interface Props {
  open: boolean;
  close: () => void;
  user: IUser;
}

export default function AdminViewUserModal({ open, user, close }: Props) {
  const [loading, setLoading] = React.useState(false);
  const [loadingProfilePicture, setLoadingProfilePicture] =
    React.useState(false);
  const [posts, setPosts] = React.useState<IPost[]>([]);
  const [profilePicture, setProfilePicture] = React.useState<string | null>(
    null
  );

  React.useEffect(() => {
    async function getUserPosts() {
      try {
        setLoading(true);

        const q = query(
          collection(db, 'posts'),
          where('author.id', '==', user?.id),
          where('status', '==', IPostStatus.APPROVED)
        );

        const querySnapshot = await getDocs(q);

        const posts: IPost[] = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data());
          const post = doc.data();
          post.id = doc.id;

          post.createdAt = convertTimestampToDate(post.createdAt);
          post.updatedAt = convertTimestampToDate(post.updatedAt);
          post.approvedAt = convertTimestampToDate(post.approvedAt);

          posts.push(post as IPost);
        });

        setPosts(posts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    async function getProfilePicture() {
      try {
        setLoadingProfilePicture(true);

        const pathReference = ref(
          storage,
          `/users/${user?.id}/${user?.profilePicture}`
        );

        const url = await getDownloadURL(pathReference);

        setProfilePicture(url);
      } catch (err) {
        console.error(err);
        setProfilePicture(null);
      } finally {
        setLoadingProfilePicture(false);
      }
    }

    if (user?.profilePicture) getProfilePicture();

    if (user) {
      getProfilePicture();
      getUserPosts();
    }
  }, [user]);

  return (
    <DefaultModalLayout title="View User Profile" open={open} close={close}>
      <AdminViewUserContentWrapperStyled>
        <AdminViewUserProfileHeaderStyled>
          <AdminViewUserImageContainerStyled>
            {loadingProfilePicture ? (
              <ClipLoaderSpinner loading={loadingProfilePicture} size={180} />
            ) : (
              <AdminViewUserImageContainerStyled>
                <Image
                  src={profilePicture ? profilePicture : placeholder}
                  alt="Profile Picture"
                  layout="fill"
                  objectFit="cover"
                />
              </AdminViewUserImageContainerStyled>
            )}
          </AdminViewUserImageContainerStyled>
          <h2>
            {user?.firstName} {user?.lastName}
          </h2>
          {user?.email}
        </AdminViewUserProfileHeaderStyled>

        <AdminViewUserSocialNetworkContainer>
          {user?.social?.instagram && (
            <AdminViewUserSocialNetworkWrapper
              href={`https://instagram.com/${user?.social.instagram}`}
              target="_blank"
            >
              <FaInstagram /> @{user?.social.instagram}
            </AdminViewUserSocialNetworkWrapper>
          )}

          {user?.social?.facebook && (
            <AdminViewUserSocialNetworkWrapper
              href={`https://facebook.com/${user?.social?.facebook}`}
              target="_blank"
            >
              <FaFacebookF /> /{user?.social.facebook}
            </AdminViewUserSocialNetworkWrapper>
          )}

          {user?.social?.twitter && (
            <AdminViewUserSocialNetworkWrapper
              href={`https://twitter.com/${user?.social?.twitter}`}
              target="_blank"
            >
              <FaTwitter /> /{user?.social?.twitter}
            </AdminViewUserSocialNetworkWrapper>
          )}
        </AdminViewUserSocialNetworkContainer>

        {/* <AdminViewUserPostsContainerStyled>
            <AdminViewUserPostsContainerHeaderStyled>
              <h2>{name}'s Posts </h2>
              {loading ? (
                <ClipLoaderSpinner loading={loading} size={16} />
              ) : (
                <AdminViewUserPostsLengthStyled>{posts.length}</AdminViewUserPostsLengthStyled>
              )}
            </AdminViewUserPostsContainerHeaderStyled>

            <AdminViewUserPostsGridStyled>
              {posts.map((post) => {
                return <CommunityPostItem post={post} key={post.id} />;
              })}
            </AdminViewUserPostsGridStyled>
          </AdminViewUserPostsContainerStyled> */}
      </AdminViewUserContentWrapperStyled>
    </DefaultModalLayout>
  );
}
