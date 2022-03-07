import React from 'react';
import { DefaultInput } from './DefaultInput';
import { SearchButtonStyled } from '../../styles/components/inputs/SearchInput';
import { FaSearch } from 'react-icons/fa';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onClick: () => void;
}

export function SearchInput({ onClick, ...rest }: Props) {
  function submit(e: React.FormEvent) {
    e.preventDefault();

    onClick();
  }

  return (
    <div style={{ position: 'relative' }}>
      <DefaultInput {...rest} />
      <SearchButtonStyled onClick={submit}>
        <FaSearch />
      </SearchButtonStyled>
    </div>
  );
}
