import React from 'react';
import { DefaultInput } from './DefaultInput';
import { SearchButtonStyled } from '../../styles/components/inputs/SearchInput';
import { FaSearch } from 'react-icons/fa';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onClick: (e: React.FormEvent) => void;
}

export function SearchInput({ onClick, ...rest }: Props) {
  return (
    <div style={{ position: 'relative' }}>
      <DefaultInput {...rest} />
      <SearchButtonStyled onClick={onClick}>
        <FaSearch />
      </SearchButtonStyled>
    </div>
  );
}
