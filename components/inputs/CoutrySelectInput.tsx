import React from 'react';
import countryList from 'react-select-country-list';
import { SelectInput } from '.';

interface Props {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

export function CountrySelectInput({ value, onChange }: Props) {
  const options = React.useMemo(() => countryList().getData(), []);

  return <SelectInput options={options} value={value} onChange={onChange} />;
}
