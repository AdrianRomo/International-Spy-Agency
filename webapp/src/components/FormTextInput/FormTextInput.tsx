import { useField } from "formik";
import { Form } from "react-bootstrap";
import { FormTextInputProps } from "./FormTextInput.d";

function FormTextInput({ name, label, as, ...otherProps }: FormTextInputProps) {
  const [field, meta] = useField(name);
  const { error, touched } = meta;

  const showError = error && touched;

  return (
    <Form.Group>
      <Form.Label htmlFor={otherProps.id}>{label && label}</Form.Label>
      <Form.Control {...field} {...otherProps} name={name} as={as} />
      {showError && <Form.Text>{error}</Form.Text>}
    </Form.Group>
  );
}

FormTextInput.defaultProps = {
  as: "input",
  disabled: false,
};

export { FormTextInput };
