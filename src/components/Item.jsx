export const Item = ({
  title,
  imageUrl,
  count,
  onIncrement,
  onDecrement,
  onCountEdit,
}) => {
  return (
    <div className="flex gap-4 border-2 rounded-md items-center w-full">
      <img
        className="w-32 h-[120px] object-cover rounded-md q"
        src={imageUrl}
      />
      <div className="flex flex-col gap-4">
        <h2 className="capitalize text-3xl font-semibold">{title}</h2>
        <div className="flex gap-2 items-center">
          <button
            onClick={onDecrement}
            className="bg-red-700 red-button-shadow text-2xl w-12 h-12 flex justify-center items-center rounded-sm text-white active:scale-95"
          >
            -
          </button>
          <p
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
