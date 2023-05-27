import React from "react";
import Plans from "./Plans";
import { BillingPlans, Plan } from "../../../../utils/constants/BillingPlans";
import CreditCard from "./CreditCard";

function Billing() {
  const PLANS: Plan[] = BillingPlans;

  return (
    <section className="w-full h-full">
      <div className="w-full flex items-center">
        <p className="text-xl font-semibold">
          15 days before the end of your trial.
        </p>
      </div>
      <hr className="my-6" />
      <div className="flex flex-col gap-10">
        {/* Plans */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <p className="text-lg font-medium">1. Select a plan</p>
          </div>
          <div className="w-full grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-6 flex-wrap box-border">
            {PLANS &&
              PLANS.map((plan) => {
                return <Plans key={plan.name} {...plan} />;
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
                  defaultChecked={true}
                />
                <div className="w-fit px-5 py-2 flex gap-12 justify-between items-center border-2 transition-all duration-200 ease-in peer-checked:border-slate-700 peer-checked:bg-slate-100 peer-checked:shadow-lg rounded-2xl">
                  <label
                    htmlFor="monthly"
                    className="text-lg flex justify-between gap-6 cursor-pointer"
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
                  defaultChecked={false}
                />
                <div className="w-fit px-5 py-2 flex gap-12 justify-between items-center border-2 transition-all duration-200 ease-in peer-checked:border-slate-700 peer-checked:bg-slate-100 peer-checked:shadow-lg rounded-2xl">
                  <label
                    htmlFor="yearly"
                    className="text-lg flex justify-between gap-6 cursor-pointer"
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
        <div className="flex flex-col gap-4 w-2/3">
          <div className="flex justify-between">
            <p className="text-lg font-medium">
              3. Add your credit card details
            </p>
          </div>
          <CreditCard />
          <div>
            <button className="py-2 px-4 text-slate-800 border border-slate-800 rounded-xl">
              View your invoice
            </button>
          </div>
        </div>
        <hr />
        {/* Upgrade Button */}
        <div className="flex items-center mb-4">
          <button
            type="submit"
            className="py-2 px-5 bg-slate-700 font-normal text-lg text-white rounded-md shadow-2xl duration-300 hover:shadow-none hover:translate-y-1 "
          >
            Upgrade
          </button>
        </div>
      </div>
    </section>
  );
}

export default Billing;
