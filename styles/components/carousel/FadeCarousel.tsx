import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
    from { opacity: .2 }
    to { opacity: 1}
`;

export const FadeCarouselItemDescription = styled.div`
  position: absolute;
  bottom: 30px;
  margin: 0 30px;
  z-index: 1;
  color: white;

  > h1,
  h2 {
    transition: all 0.3s ease;
  }
`;

export const FadeCarouselItemTitle = styled.h1`
  font-size: 3em;
`;

export const FadeCarouselItemSubtitle = styled.h2``;

export const FadeCarouselStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 500px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    ${FadeCarouselItemDescription} {
      > h1,
      h2 {
        transform: scale(1.01);
      }
    }
    opacity: 0.9;
  }
`;

export const FadeCarouselIndicatorStyled = styled.span<{ direction: string }>`
  position: absolute;
  top: 40%;
  ${({ direction }) => (direction === 'left' ? 'left: 30px' : 'right: 30px')};
  z-index: 2;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.7);
  width: 50px;
  height: 50px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }
`;

export const FadeCarouselItemStyled = styled.div<{
  active: boolean;
}>`
  position: relative;
  flex: 1;
  visibility: ${({ active }) => (active ? 'visible' : 'hidden')};
  display: ${({ active }) => (active ? 'block' : 'none')};


  animation: ${({ active }) =>
    active &&
    css`
      ${fadeIn} 1s linear
    `};
  }
`;
