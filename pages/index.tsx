import FadeCarousel from '../components/carousel/FadeCarousel';
import HomeSection from '../components/home/HomeSection';
import { MainContainer } from '../components/layouts';
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
        <HomeSection title="Lorem">
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            quos molestiae corrupti consequatur omnis animi esse fuga. Delectus
            voluptatum architecto, veniam sit totam, excepturi facere earum
            tempore provident sint alias laborum non officiis dicta, accusamus
            harum nisi aut neque autem minima accusantium magnam a quia eveniet.
            Eligendi, rerum. Nemo voluptate provident odio nesciunt dolores
            obcaecati minus rerum delectus, enim, asperiores aliquid officia
            officiis fugit suscipit nisi laboriosam corporis. Provident,
            consectetur rerum odit totam esse modi incidunt facere facilis nulla
            quo velit fugiat fuga nihil laboriosam, harum doloremque? Animi
            amet, consequatur necessitatibus ex molestias quasi culpa ad ea
            dolore quaerat ipsum eius ipsa aliquid officia, vel nostrum
            voluptas. Eos, alias voluptate doloremque iste pariatur accusamus
            officiis amet dicta ab corporis perferendis facilis fugiat?
            Mollitia, minus adipisci magni corrupti quisquam similique eius
            veritatis porro, sapiente sit ullam recusandae animi a praesentium?
            Eligendi ipsum, aspernatur totam enim quas porro commodi itaque
            earum sit dolor, adipisci dignissimos id. Quaerat dolorum aliquid
            illo atque voluptatum. Commodi, corrupti porro necessitatibus dicta
            tempore quasi nisi deleniti maiores amet ipsa ut sunt ex nostrum
            quam suscipit, at itaque. Ad, quas totam sunt quidem dicta,
            voluptatum molestias tempore sapiente alias dignissimos illo ab
            doloremque quis unde! Asperiores, laborum rerum.
          </div>
        </HomeSection>

        <LatestPostsSection latestPosts={latestPosts} />
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
