import React from 'react';
import { DefaultInputStyled } from '../../styles/components/inputs/DefaultInput';
import { SearchButtonStyled } from '../../styles/components/inputs/SearchInput';
import { FaSearch } from 'react-icons/fa';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onClick: (e: React.FormEvent) => void;
}

export default function SearchInput({ onClick, ...rest }: Props) {
  return (
    <div style={{ position: 'relative' }}>
      <DefaultInputStyled {...rest} />
      <SearchButtonStyled onClick={onClick}>
        <FaSearch />
      </SearchButtonStyled>
    </div>
  );
}
