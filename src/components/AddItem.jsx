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
import { ImageInput } from "./ImageInput";

const validationSchema = Yup.object().shape({
  count: Yup.number().required().label("count"),
  title: Yup.string().required().label("Title"),
  category: Yup.string().required().label("Category"),
});

export const AddItem = ({ onAdd, categories }) => {
  const [modelHidden, setModalHidden] = useState(true);

  return (
    <div className=" w-full ">
      <div className=" rounded-md m-3 h-12 bg-green-600  flex items-center text-white  relative ">
        <p className="p-5 sm:text-2xl">Add Item</p>
        <button
          onClick={() => setModalHidden(false)}
          className="active:scale-95 ml-auto p-5"
        >
          <BsFillPlusCircleFill size={24} color="cyan" />
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
              <AiFillCloseCircle size={32} color="#FDC9C9" />
            </button>
          </div>
          <Form
            initialValues={{
              count: 1,
              title: "",
              category: "",
              imageFile: null,
            }}
            validationSchema={validationSchema}
            onSubmit={(v) => onAdd(v)}
          >
            <TextInput name="title" />
            <QuantityInput
              theme="dark"
              label="count"
              name="count"
           
            />
            <ListPicker
              name="category"
              data={categories.map((c) => c.get("name"))}
            />
            <ImageInput name="imageFile" />
            {/* <TextInput name="imageUrl" label="Image Url" /> */}
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

async function saveImgMessage(fileObject) {
  var messageClass = Parse.Object.extend("Message");
  var message = new messageClass();
  message.set("img", fileObject.url());
  message.set("username", Parse.User.current().get("username"));
  message.set("body", "#");

  message.save();
}

function uploadFile() {
  document.body
    .querySelector("#file-upload")
    .addEventListener("change", function (e) {
      var fileUploadControl = document.querySelector("#file-upload");
      var file = fileUploadControl.files[0];
      let name = file.name; //This does *NOT* need to be a unique name
      name = name.trim().replace(" ", "");
      name = name.replace("(", "");
      name = name.replace(")", "");
      var parseFile = new Parse.File(name, file);

      parseFile.save().then(
        () => {
          Chat.saveImgMessage(parseFile);
        },
        function (error) {
          alert(error);
        }
      );
    });
}
