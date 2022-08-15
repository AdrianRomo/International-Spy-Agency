interface SelectOption {
  text: string;
  value: bool | string | number;
}

interface FormSelectProps {
  name: string;
  label: string | React.ReactElement;
  id: string;
  placeholder: string;
  options: SelectOption[];
  disabled: boolean;
}

export { FormSelectProps, SelectOption };
