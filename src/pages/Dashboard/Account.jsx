import React, { useState } from "react";
import { TABS } from "../../data/AccountTabs";

function Account() {

  const [activeTab, setActiveTab] = useState(TABS[0]);

  const renderActiveTab = (active) => {
    setActiveTab(TABS.find((tab) => tab.id == active));
  };

  return (
    <article className="w-full m-8 mt-0 py-8 px-10 flex-1 flex flex-col gap-10 bg-white rounded-2xl shadow-2xl">
      <h2 className="text-4xl text-slate-800 font-semibold font-lato">
        Account Settings
      </h2>
      <section className="tab-links w-fit flex gap-4 bg-slate-200 rounded-2xl">
        {TABS.map((tab) => (
          <p
            key={tab.id}
            className={`py-3 px-8 text-md text-slate-800 font-semibold rounded-2xl cursor-pointer transition-all duration-500 ${activeTab.id == tab.id? 'bg-slate-400': 'bg-slate-200'}`}
            onClick={() => renderActiveTab(tab.id)}
          >
            {tab.title}
          </p>
        ))}
      </section>
      <div className="tabs mt-4 pr-4 overflow-auto">{activeTab.component}</div>
    </article>
  );
}

export default Account;
