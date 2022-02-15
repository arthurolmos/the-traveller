import FadeCarousel from '../components/carousel/FadeCarousel';
import GenericSection from '../components/home/GenericSection';
import MainContainer from '../components/layouts/MainContainer';
import { ContentContainerStyled } from '../styles/pages/Home';
import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import {
  db,
  query,
  collection,
  where,
  orderBy,
  limit,
  getDocs,
} from '../firebase/db';
import { IPost, IPostStatus } from '../interfaces';
import convertTimestampToDate from '../lib/covertTimestampToDate';
import LatestPostsSection from '../components/home/LatestPostsSection';

interface CarouselItem {
  title: string;
  subtitle: string;
  image: string;
}

const carouselItems: CarouselItem[] = [
  {
    title: 'India',
    subtitle:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt, doloribus inventore nostrum sint rerum eum amet non porro odit facere.',
    image: '/assets/carousel/india.jpg',
  },
  {
    title: 'Finland',
    subtitle:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt, doloribus inventore nostrum sint rerum eum amet non porro odit facere.',
    image: '/assets/carousel/finland.jpg',
  },
  {
    title: 'Japan',
    subtitle:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt, doloribus inventore nostrum sint rerum eum amet non porro odit facere.',
    image: '/assets/carousel/japan.jpg',
  },
];

interface Props {
  latestPosts: IPost[];
}

export function Home(props: Props) {
  const { latestPosts } = props;

  return (
    <MainContainer title="Home">
      <FadeCarousel items={carouselItems} />

      <ContentContainerStyled>
        <GenericSection />

        <LatestPostsSection latestPosts={latestPosts} />

        <GenericSection backgroundColor="lightgreen" />

        <GenericSection backgroundColor="lightblue" />
      </ContentContainerStyled>
    </MainContainer>
  );
}

export const getServerSideProps = withAuthUserTokenSSR({})(async () => {
  const latestPostsQuery = query(
    collection(db, 'posts'),
    where('status', '==', IPostStatus.APPROVED),
    orderBy('approvedAt', `desc`),
    limit(6)
  );

  const docs = await getDocs(latestPostsQuery);

  const latestPosts = [];
  docs.forEach((doc) => {
    const post = doc.data();
    post.id = doc.id;

    post.createdAt = convertTimestampToDate(post.createdAt);
    post.updatedAt = convertTimestampToDate(post.updatedAt);
    post.approvedAt = convertTimestampToDate(post.approvedAt);

    latestPosts.push(post);
  });

  return {
    props: {
      latestPosts,
    },
  };
});

export default withAuthUser<Props>()(Home);
