import React from "react";
import useSearchStore from "../store/useSearchStore";

const SearchBar = ({value, onChange,onKeyDown}) => {
  const { keyword, setIsSearchMode } = useSearchStore();
  const onAddressClick = () => {
    setIsSearchMode(true);
  };
  return (
    <div className="relative mb-2 p-3 ">
      <input
        type="text"
        onClick={onAddressClick}
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value}
        placeholder="장소 이름을 입력하세요."
        className="p-3 border bg-gray-200 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:border-blue-500 w-full"
      />
      <button>
      <svg
        className="absolute right-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
