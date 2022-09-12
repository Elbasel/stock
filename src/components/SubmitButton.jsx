import { Button } from "@mantine/core";
import { useFormikContext } from "formik";

export function SubmitButton({ onSubmit }) {
  const { submitForm, errors } = useFormikContext();
  const handleSubmit = () => {
    submitForm();
    if (Object.keys(errors).length === 0) onSubmit();
  };

  return (
    <Button onClick={handleSubmit} className="w-full" size="lg">
      Add
    </Button>
  );
}
