import {
  QuillInputContainerStyled,
  QuillInputStyled,
} from '../../styles/components/inputs/QuillInput';

interface Props {
  onChange: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  placeholder: string;
}

export default function QuillInput({ ...rest }: Props) {
  return (
    <QuillInputContainerStyled>
      <QuillInputStyled theme="snow" {...rest} />;
    </QuillInputContainerStyled>
  );
}
