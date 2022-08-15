interface FormTextInputProps {
  name: string;
  label: string | React.ReactElement;
  id: string;
  placeholder: string;
  type: string;
  as: "textarea" | "input";
  disabled: boolean;
}

export { FormTextInputProps };
