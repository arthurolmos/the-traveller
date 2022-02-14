import styled from 'styled-components';

export const PostsSectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 400px;

  > h2 {
    text-align: center;
  }

  ul {
    list-style-type: none;
    padding: 0;
    flex: 1;
  }
`;

export const ContentStyled = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  overflow-y: scroll;
`;
