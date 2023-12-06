import { type FC, memo } from 'react';
import Select, { type SingleValue } from 'react-select';

type TOption = { value: string; label: string };

interface SelectProps {
  name: string;
  options: string[];
  placeholder?: string;
  label?: string;
  setFieldValue: (field: string, value: string, shouldValidate?: boolean | undefined) => void;
}

export const SelectComponent: FC<SelectProps> = memo(function mySelect({ options, label, placeholder, name, setFieldValue }) {
  const onSelect = (newValue: SingleValue<TOption>) => {
    console.log(newValue);
    
    setFieldValue(name, newValue?.value || '');
  };
  console.log(options);
  
  const transformedOptions = options.map(value => ({ value, label: value }));

  return (
    <div className="flex text-2xl items-center">
      {label && <span>{label}</span>}
      <Select
        options={transformedOptions}
        placeholder={placeholder}
        isSearchable={false}
        defaultValue={transformedOptions[options.length - 1]}
        onChange={onSelect}
        styles={{
          control: baseStyles => ({
            ...baseStyles,
            backgroundColor: 'transparent',
            padding: '6px',
            border: 'none',
            boxShadow: 'none',
            borderRadius: 'unset',
          }),
          placeholder: baseStyles => ({
            ...baseStyles,
            fontWeight: 'bold',
            color: '#212121',
          }),
          indicatorSeparator: () => ({
            display: 'none',
          }),
        }}
      />
    </div>
  );
});
