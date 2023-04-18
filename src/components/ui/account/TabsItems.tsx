import React from "react";
import { ITab, TABS } from "../../../utils/constants/AccountTabs";

function TabsItems({
  activeTab,
  renderActiveTab,
}: {
  activeTab: ITab;
  renderActiveTab: (id: string) => void;
}) {
  return (
    <div className="w-fit flex">
      {TABS.map((tab) => (
        <p
          key={tab.id}
          className={`py-3 px-8 text-lg rounded-2xl cursor-pointer transition-all duration-500 ${
            activeTab.id == tab.id
              ? "text-slate-900 font-semibold"
              : "text-slate-500"
          }`}
          onClick={() => renderActiveTab(tab.id)}
        >
          {tab.title}
        </p>
      ))}
    </div>
  );
}

export default TabsItems;
