import styled from 'styled-components';

export const UsersTableContainerStyled = styled.div`
  padding: 1rem;
`;

export const UsersTableStyled = styled.div`
  display: inline-block;
  border-spacing: 0;

  .th,
  .td {
    margin: 0;
    padding: 0.5rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    ${
      '' /* In this example we use an absolutely position resizer,
     so this is required. */
    }
    position: relative;

    :last-child {
      border-right: 0;
    }

    .resizer {
      display: inline-block;
      background: ${({ theme }) => theme.main.lightgray};
      width: 10px;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      transform: translateX(50%);
      z-index: 1;
      ${'' /* prevents from scrolling while dragging on touch devices */}
      touch-action:none;

      &.isResizing {
        background: ${({ theme }) => theme.main.orange};
      }
    }
  }
`;

export const UsersTableHeaderStyled = styled.div``;

export const UsersTableBodyStyled = styled.div``;

export const UsersTableHeaderRowStyled = styled.div`
  cursor: pointer;
`;

export const UsersTableBodyRowStyled = styled.div`
  cursor: pointer;

  &:nth-child(even) {
    background: ${({ theme }) => theme.main.lightgray};
  }

  &:last-child {
    .td {
      border-bottom: 0;
    }
  }

  &:hover {
    color: white;
    background: ${({ theme }) => theme.main.orange};
  }
`;
