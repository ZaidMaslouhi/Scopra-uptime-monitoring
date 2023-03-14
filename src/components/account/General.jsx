import React from "react";

function General() {


  return (
    <section className="w-full h-full">
      <div className="flex gap-4 items-center">
        <div className="w-1/3">
          <p className="text-lg font-medium">
            Do you want to receive the weekly report?
          </p>
        </div>
        <input type="checkbox" name="report" id="report" />
      </div>

      <hr className="my-6" />

      <div className="flex gap-4 items-center">
        <div className="w-1/3">
          <p className="text-lg font-medium">Email Address</p>
          <p className="text-sm font-light">
            You will receive an email to comfirm your new address when change
            it.
          </p>
        </div>
        <input
          type="email"
          name="email"
          id="email"
          className="py-2 px-4 bg-slate-200 rounded-lg outline-none"
        />
      </div>

      <hr className="my-6" />

      <div className="flex gap-4 items-center">
        <div className="w-1/3">
          <p className="text-lg font-medium">Full Name</p>
          <p className="text-sm font-light">
            You will receive an email to comfirm your new address when change
            it.
          </p>
        </div>
        <input
          type="text"
          name="fullName"
          id="fullName"
          className="py-2 px-4 bg-slate-200 rounded-lg outline-none"
        />
      </div>

      <hr className="my-6" />

      <div className="flex gap-4 items-center">
        <div className="w-1/3">
          <p className="text-lg font-medium">Phone Number</p>
          <p className="text-sm font-light">
            Your phone number prefixed with your country code to receive SMS
            alerts.
          </p>
        </div>
        <input
          type="tel"
          name="phoneNumber"
          id="phoneNumber"
          className="py-2 px-4 bg-slate-200 rounded-lg outline-none"
        />
      </div>

      <hr className="my-6" />

      <div className="flex gap-4 items-center">
        <div className="w-1/3">
          <p className="text-lg font-medium">SMS Auto Recharge</p>
          <p className="text-sm font-light">
            Set automatic 5$ recharge of 20 SMS credit when they fall down to 0.
          </p>
        </div>
        <input type="checkbox" name="smsAutoRecharge" id="smsAutoRecharge" />
      </div>

      <hr className="my-6" />

      <div className="flex gap-4 items-center">
        <div className="w-1/3"></div>
        <button className="py-2 px-9 bg-slate-700 text-white font-semibold text-lg rounded-lg shadow-2xl">
          Save
        </button>
      </div>
    </section>
  );
}

export default General;
