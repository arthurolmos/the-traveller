import React from 'react';
import Select, { GroupBase, StylesConfig, Props } from 'react-select';

const styles: StylesConfig = {
  placeholder: (styles) => ({
    ...styles,
    fontSize: 12,
  }),
  option: (styles) => ({
    ...styles,
    fontSize: 12,
  }),
  input: (styles) => ({
    ...styles,
    fontSize: 12,
  }),
  singleValue: (styles) => ({
    ...styles,
    fontSize: 12,
  }),
};

export function SelectInput<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) {
  return <Select {...props} styles={styles} />;
}
