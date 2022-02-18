import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import React from 'react';
import GuideItem from '../../components/guides/GuideItem';
import { MainContainer, PageComponent } from '../../components/layouts';
import { IGuideItem } from '../../interfaces/IGuideItem';
import { GuidesContentStyled } from '../../styles/pages/Guides';

interface Props {
  data: IGuideItem[];
}

export function Guides({ data }: Props) {
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

export const getServerSideProps = withAuthUserTokenSSR()(async () => {
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
});

export default withAuthUser<Props>()(Guides);
