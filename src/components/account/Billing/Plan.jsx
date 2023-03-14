import React from "react";
import PropTypes from "prop-types";

function Plan({ name, properties, price, period, currency, preferred }) {
  return (
    <div className="flex-1">
      <input
        type="radio"
        name="plan"
        id={name}
        className="hidden peer"
        defaultChecked={preferred}
        readOnly
      />
      <label
        htmlFor={name}
        className="h-full flex-1 p-6 flex flex-col gap-4 border-2 border-slate-200 rounded-2xl box-border cursor-pointer peer-checked:border-slate-800 peer-checked:shadow-xl"
      >
        <div className="flex justify-between">
          <p className="text-slate-800 text-lg font-bold uppercase">{name}</p>
        </div>
        {properties &&
          Object.keys(properties).map((key) => {
            return (
              <div key={`${name}_${key}`} className="flex justify-between">
                <p className="text-slate-600 font-semibold">{key}</p>
                <p className="text-slate-800 font-bold">{properties[key]}</p>
              </div>
            );
          })}
        <div className="flex justify-between mt-auto mb-0">
          <p className="text-slate-600 font-semibold">
            <span className="text-slate-800 font-bold text-2xl">{`${currency} ${price}`}</span>
            / {period}
          </p>
        </div>
      </label>
    </div>
  );
}

Plan.propTypes = {
  name: PropTypes.string.isRequired,
  properties: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired,
  period: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  preferred: PropTypes.bool,
};

export default Plan;
