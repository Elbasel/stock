import { Button } from "@mantine/core";
import { useFormikContext } from "formik";

export function SubmitButton({ onSubmit }) {
  const { submitForm, values } = useFormikContext();
  const handleSubmit = () => {
    onSubmit();
    submitForm();
  };

  return (
    <Button onClick={handleSubmit} className="w-full" size="lg">
      Add
    </Button>
  );
}
