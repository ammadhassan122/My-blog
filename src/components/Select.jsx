import React, { useId, forwardRef } from "react";

const Select = ({ options = [], label, className = "", ...props }, ref) => {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label  htmlFor={id} className="block text-white mb-1">
          {label}
        </label>
      )}
      <select
        id={id}
        ref={ref}
        {...props}
        className={`border bg-transparent border-gray-300 text-white text-sm rounded-lg 
          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${className}`}
      >
        {options.map((option, index) =>
          typeof option === "string" ? (
            <option className="text-black" key={index} value={option}>
              {option}
            </option>
          ) : (
            <option key={option.value || index} value={option.value}>
              {option.label}
            </option>
          )
        )}
      </select>
    </div>
  );
};

export default forwardRef(Select);
