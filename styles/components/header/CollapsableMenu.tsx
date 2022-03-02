import styled from 'styled-components';

export const CollapsableMenuStyled = styled.div<{ open: boolean }>`
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  margin-top: 0;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  transition: all 0.3s ease;
  height: ${({ open }) => (open ? '250px' : 0)};

  * {
    overflow: hidden;
  }

  @media (min-width: 1300px) {
    display: none;
  }

  @media (max-width: 600px) {
    height: ${({ open }) => (open ? '500px' : 0)};
    flex-direction: column;
  }
`;

export const CollapsableMenuListContainerStyled = styled.ul`
  flex: 1;

  > li {
    list-style: none;
    transition: all 0.3s ease;
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
