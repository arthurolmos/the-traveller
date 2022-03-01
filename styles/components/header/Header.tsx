import styled from 'styled-components';

export const HeaderStyled = styled.nav`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  border-bottom: ${({ theme }) => `1px solid ${theme.main.gray}`};
  background: white;
  transition: all 0.5s ease;
  box-shadow: 0 5px 10px gray;
  z-index: 9;
  height: 80px;
`;

export const LogoStyled = styled.img`
  object-fit: contain;
  width: 250px;
  cursor: pointer;

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
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.main.orange};
      transform: scale(1.05);
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

export const HamburgerButtonStyled = styled.div<{ open: boolean }>`
  border: 1px solid gray;
  border-radius: 10px;
  box-shadow: ${({ theme }) => `5px 2px 5px ${theme.main.gray}`};
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 40px;
  width: 40px;

  > svg {
    transition: all 0.5s ease;
    fill: ${({ open, theme }) => (open ? theme.main.orange : theme.main.gray)};
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

export const CollapsableMenuSignContainerStyled = styled.div`
  flex: 1;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;
