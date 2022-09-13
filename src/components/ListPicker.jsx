import { NativeSelect } from "@mantine/core";
import { AiFillAppstore } from "react-icons/ai";
import { useFormikContext } from "formik";

export function ListPicker({
  name,
  data = ["React", "Vue", "Angular", "Svelte"],
}) {
  const { setFieldValue, errors, touched, setFieldTouched } =
    useFormikContext();
  return (
    <>
      <p className="sm:text-2xl capitalize my-2 asterisk">{name}</p>
      <NativeSelect
        value=""
        classNames={{ input: "sm:text-2xl  h-20" }}
        icon={<AiFillAppstore size={14} />}
        placeholder={`Choose a ${name}`}
        onBlur={() => setFieldTouched(name)}
        data={data}
        // label={name}
        error={touched[name] ? errors[name] : null}
        onInput={(e) => setFieldValue(name, e.target.value)}
        withAsterisk
      />
    </>
  );
}
