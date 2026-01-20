import { TextFieldVariants } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { ChangeEvent, forwardRef } from 'react';

import BootstrapInput from '@/components/bootstrap-input';

import { DataType, useTextFieldNumber } from './use-textfield-number';

type NumberVariant = 'simple' | TextFieldVariants;

type TextFieldNumberProps = Omit<TextFieldProps, 'onChange' | 'value' | 'variant'> & {
  inputType?: DataType;
  value?: number | string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  allowNegative?: boolean;
  variant?: NumberVariant;
};

const TextFieldNumber = forwardRef<HTMLInputElement, TextFieldNumberProps>((props, ref) => {
  const {
    onChange,
    className,
    value,
    allowNegative = false,
    inputType = DataType.INT,
    variant = 'filled',
    label,
    placeholder,
    disabled,
    size,
    fullWidth,
    sx,
    ...rest
  } = props;

  const hooks = useTextFieldNumber({
    value,
    onChange,
    inputType,
    allowNegative,
  });

  if (variant === 'simple') {
    return (
      <BootstrapInput
        inputRef={ref}
        value={hooks.formattedValue}
        onChange={(ev: ChangeEvent<HTMLInputElement>) => hooks.onChange(ev.target.value)}
        inputProps={{ inputMode: 'numeric' }}
        placeholder={placeholder as string}
        disabled={disabled}
        size={size === 'medium' ? undefined : size}
        fullWidth={fullWidth}
        className={className}
        sx={sx}
      />
    );
  }

  return (
    <TextField
      variant={variant as TextFieldVariants}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      size={size}
      fullWidth={fullWidth}
      className={className}
      sx={sx}
      {...rest}
      value={hooks.formattedValue}
      onChange={(ev: ChangeEvent<HTMLInputElement>) => hooks.onChange(ev.target.value)}
      inputRef={ref}
      inputMode="numeric"
    />
  );
});

TextFieldNumber.displayName = 'TextFieldNumber';

export default TextFieldNumber;
export { DataType, type NumberVariant, type TextFieldNumberProps };
