import * as React from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';
import { FieldInputProps, useField } from 'formik';
import NumberFormat from 'react-number-format';


interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

function NumberFormatCustom(props: NumberFormatCustomProps) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      prefix="$"
    />
  );
}

export function handleChangeFormField(
  field: FieldInputProps<any>,
  event: React.ChangeEvent<any>,
  onChange?: (evt: React.ChangeEvent<any>) => void
): void {
  field.onChange(event);

  if (onChange) {
    onChange(event);
  }
}

export function handleBlurFormField(
  field: FieldInputProps<any>,
  event: React.FocusEvent<any>,
  onBlur?: (event: React.FocusEvent<any>) => void
) {
  field.onBlur(event);

  if (onBlur) {
    onBlur(event);
  }
}

const parse = (value: unknown, name: string) => {
  console.log({ value, name });
  
  return value;
};

export const FormTextField: React.FunctionComponent<TextFieldProps> = ({ ...rest }) => {
  const [field] = useField({ name: rest.name as string });

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
  //   handleChangeFormField(field, event, rest.onChange);

  // const handleBlur = (event: React.FocusEvent<HTMLInputElement>) =>
  //   handleBlurFormField(field, event, rest.onBlur);

  return (
    <TextField
      {...rest} 
      {...field}
      // onChange={handleChange}
      // onBlur={handleBlur}
      InputProps={{
        inputComponent: NumberFormatCustom as any,
        inputProps: {
          decimalScale: 2,
          isNumericString: true
        }
      }}
    />
  );
}