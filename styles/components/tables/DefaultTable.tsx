import styled from 'styled-components';

export const TableContainerStyled = styled.div`
  padding: 1rem;
`;

export const TableStyled = styled.div`
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

    &:not(:last-child) {
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
  }
`;

export const TableHeaderStyled = styled.div``;

export const TableBodyStyled = styled.div``;

export const TableHeaderRowStyled = styled.div`
  cursor: pointer;
`;

export const TableBodyRowStyled = styled.div`
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

export const TableActionContainerStyled = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const TableActionButtonStyled = styled.div`
  background: none;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;
