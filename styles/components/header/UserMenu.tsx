import styled from 'styled-components';

export const UserMenuStyled = styled.div`
  width: 300px;
  border-color: ${({ theme }) => theme.main.orange};
  border-width: 2px;
  border-radius: 0 15px 0 15px;
  border-style: solid;
  background: white;
  position: absolute;
  top: 20px;
  right: 0;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 15px;

  > ul {
    list-style-type: none;
    padding: 0;

    > li {
      cursor: pointer;
      margin-bottom: 20px;

      > svg {
        margin-right: 10px;
      }
    }

    > li:last-child {
      margin-bottom: 0;
      color: red;
    }

    > li:hover {
      font-weight: bold;
    }
  }

  @media (max-width: 1300px) {
    position: relative;
    border: none;
    padding: 0;

    > ul {
      > li {
        margin-bottom: 5px;
      }

      > li:last-child {
        margin-top: 10px;
      }
    }
  }
`;
