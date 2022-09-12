import { AiOutlineDelete } from "react-icons/ai";

export const Item = ({
  title,
  imageUrl,
  count,
  category,
  onIncrement,
  onDecrement,
  onCountEdit,
  onDelete,
}) => {
  return (
    <div className="flex gap-4 border-2 rounded-md items-center w-full min-h-[150px]">
      <img
        className="w-32 h-[120px] object-cover rounded-md border-none outline-none"
        src={imageUrl}
      />
      <div className="flex flex-col gap-4 flex-1 pr-4">
        <div>
          <div className="flex justify-between">
            <h2 className="capitalize text-3xl font-semibold">{title}</h2>
            <button onClick={onDelete} className="active:scale-95">
              <AiOutlineDelete size={27} color="red" />
            </button>
          </div>
          <p>{category}</p>
        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={onDecrement}
            className="bg-red-700 red-button-shadow text-2xl w-12 h-12 flex justify-center items-center rounded-sm text-white active:scale-95"
          >
            -
          </button>
          <p
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.target.blur();
              }
            }}
            suppressContentEditableWarning={true}
            contentEditable={true}
            onBlur={(e) => onCountEdit(e.target.textContent)}
            className="text-center flex-1 text-4xl p-2 max-h-[48px] w-[90px] overflow-y-hidden overflow-x-auto whitespace-nowrap bg-slate-500"
          >
            {count}
          </p>
          <button
            onClick={onIncrement}
            className="bg-green-600 green-button-shadow text-2xl  w-12 h-12 flex justify-center items-center  rounded-sm text-white active:scale-95"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
