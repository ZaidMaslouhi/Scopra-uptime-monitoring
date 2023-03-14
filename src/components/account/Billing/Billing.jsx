import React from "react";
import Plan from "./Plan";
import { BillingPlans } from "../../../data/BillingPlans";

function Billing() {
  const PLANS = BillingPlans;

  return (
    <section className="w-full h-full">
      <div className="w-full flex items-center">
        <p className="text-xl font-semibold">
          15 days before the end of your trial.
        </p>
      </div>
      <hr className="my-6" />
      <div className="flex flex-col gap-8">
        {/* Plans */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <p className="text-lg font-medium">1. Select a plan</p>
          </div>
          <div className="w-full flex gap-6 flex-wrap box-border">
            {PLANS &&
              PLANS.map((plan) => {
                return <Plan key={plan.name} {...plan} />;
              })}
          </div>
        </div>
        {/* Billing */}
        <div className="flex flex-col gap-2 w-1/2">
          <div className="flex justify-between">
            <p className="text-lg font-medium">2. Choose your billing</p>
          </div>
          <div className="w-full">
            <div className="py-3 flex gap-6 font-semibold">
              <div>
                <input
                  type="radio"
                  name="billPeriod"
                  id="monthly"
                  className="hidden peer"
                  checked={true}
                />
                <div className="w-fit px-5 py-2 flex gap-12 justify-between items-center border-2 peer-checked:border-slate-700 peer-checked:bg-slate-100 peer-checked:shadow-lg rounded-2xl">
                  <label
                    htmlFor="monthly"
                    className="text-lg flex justify-between gap-6"
                  >
                    <p>Monthly</p>
                    <p className="text-sm text-slate-600 font-semibold">
                      <span className="text-slate-800 font-bold text-2xl">
                        $
                      </span>
                      /month
                    </p>
                  </label>
                </div>
              </div>
              <div>
                <input
                  type="radio"
                  name="billPeriod"
                  id="yearly"
                  className="hidden peer"
                />
                <div className="w-fit px-5 py-2 flex gap-12 justify-between items-center border-2 peer-checked:border-slate-700 peer-checked:bg-slate-100 peer-checked:shadow-lg rounded-2xl">
                  <label
                    htmlFor="yearly"
                    className="text-lg flex justify-between gap-6"
                  >
                    <p>Yearly</p>
                    <p className="text-sm text-slate-600 font-semibold">
                      <span className="text-slate-800 font-bold text-2xl">
                        $
                      </span>
                      /year
                    </p>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Creadit Card */}
        <div className="flex flex-col gap-2 w-1/2">
          <div className="flex justify-between">
            <p className="text-lg font-medium">
              3. Add your credit card details
            </p>
          </div>
          <div className="w-2/3">
            <div className="mb-4">
              <input
                type="text"
                name="creditCrad"
                id="creditCrad"
                placeholder="Credit Card Number"
                className="py-2 px-4 bg-slate-200 rounded-lg outline-none"
              />
            </div>
            <div>
              <button className="py-2 px-4 text-slate-800 border border-slate-800 rounded-xl">
                View your invoice
              </button>
            </div>
          </div>
        </div>
        <hr />
        {/* Upgrade Button */}
        <div className="flex items-center mb-4">
          <button className="py-2 px-9 bg-slate-700 text-white font-semibold text-lg rounded-lg shadow-2xl">
            Upgrade
          </button>
        </div>
      </div>
    </section>
  );
}

export default Billing;
