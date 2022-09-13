import { BiSearch } from "react-icons/bi";

export const SearchBar = ({ onSearchInput }) => {
  return (
    <div className="searchBar p-2 sm:w-1/2 w-full fixed bg-[#1A1B1E] z-10">
      <BiSearch
        className="absolute z-10 left-5 top-5"
        size={20}
        color="black"
      />
      <input
        onInput={(e) => {
          onSearchInput(e.target.value);
          PubSub.publish("item clicked", "");
        }}
        placeholder="Search"
        type="text"
        className="bg-slate-200 rounded-2xl p-2 w-full relative pl-12 text-xl sm:text-3xl flex items-center"
      />
    </div>
  );
};
