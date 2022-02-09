import styled from 'styled-components';

export const HeaderStyled = styled.nav<{ collapsed: boolean }>`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${({ collapsed }) => (collapsed ? '1rem 2rem' : '2rem 2rem')};
  border-bottom: ${({ theme }) => `1px solid ${theme.main.gray}`};
  background: white;
  transition: all 0.5s ease;
  box-shadow: 0 5px 10px gray;
  z-index: 9;
  max-height: 130px;
`;

export const HeaderLogoStyled = styled.img`
  object-fit: contain;
  width: 300px;

  @media (max-width: 600px) {
    width: 200px;
  }
`;

export const HeaderMenuStyled = styled.ul`
  flex: 2;
  display: flex;
  flex-direction: row;
  gap: 2rem;

  > li {
    list-style: none;
    transition: all 0.5s ease;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.main.orange};
      transform: scale(1.1);
    }
  }

  > li.active {
    color: ${({ theme }) => theme.main.orange};
  }

  @media (max-width: 1300px) {
    display: none;
  }
`;

export const HeaderSignButtonsContainerStyled = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  gap: 2rem;

  @media (max-width: 1300px) {
    display: none;
  }
`;

export const HeaderMenuButtonContainerStyled = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  position: relative;

  @media (min-width: 1300px) {
    display: none;
  }
`;

export const HeaderMenuButtonStyled = styled.div<{ open: boolean }>`
  border: 1px solid gray;
  border-radius: 10px;
  box-shadow: ${({ theme }) => `5px 2px 5px ${theme.main.gray}`};
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  > svg {
    transition: all 0.5s ease;
    fill: ${({ open }) => (open ? '#c86420' : '6f6f6f')};
  }

  &:hover {
    > svg {
      fill: #c86420;
    }
  }

  @media (min-width: 1300px) {
    display: none;
  }
`;

export const HeaderCollapsableMenuStyled = styled.div<{
  open: boolean;
  collapsed: boolean;
}>`
  position: absolute;
  top: ${({ collapsed }) => (collapsed ? '100px' : '130px')};
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  // background: red;
  // opacity: 0.3;
  margin-top: 0;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  transition: all 0.5s ease;
  height: ${({ open }) => (open ? '180px' : 0)};

  * {
    overflow: hidden;
  }

  @media (min-width: 1300px) {
    display: none;
  }

  @media (max-width: 600px) {
    height: ${({ open }) => (open ? '400px' : 0)};
    flex-direction: column;
  }
`;

export const HeaderCollapsableMenuListContainerStyled = styled.ul`
  flex: 1;

  > li {
    list-style: none;
    transition: all 0.5s ease;
    cursor: pointer;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 10px;

    &:hover {
      color: ${({ theme }) => theme.main.orange};
    }
  }

  > li.active {
    color: ${({ theme }) => theme.main.orange};
  }
`;

export const HeaderCollapsableMenuSignContainerStyled = styled.div`
  flex: 1;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

export const HeaderUserMenuContainerStyled = styled.div`
  position: relative;

  > span {
    cursor: pointer;
  }

  > span:hover {
    font-weight: bold;
  }
`;

export const HeaderUserMenuStyled = styled.div`
  width: 300px;
  padding: 15px;
  border-color: ${({ theme }) => theme.main.orange};
  border-width: 2px;
  border-radius: 0 15px 0 15px;
  border-style: solid;
  background: white;
  position: absolute;
  top: 20px;
  right: 0;
  display: flex;
  flex-direction: column;

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
`;
