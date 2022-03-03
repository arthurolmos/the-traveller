import React from 'react';
import {
  UsersTableBodyRowStyled,
  UsersTableBodyStyled,
  UsersTableContainerStyled,
  UsersTableHeaderRowStyled,
  UsersTableHeaderStyled,
  UsersTableStyled,
} from '../../styles/pages/admin/AdminManageUsers';
import { useTable, useResizeColumns, useBlockLayout } from 'react-table';

export function AdminUsersTable({ columns, data }) {
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
    <UsersTableContainerStyled>
      <UsersTableStyled {...getTableProps()}>
        <UsersTableHeaderStyled>
          {headerGroups.map((headerGroup) => (
            <UsersTableHeaderRowStyled {...headerGroup.getHeaderGroupProps()}>
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
            </UsersTableHeaderRowStyled>
          ))}
        </UsersTableHeaderStyled>

        <UsersTableBodyStyled {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <UsersTableBodyRowStyled {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <div {...cell.getCellProps()} className="td">
                      {cell.render('Cell')}
                    </div>
                  );
                })}
              </UsersTableBodyRowStyled>
            );
          })}
        </UsersTableBodyStyled>
      </UsersTableStyled>
    </UsersTableContainerStyled>
  );
}
