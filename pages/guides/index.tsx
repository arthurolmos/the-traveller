import { GetServerSideProps } from 'next';
import React from 'react';
import GuideItem from '../../components/guides/GuideItem';
import MainContainer from '../../components/layout/MainContainer';
import PageComponent from '../../components/layout/PageComponent';
import { IGuideItem } from '../../interfaces/IGuideItem';
import { GuidesContentStyled } from '../../styles/pages/Guides';

export default function Guides({ data }) {
  return (
    <MainContainer title="Guides">
      <PageComponent title="Guides">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam,
          impedit quo. Harum atque reprehenderit aliquam odio, illo ullam
          provident numquam.
        </p>

        <GuidesContentStyled>
          {data.map((item: IGuideItem, i: number) => {
            return <GuideItem key={i} item={item} />;
          })}
        </GuidesContentStyled>
      </PageComponent>
    </MainContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const url = new URL('http://localhost:3000/api/guides');

    const resp = await fetch(url.toString());

    const data = await resp.json();

    return {
      props: {
        data,
      },
    };
  } catch (err) {
    console.error(err);

    return {
      props: {
        data: [],
      },
    };
  }
};
