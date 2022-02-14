import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import React from 'react';
import MainContainer from '../../components/layouts/MainContainer';
import PageComponent from '../../components/layouts/PageComponent';

export function AboutUs() {
  return (
    <MainContainer title="About Us">
      <PageComponent title="About Us">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam,
          impedit quo. Harum atque reprehenderit aliquam odio, illo ullam
          provident numquam.
        </p>
      </PageComponent>
    </MainContainer>
  );
}

export const getServerSideProps = withAuthUserTokenSSR({})();

export default withAuthUser()(AboutUs);
