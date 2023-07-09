interface FormFieldType {
  type: string;
  id: string;
  placeholder: string;
  label: string;
  margin: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormField({
  type,
  id,
  placeholder,
  label,
  margin,
  onChange,
}: FormFieldType): JSX.Element {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };
  return (
    <div className={`form-floating mt-${margin}`}>
      <input
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
        required
        onChange={handleChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default FormField;
