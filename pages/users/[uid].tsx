import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import Image from 'next/image';
import React from 'react';
import { CommunityPostItem } from '../../components/community/CommunityPostItem';
import { MainContainer, PageComponent } from '../../components/layouts';
import { ClipLoaderSpinner } from '../../components/spinners/ClipLoader';
import {
  db,
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from '../../firebase/db';
import { IPost, IPostStatus, IUser } from '../../interfaces';
import convertTimestampToDate from '../../lib/covertTimestampToDate';
import placeholder from '../../public/assets/users/placeholder.svg';
import {
  UserProfileHeaderStyled,
  UserPostsContainerStyled,
  UserPostsGridStyled,
  UserImageContainerStyled,
  UserPostsContainerHeaderStyled,
} from '../../styles/pages/users';

interface Props {
  user: IUser;
}

export function Users(props: Props) {
  const { user } = props;
  const name = `${user.firstName} ${user.lastName}`;

  const [loading, setLoading] = React.useState(false);
  const [posts, setPosts] = React.useState<IPost[]>([]);

  React.useEffect(() => {
    async function getUserPosts() {
      try {
        setLoading(true);

        const q = query(
          collection(db, 'posts'),
          where('author.id', '==', user.id),
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

    if (user) getUserPosts();
  }, [user]);

  return (
    <MainContainer title="User Profile">
      <PageComponent title={name}>
        <UserProfileHeaderStyled>
          <UserImageContainerStyled>
            <Image
              src={user.profilePicture ? user.profilePicture : placeholder}
              alt="Profile Picture"
              layout="fill"
            />
          </UserImageContainerStyled>
          <a>{user.email}</a>
        </UserProfileHeaderStyled>

        <UserPostsContainerStyled>
          <UserPostsContainerHeaderStyled>
            <h2>{name}'s Posts </h2>
            {loading ? (
              <ClipLoaderSpinner loading={loading} size={16} />
            ) : (
              posts.length
            )}
          </UserPostsContainerHeaderStyled>

          <UserPostsGridStyled>
            {posts.map((post) => {
              return <CommunityPostItem post={post} key={post.id} />;
            })}
          </UserPostsGridStyled>
        </UserPostsContainerStyled>
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
})(async ({ params }) => {
  try {
    const { uid } = params;

    const user = await getUserProfile(uid as string);

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

export default withAuthUser<Props>()(Users);
