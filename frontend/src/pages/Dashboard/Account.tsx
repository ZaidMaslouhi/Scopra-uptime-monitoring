import React, { useState } from "react";
import { TABS } from "../../utils/constants/AccountTabs";
import TabsItems from "../../components/ui/account/TabsItems";

function Account() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const renderActiveTab = (active: string) => {
    setActiveTab(TABS.filter((tab) => tab.id == active)[0]);
  };

  return (
    <section className="flex flex-col gap-8">
      <h2 className="text-4xl text-slate-800 font-semibold font-lato">
        Account Settings
      </h2>
      <section className="flex flex-col gap-4">
        <TabsItems activeTab={activeTab} renderActiveTab={renderActiveTab} />
        <section className="w-full p-12 flex flex-col gap-4 bg-white rounded-2xl shadow-2xl">
          <div className="tabs pr-4">{activeTab.component}</div>
        </section>
      </section>
    </section>
  );
}

export default Account;
