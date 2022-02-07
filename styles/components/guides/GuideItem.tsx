import styled from "styled-components";

export const GuideItemDescriptionStyled = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.6);
  height: 150px;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1;
  color: black;
  padding: 15px;
  overflow: hidden;
`;

export const GuideItemStyled = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 350px;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    ${GuideItemDescriptionStyled} {
      transition: background 0.5s ease;
      background: rgba(0, 0, 0, 0.8);

      h1,
      span {
        transition: color 0.5s ease;
        color: white;
      }

      > p {
        transition: color 1s ease;
        color: white;
      }
    }

    img {
      transition: transform 0.5s ease;
      transform: scale(1.1);
      opacity: 0.8;
    }
  }
`;

export const GuideItemHeaderStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  > h1 {
    font-size: 2em;
  }

  > span {
    flex: 1;
    text-align: end;
  }
`;
