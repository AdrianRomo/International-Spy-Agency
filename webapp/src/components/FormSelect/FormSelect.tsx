import { useField } from "formik";
import { Form } from "react-bootstrap";

import { FormSelectProps } from "./FormSelect.d";

function FormSelect({
  name,
  label,
  options,
  placeholder,
  ...otherProps
}: FormSelectProps) {
  const [field, meta] = useField(name);
  const { error, touched } = meta;

  const showError = error && touched;

  return (
    <Form.Group>
      <Form.Label htmlFor={otherProps.id}>{label && label}</Form.Label>
      <Form.Control as="select" {...field} name={name} {...otherProps}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map(({ value, text }) => (
          <option key={`${text}-${value}`} value={value}>
            {text}
          </option>
        ))}
      </Form.Control>
      {showError && <Form.Text>{error}</Form.Text>}
    </Form.Group>
  );
}

FormSelect.defaultProps = {
  disabled: false,
};

export { FormSelect };
