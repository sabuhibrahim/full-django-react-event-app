import { ChangeEvent, useState } from 'react';

import { BsSearch } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';

import useFocus from "../hooks/use-focus";
import useHover from '../hooks/use-hover';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';

let timeout;

export default function SearchBar() {

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const [query, setQuery] = useState<string>(params.get("search") ?? "");
  const { ref: hoverRef, isHovering } = useHover<HTMLDivElement>();
  const { ref: focusRef, isFocusing } = useFocus<HTMLInputElement>();

  const handleInputClear = () => {
    setQuery('');
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      params.set("search", "");
      params.set("page", "1");
      navigate({
        pathname: location.pathname,
        search: createSearchParams(params).toString(),
      })
    }, 500);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      params.set("search", e.target.value);
      params.set("page", "1");
      navigate({
        pathname: location.pathname,
        search: createSearchParams(params).toString(),
      })
    }, 500);
  };

  return (
    <div
      ref={hoverRef}
      className="relative mx-auto w-[80%] max-w-[24rem] md:mx-0"
    >
      <BsSearch className=" absolute left-6 flex h-full items-center text-xl text-gray-400" />
      {query && (isHovering || isFocusing) && (
        <IoMdClose
          onClick={handleInputClear}
          className="absolute right-6 flex h-full items-center text-xl"
        />
      )}
      <input
        ref={focusRef}
        type="text"
        placeholder="Search clubs"
        onChange={handleInputChange}
        value={query}
        className={`w-full rounded-full border-[2px] border-gray-300 py-4 pl-14 pr-12 text-xl font-medium hover:border-red-500 focus:border-red-500 focus:bg-customGray-base focus:outline-none dark:border-gray-400 dark:bg-customGray-dark dark:focus:bg-customGray-light ${
          isHovering && 'border-red-500'
        }`}
      />
    </div>
  );
}
