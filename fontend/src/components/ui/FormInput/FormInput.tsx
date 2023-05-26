import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface inputProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  id: string;
  errorMessage: string | undefined;
  inputref: UseFormRegisterReturn;
}

const FormInput = (props: inputProps) => {
  const { label, id, errorMessage, inputref, ...inputProps } = props;

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-slate-900 text-xs mx-2 mb-1">
          {label}
        </label>
      )}
      <input
        className="w-full block p-3 bg-slate-200 text-gray-800 text-sm rounded-md outline-none"
        autoComplete="off"
        id={id}
        {...inputref}
        {...inputProps}
      />
      {errorMessage && (
        <span className="text-xs text-red-700 leading-4 block">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default FormInput;
