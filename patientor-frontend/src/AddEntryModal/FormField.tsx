import React from 'react';
import { Form } from 'semantic-ui-react';
import { Field } from 'formik';

export type TypeOption = {
  value: string;
  label: string;
};

type SelectTypeFieldProps = {
  name: string;
  label: string;
  options: TypeOption[];
};

export const SelectTypeField: React.FC<SelectTypeFieldProps> = ({
  name,
  label,
  options
}: SelectTypeFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);