import React from "react";
import { DefaultInputStyled } from "../../styles/components/input/DefaultInput";
import { SearchButtonStyled } from "../../styles/components/input/SearchInput";
import { FaSearch } from "react-icons/fa";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onClick: (e: any) => void;
}

export default function SearchInput({ onClick, ...rest }: Props) {
  return (
    <div style={{ position: "relative" }}>
      <DefaultInputStyled {...rest} />
      <SearchButtonStyled onClick={onClick}>
        <FaSearch />
      </SearchButtonStyled>
    </div>
  );
}
