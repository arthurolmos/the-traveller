import styled from 'styled-components';

export const GalleryImageContainerStyled = styled.div`
  height: 200px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  cursor: pointer;

  img {
    transition: all 0.5s ease;
  }

  &:hover {
    img {
      transform: scale(1.1);
      opacity: 0.8;
    }
  }
`;

export const CoverImageContainerStyled = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CoverImageDescriptionStyled = styled.div`
  position: absolute;
  inset: 0;
  margin: auto;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PageContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 45px;
`;

export const TextSectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: justify;
`;

export const GallerySectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const GalleryGridStyled = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 45px 0;
  gap: 20px;

  @media (max-width: 1040px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

export const ImageDisplayStyled = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  z-index: 9;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
  }
`;

export const ImageDisplayContainerStyled = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: 600px;

  > svg {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 999;
    cursor: pointer;
    fill: black;
  }

  > svg:hover {
    opacity: 0.6;
  }

  @media (max-width: 860px) {
    width: 500px;
    height: 350px;
  }

  @media (max-width: 600px) {
    width: 300px;
    height: 200px;
  }
`;
