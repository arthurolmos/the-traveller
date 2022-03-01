import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import React from 'react';
import { CountrySelectInput } from '../../components/inputs';
import { MainContainer, PageComponent } from '../../components/layouts';
import SimpleMap from '../../components/map/SimpleMap';
import { ICountry } from '../../models/ICountry';
import {
  ListStyled,
  ListItemStyled,
  ContentStyled,
  ContentPanelStyled,
  ContentSearchStyled,
  ContentMapStyled,
  ContentReviewsDefaultContainer,
  ContentReviewsSmallContainer,
} from '../../styles/pages/Locations';
import { db, getDocs, collection, query, where } from '../../firebase/db';
import { IPost } from '../../models';
import Link from 'next/link';

export function Locations() {
  const [loading, setLoading] = React.useState(false);
  const [country, setCountry] = React.useState<ICountry | null>(null);
  const [latlng, setLatLng] = React.useState({
    lat: 0,
    lng: 0,
  });
  const [posts, setPosts] = React.useState<IPost[]>([]);

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const location = {
          lat: coords.latitude,
          lng: coords.longitude,
        };

        setLatLng(location);
      },
      (error) => {
        console.error({ error });
      }
    );
  }, []);

  React.useEffect(() => {
    submit();
  }, [country]);

  async function getCountry() {
    try {
      const resp = await fetch(
        `https://restcountries.com/v3.1/alpha/${country.value}`
      );

      const data = await resp.json();
      console.log({ data });

      return data[0]?.latlng;
    } catch (err) {
      console.error(err);
    }
  }

  async function getPosts() {
    try {
      const q = query(
        collection(db, 'posts'),
        where('country.value', '==', country.value)
      );

      const posts: IPost[] = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const post = doc.data() as IPost;
        post.id = doc.id;

        posts.push(post);
      });

      setPosts([...posts]);
    } catch (err) {
      console.error(err);
    }
  }

  async function submit() {
    try {
      if (!country) return;

      setLoading(true);

      const [lat, lng] = await getCountry();

      setLatLng({ lat, lng });

      await getPosts();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const items = React.useMemo(() => {
    return posts?.map((item: IPost, i: number) => {
      return (
        <Link href={`/posts/${item.id}`} passHref>
          <ListItemStyled index={i} key={item.id}>
            <h2>{item.title}</h2>
            <span>{item.author.name}</span>
          </ListItemStyled>
        </Link>
      );
    });
  }, [posts]);

  return (
    <MainContainer title="Locations">
      <PageComponent title="Locations">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam,
          impedit quo. Harum atque reprehenderit aliquam odio, illo ullam
          provident numquam.
        </p>
        <ContentStyled>
          <ContentPanelStyled>
            <ContentSearchStyled>
              <span>Where do you wanna go?</span>

              <CountrySelectInput onChange={setCountry} value={country} />

              <ContentReviewsDefaultContainer>
                {!loading && <ListStyled>{items}</ListStyled>}
              </ContentReviewsDefaultContainer>
            </ContentSearchStyled>
          </ContentPanelStyled>
          <ContentMapStyled>
            <SimpleMap lat={latlng.lat} lng={latlng.lng} />

            <ContentReviewsSmallContainer>
              {!loading && <ListStyled>{items}</ListStyled>}
            </ContentReviewsSmallContainer>
          </ContentMapStyled>
        </ContentStyled>
      </PageComponent>
    </MainContainer>
  );
}

export const getServerSideProps = withAuthUserTokenSSR({})();

export default withAuthUser()(Locations);
