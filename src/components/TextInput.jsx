import React from "react";
import { useFormikContext } from "formik";

export const TextInput = ({ name, width = "w-full" }) => {
  const { setFieldValue, errors, touched, setFieldTouched } =
    useFormikContext();
  return (
    <div className={`${width}  mt-2 `}>
      <div className="flex items-center">
        <label htmlFor={name} className="text-white capitalize mr-3">
          {name}:
        </label>
        <input
          onInput={(e) => setFieldValue(name, e.target.value)}
          id={name}
          onBlur={() => setFieldTouched(name)}
          className="bg-white rounded-md p-2 flex-1 w-full"
          type="text"
        />
      </div>
      <p className="mt-2 text-red-500" hidden={!touched[name]}>
        {errors[name]}
      </p>
    </div>
  );
};
