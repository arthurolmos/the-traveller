import { withAuthUser } from 'next-firebase-auth';
import React from 'react';
import MainContainer from '../../components/layout/MainContainer';
import PageComponent from '../../components/layout/PageComponent';

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

export default withAuthUser()(AboutUs);
