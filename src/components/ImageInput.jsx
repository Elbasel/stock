import { FileInput } from "@mantine/core";
import { IconUpload } from "@tabler/icons";
import { useFormikContext } from "formik";

export function ImageInput({ name }) {
  const { setFieldValue, errors } = useFormikContext();
  return (
    <FileInput
      className="text-3xl"
      error={errors[name]}
      onChange={(f) => setFieldValue(name, URL.createObjectURL(f))}
      label="image upload"
      placeholder="image upload"
      icon={<IconUpload size={14} />}
    />
  );
}
