import React from 'react';
import {
  TableBodyRowStyled,
  TableBodyStyled,
  TableContainerStyled,
  TableHeaderRowStyled,
  TableHeaderStyled,
  TableStyled,
} from '../../styles/components/tables/DefaultTable';
import { useTable, useResizeColumns, useBlockLayout } from 'react-table';

export function DefaultTable({ columns, data }) {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 400,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    resetResizing,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout,
    useResizeColumns
  );

  return (
    <TableContainerStyled>
      <TableStyled {...getTableProps()}>
        <TableHeaderStyled>
          {headerGroups.map((headerGroup) => (
            <TableHeaderRowStyled {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <div {...column.getHeaderProps()} className="th">
                  {column.render('Header')}
                  {/* Use column.getResizerProps to hook up the events correctly */}
                  <div
                    {...column.getResizerProps()}
                    className={`resizer ${
                      column.isResizing ? 'isResizing' : ''
                    }`}
                  />
                </div>
              ))}
            </TableHeaderRowStyled>
          ))}
        </TableHeaderStyled>

        <TableBodyStyled {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <TableBodyRowStyled {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <div {...cell.getCellProps()} className="td">
                      {cell.render('Cell')}
                    </div>
                  );
                })}
              </TableBodyRowStyled>
            );
          })}
        </TableBodyStyled>
      </TableStyled>
    </TableContainerStyled>
  );
}
