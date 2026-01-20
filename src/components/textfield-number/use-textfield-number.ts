import { ChangeEvent, useEffect, useMemo, useState } from 'react';

export enum DataType {
  INT = 'int',
  FLOAT = 'float',
  COORDINATE = 'coordinate',
  CURRENCY = 'currency',
}

const numberFormatterInt = Intl.NumberFormat('es-MX', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const numberFormatterFloat = Intl.NumberFormat('es-MX', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const numberFormatterCoordinate = Intl.NumberFormat('es-MX', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 7,
});

const moneyFormatter = Intl.NumberFormat('es-MX', {
  currency: 'MXN',
  currencyDisplay: 'symbol',
  currencySign: 'standard',
  style: 'currency',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export interface UseTextFieldNumberProps {
  value?: number | string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  inputType?: DataType;
  allowNegative?: boolean;
}

export function useTextFieldNumber(props: UseTextFieldNumberProps) {
  const { value: propValue, onChange, inputType = DataType.INT, allowNegative = false } = props;

  const [value, setValue] = useState<number>(propValue !== undefined ? Number(propValue) : 0);
  const [pendingNegative, setPendingNegative] = useState(false);

  useEffect(() => {
    if (propValue !== undefined && Number(propValue) !== value) {
      setValue(Number(propValue));
    }
  }, [propValue, value]);

  const parseInputValue = (formattedValue: string): number => {
    const trimmed = formattedValue.trim();
    const isNegative = allowNegative && trimmed.startsWith('-');

    if (inputType === DataType.CURRENCY) {
      const digits = formattedValue.replace(/[^0-9]/g, '');
      const numericPortion = digits ? Number(digits) / 100 : 0;
      return isNegative ? -numericPortion : numericPortion;
    }

    let cleanValue = formattedValue.replace(/[^0-9.,]/g, '');
    cleanValue = cleanValue.replace(/,/g, '');

    let numericValue = cleanValue ? parseFloat(cleanValue) : 0;

    if (inputType === DataType.INT) {
      numericValue = Math.floor(numericValue);
    }

    return isNegative ? -numericValue : numericValue;
  };

  const onChangeHandler = (formattedValue: string) => {
    const trimmed = formattedValue.trim();
    const isNegative = allowNegative && trimmed.startsWith('-');

    const realValue = parseInputValue(formattedValue);
    setValue(realValue);
    setPendingNegative(isNegative && formattedValue.replace(/[^0-9]/g, '').length === 0);

    if (onChange) {
      const syntheticEvent = {
        target: { value: realValue },
      } as unknown as ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  const formattedValue = useMemo(() => {
    if (allowNegative && pendingNegative && value === 0) return '-';

    switch (inputType) {
      case DataType.INT:
        return numberFormatterInt.format(Number(value));
      case DataType.FLOAT:
        return numberFormatterFloat.format(Number(value));
      case DataType.COORDINATE:
        return numberFormatterCoordinate.format(Number(value));
      case DataType.CURRENCY:
        return moneyFormatter.format(Number(value));
      default:
        return numberFormatterInt.format(Number(value));
    }
  }, [value, allowNegative, pendingNegative, inputType]);

  return {
    formattedValue,
    onChange: onChangeHandler,
  };
}
