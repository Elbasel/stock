import React from "react";
import { useState } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { ListPicker } from "./ListPicker";
import { TextInput } from "./TextInput";
import { SubmitButton } from "./SubmitButton";
import { Form } from "./Form";
import { QuantityInput } from "./NumberInput";
import { AiFillCloseCircle } from "react-icons/ai";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  count: Yup.number().required().label("count"),
  title: Yup.string().required().label("Title"),
  category: Yup.string().required().label("Category"),
});

export const AddItem = ({ onAdd }) => {
  const [modelHidden, setModalHidden] = useState(true);

  return (
    <div className=" w-full sm:w-1/2 text-3xl">
      <div className=" rounded-md m-3 bg-green-600  flex items-center text-white relative ">
        <p className="p-5">Add Item</p>
        <button
          onClick={() => setModalHidden(false)}
          className="active:scale-95 ml-auto p-5"
        >
          <BsFillPlusCircleFill size={50} color="cyan" />
        </button>
        <div
          className="scale-in w-full absolute rounded-md  bg-gray-900 z-10 p-5 mt-52"
          hidden={modelHidden}
        >
          <div className="flex justify-end">
            <button
              className="active:scale-95"
              onClick={() => setModalHidden(true)}
            >
              <AiFillCloseCircle size={49} color="#FDC9C9" />
            </button>
          </div>
          <Form
            initialValues={{
              count: 1,
              title: "",
              category: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(v) => onAdd(v)}
          >
            <TextInput name="title" />
            <QuantityInput theme="dark" label="count" name="count" />
            <ListPicker name="category" values={["one", "two"]} />
            {/* <ImageInput name="imageUrl" /> */}
            <TextInput name="imageUrl" label="Image Url" />
            <SubmitButton
              onSubmit={() => {
                setModalHidden(true);
              }}
            />
          </Form>
        </div>
      </div>
    </div>
  );
};
