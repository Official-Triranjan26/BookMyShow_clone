import React from "react";
import { Disclosure } from "@headlessui/react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const PlayFilters = (props) => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <div className="flex justify-between rounded-lg bg-gray-100 mb-3">
            <Disclosure.Button className="py-3 px-2 flex items-center w-full justify-between ">
              <div className="flex w-full justify-between">
                <div className="flex gap-2">
                  {open ? <BiChevronUp /> : <BiChevronDown />}
                  <span className={open ? "text-red-600" : "text-gray-700"}>
                    {props.title}
                  </span>
                </div>
              </div>
            </Disclosure.Button>
            <span className="text-gray-700 py-3 px-2 flex items-center cursor-pointer">Clear</span>
          </div>
          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
            <div className="flex items-center gap-3 flex-wrap mb-4">
              {props.tags.map((tag, index) => (
                <div
                  key={index}
                  className="border-2 border-gray-200 px-3 py-1 rounded"
                >
                  <span className="text-red-600">{tag}</span>
                </div>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default PlayFilters;
