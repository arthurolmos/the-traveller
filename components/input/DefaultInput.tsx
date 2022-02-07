import React from "react";
import { DefaultInputStyled } from "../../styles/components/input/DefaultInput";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function DefaultInput({ ...rest }: Props) {
  return <DefaultInputStyled {...rest} />;
}
