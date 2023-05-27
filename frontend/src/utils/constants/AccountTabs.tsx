import React from "react";
import Billing from "../../components/ui/account/Billing/Billing";
import General from "../../components/ui/account/General";
import Usage from "../../components/ui/account/Usage";

export interface ITab {
  id: string;
  title: string;
  component: JSX.Element;
}

export const TABS = [
  { id: "general", title: "General", component: <General /> },
  { id: "biling", title: "Biling", component: <Billing /> },
  { id: "usage", title: "Usage", component: <Usage /> },
];
