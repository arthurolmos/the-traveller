import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import React from 'react';
import SearchInput from '../../components/input/SearchInput';
import MainContainer from '../../components/layout/MainContainer';
import PageComponent from '../../components/layout/PageComponent';
import SimpleMap from '../../components/map/SimpleMap';
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

export function Locations() {
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [location, setLocation] = React.useState({
    name: '',
    lat: 0,
    lng: 0,
  });
  const [reviews, setReviews] = React.useState<
    { title: string; author: string; review: string; id: string }[]
  >([]);

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const location = {
          name: '',
          lat: coords.latitude,
          lng: coords.longitude,
        };

        setLocation(location);
      },
      (error) => {
        console.error({ error });
      }
    );
  }, []);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    let loc = { ...location };

    if (search == 'japan')
      loc = {
        name: 'japan',
        lat: 35.658581,
        lng: 139.745438,
      };

    if (search == 'finland')
      loc = {
        name: 'finland',
        lat: 60.192059,
        lng: 24.945831,
      };

    setLocation(loc);

    const url = new URL('http://localhost:3000/api/locations');
    url.searchParams.append('location', search);

    fetch(url.toString())
      .then((resp) => resp.json())
      .then((data) => setReviews(data))
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
  };

  const items = React.useMemo(() => {
    return reviews?.map(
      (
        item: { title: string; author: string; review: string; id: string },
        i: number
      ) => {
        return (
          <ListItemStyled index={i} key={item.id}>
            <h1>{item.title}</h1>
            <span>{item.id}</span>
            <span>{item.author}</span>
            <p>{item.review}</p>
          </ListItemStyled>
        );
      }
    );
  }, [reviews]);

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

              <form onSubmit={submit}>
                <SearchInput
                  onClick={submit}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </form>

              <ContentReviewsDefaultContainer>
                {!loading && <ListStyled>{items}</ListStyled>}
              </ContentReviewsDefaultContainer>
            </ContentSearchStyled>
          </ContentPanelStyled>
          <ContentMapStyled>
            <SimpleMap lat={location.lat} lng={location.lng} />

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
