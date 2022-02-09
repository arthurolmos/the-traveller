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

export const LogoStyled = styled.img`
  object-fit: contain;
  width: 300px;

  @media (max-width: 600px) {
    width: 200px;
  }
`;

export const MenuStyled = styled.ul`
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

export const PanelContainerStyled = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  position: relative;
`;

export const AuthContainerStyled = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 1300px) {
    display: none;
  }
`;

export const SignButtonsContainerStyled = styled.div``;

export const HamburgerButtonStyled = styled.div<{ open: boolean }>`
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
    fill: ${({ open, theme }) => (open ? theme.main.orange : theme.main.gray)};
  }

  &:hover {
    > svg {
      fill: #c86420;
    }
  }

  @media (max-width: 600px) {
    height: 40px;
    width: 40px;
  }

  @media (min-width: 1300px) {
    display: none;
  }
`;

export const CollapsableMenuStyled = styled.div<{
  open: boolean;
  collapsed: boolean;
}>`
  position: absolute;
  top: ${({ collapsed }) => (collapsed ? '100px' : '130px')};
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  margin-top: 0;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  transition: all 0.5s ease;
  height: ${({ open }) => (open ? '200px' : 0)};

  * {
    overflow: hidden;
  }

  @media (min-width: 1300px) {
    display: none;
  }

  @media (max-width: 600px) {
    height: ${({ open }) => (open ? '400px' : 0)};
    top: ${({ collapsed }) => (collapsed ? '70px' : '100px')};
    flex-direction: column;
  }
`;

export const CollapsableMenuListContainerStyled = styled.ul`
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

export const CollapsableMenuSignContainerStyled = styled.div`
  flex: 1;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

export const UserMenuContainerStyled = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 20px;

  > span {
    cursor: pointer;
  }

  > span:hover {
    font-weight: bold;
  }
`;

export const CollapsablePanelContainerStyled = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 20px;
  justify-content: end;
  gap: 2em;

  @media (max-width: 600px) {
    justify-content: center;
  }
`;
