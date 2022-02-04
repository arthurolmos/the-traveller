import styled from "styled-components";

const theme = {
  main: {
    color: "#c86420",
    background: "#ffffff",
  },
  dark: {
    color: "#975310",
  },
  inverted: {
    background: "#c86420",
    color: "#ffffff",
  },
};

export const HeaderStyled = styled.nav<{ offset: number }>`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${({ offset }) => (offset >= 200 ? "1rem 2rem" : "2rem 2rem")};
  border-bottom: 1px solid lightgray;
  background: white;
  transition: all 0.5s ease;
  box-shadow: 0 5px 10px gray;
  z-index: 9;
  max-height: 130px;
`;

export const HeaderLogoStyled = styled.img`
  object-fit: contain;
  width: 300px;
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
      color: #c86420;
      transform: scale(1.1);
    }
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
  position: relative;

  > span {
    transition: all 0.5s ease;
    cursor: pointer;

    &:hover {
      color: #c86420;
      transform: scale(1.1);
    }
  }

  @media (max-width: 1300px) {
    display: none;
  }
`;

export const SignButtonStyled = styled.div<{ inverted?: boolean }>`
  border-width: 3px;
  border-style: solid;
  border-radius: 25px;
  border-color: ${theme.main.color};
  background: ${({ inverted }) =>
    inverted ? theme.inverted.background : theme.main.background};
  padding: 5px 10px;
  width: 120px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all .5s ease;
  color ${({ inverted }) =>
    inverted ? theme.inverted.color : theme.main.color};

    &:hover {
        color ${({ inverted }) => !!!inverted && theme.dark.color};
        background ${({ inverted }) => inverted && theme.dark.color};
        border-color: ${theme.dark.color};
        // font-size: 1.1em;

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
  box-shadow: 5px 2px 5px lightgray;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  > svg {
    transition: all 0.5s ease;
    fill: ${({ open }) => (open ? "#c86420" : "black")};
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

export const HeaderCollapsableMenuStyled = styled.div`
  position: absolute;
  bottom: -200px;
  left: 0;
  right: 0;
  background: white;
  // background: red;
  // opacity: 0.3;
  padding: 15px;
  display: flex;
  flex-direction: row;

  @media (min-width: 1300px) {
    display: none;
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
      color: #c86420;
    }
  }
`;

export const HeaderCollapsableMenuSignContainerStyled = styled.ul`
  flex: 1;
  // background: green;
  display: flex;
  // flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;
