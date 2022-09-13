import { FileInput } from "@mantine/core";
import { IconUpload } from "@tabler/icons";
import { useFormikContext } from "formik";

export function ImageInput({ name }) {
  const { setFieldValue, errors } = useFormikContext();
  return (
    <FileInput
      classNames={{ label: "my-2" }}
      size="lg"
      accept="image/png,image/jpeg"
      className="text-xl"
      error={errors[name]}
      // onChange={(f) => setFieldValue(name, URL.createObjectURL(f))}
      onChange={(f) => setFieldValue(name, f)}
      label="Image Upload"
      placeholder="Upload Image"
      icon={<IconUpload size={14} />}
    />
  );
}
