import { useEffect } from "react";
import { AddItem } from "./AddItem";
import { Item } from "./Item";
import { SearchBar } from "./SearchBar";

export const ItemList = ({
  items,
  onItemIncrement,
  onItemDecrement,
  OnItemCountEdit,
  onItemDelete,
}) => {
  return (
    <>
      {items.length >= 1 ? (
        <div className="min-w-fit w-full p-2 flex flex-col items-center  gap-4  max-h-[400px] overflow-y-scroll ">
          {items.map((i) => (
            <Item
              title={i.get("title")}
              key={i.id}
              imageUrl={i.get("imageUrl")}
              count={i.get("count")}
              category={i.get("category")}
              onIncrement={() => onItemIncrement(i.id)}
              onDecrement={() => onItemDecrement(i.id)}
              onDelete={() => onItemDelete(i.id)}
              onCountEdit={(newCount) => OnItemCountEdit(i.id, newCount)}
            />
          ))}
        </div>
      ) : (
        <div className="font-mono min-w-fit w-full p-2 flex flex-col items-center min-h-[400px]">
          Nothing to see here!
        </div>
      )}
    </>
  );
};
