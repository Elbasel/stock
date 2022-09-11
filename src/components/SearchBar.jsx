import { BiSearch } from "react-icons/bi";

export const SearchBar = ({ onSearchInput }) => {
  return (
    <div className="searchBar p-2  fixed bg-[#1A1B1E] z-10">
      <BiSearch
        className="absolute z-10 left-5 top-5"
        size={30}
        color="black"
      />
      <input
        onInput={(e) => onSearchInput(e.target.value)}
        placeholder="Search"
        type="text"
        className="bg-slate-200 rounded-2xl p-2 w-full relative pl-12 text-3xl flex items-center"
      />
    </div>
  );
};
