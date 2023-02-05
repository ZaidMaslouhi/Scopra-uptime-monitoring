import PropTypes from "prop-types";
import React from "react";

const FormInput = React.forwardRef(function Input(
  { label, id, errorMessage, ...inputProps },
  ref
) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="block text-slate-900 text-xs mx-2 mb-1">
        {label}
      </label>
      <input
        className="w-full block p-3 bg-slate-200 text-gray-800 text-sm rounded-md outline-none"
        autoComplete="off"
        id={id}
        {...ref}
        {...inputProps}
      />
      {errorMessage && (
        <span className="text-xs text-red-700 leading-4 block">
          {errorMessage}
        </span>
      )}
    </div>
  );
});

FormInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  register: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default FormInput;
