import styled from 'styled-components';

export const DefaultModalLayoutStyled = styled.div<{ open: boolean }>`
  position: fixed;
  inset: 0;
  margin: auto;
  display: ${({ open }) => (open ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 9;

  &::before {
    content: '';
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
  }
`;

export const ModalContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  height: 80%;
  background: white;
  z-index: 99;
  padding: 25px;
  gap: 20px;
  overflow: auto;
  position: relative;

  > h1 {
    text-align: center;
  }

  > svg {
    align-self: end;
    color: black;
    position: absolute;
    top: 20px;
    rigth: 10px;

    cursor: pointer;

    &:hover {
      opacity: 0.6;
    }
  }
`;
