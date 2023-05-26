import React from "react";
import { Plan } from "../../../../utils/constants/BillingPlans";

function Plans({ name, properties, price, period, currency, preferred }: Plan) {
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
        className="h-full flex-1 p-6 flex flex-col gap-4 border-2 border-slate-200 rounded-2xl box-border cursor-pointer transition-all duration-200 ease-in peer-checked:border-slate-800 peer-checked:bg-slate-100 peer-checked:shadow-xl"
      >
        <div className="flex justify-between">
          <p className="text-slate-800 text-lg font-bold uppercase">{name}</p>
        </div>
        {properties &&
          Object.entries(properties).map((value) => {
            return (
              <div key={`${name}_${value[0]}`} className="flex justify-between">
                <p className="text-slate-600 font-semibold">{value[0]}</p>
                <p className="text-slate-800 font-bold">{value[1]}</p>
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

export default Plans;
