import FadeCarousel from '../components/carousel/FadeCarousel';
import GenericSection from '../components/home/GenericSection';
import MainContainer from '../components/layout/MainContainer';
import { ContentContainerStyled } from '../styles/pages/Home';
import { withAuthUser } from 'next-firebase-auth';

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

export function Home() {
  return (
    <MainContainer title="Home">
      <FadeCarousel items={carouselItems} />

      <ContentContainerStyled>
        <GenericSection />

        <GenericSection backgroundColor="lightgreen" />

        <GenericSection backgroundColor="lightblue" />
      </ContentContainerStyled>
    </MainContainer>
  );
}

export default withAuthUser()(Home);
