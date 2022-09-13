import React from "react";
import { useState } from "react";
import PubSub from "pubsub-js";

export const CategoryFilter = ({ categories, onFilterClick }) => {
  const handleClick = (text) => {
    if (onFilterClick) onFilterClick(text);
  };

  return (
    <div className="w-full flex gap-2 overflow-x-auto">
      {categories.map((c) => (
        <FilterItem key={c.id} text={c.get("name")} onClick={handleClick} />
      ))}
    </div>
  );
};

const FilterItem = ({ onClick, text }) => {
  const [clicked, setClicked] = useState(false);

  PubSub.subscribe("item clicked", (msg, itemText) => {
    // debugger;
    if (itemText !== text) setClicked(false);
  });
  return (
    <div
      onClick={() => {
        setClicked((c) => !c);
        onClick(text);
        PubSub.publish("item clicked", text);
      }}
      className={`${
        clicked && "bg-blue-400"
      }  bg-white rounded-2xl p-2 text-black min-w-[100px] text-center text-xs sm:text-xl`}
    >
      {text}
    </div>
  );
};
