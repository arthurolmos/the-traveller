import React from 'react';
import countryList from 'react-select-country-list';
import { SelectInput } from '.';
import { ICountry } from '../../interfaces/ICountry';

interface Props {
  value: ICountry;
  onChange: React.Dispatch<React.SetStateAction<ICountry>>;
}

export function CountrySelectInput({ value, onChange }: Props) {
  const options = React.useMemo(() => countryList().getData(), []);

  return (
    <SelectInput
      options={options}
      value={value}
      onChange={onChange}
      id="long-value-select"
      instanceId="long-value-select"
    />
  );
}
