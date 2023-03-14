import React from "react";
import Billing from "../components/account/Billing/Billing";
import General from "../components/account/General";
import Usage from "../components/account/Usage";

export const TABS = [
  { id: "general", title: "General", component: <General /> },
  { id: "biling", title: "Biling", component: <Billing /> },
  { id: "usage", title: "Usage", component: <Usage /> },
];
