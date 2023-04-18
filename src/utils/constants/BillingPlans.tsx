import React from "react";
import { CgInfinity } from "react-icons/cg";
const infinity = <CgInfinity />;

export interface Plan {
  name: string;
  properties: PlanProperties;
  price: number;
  period: "month" | "year";
  currency: "$";
  preferred?: boolean;
}

interface PlanProperties {
  Monitors: number | JSX.Element;
  Frequency: string;
  "Status Pages": number | JSX.Element;
  SMS: number | "-";
  Teammates: number | "-";
  Subscribers?: number | JSX.Element;
}

export const BillingPlans: Plan[] = [
  {
    name: "Free",
    properties: {
      Monitors: 5,
      Frequency: "3min",
      "Status Pages": 1,
      SMS: "-",
      Teammates: "-",
    },
    price: 0,
    period: "month",
    currency: "$",
  },
  {
    name: "Hobby",
    properties: {
      Monitors: 15,
      Frequency: "30Sec",
      "Status Pages": 1,
      SMS: 5,
      Teammates: "-",
    },
    price: 14,
    period: "month",
    currency: "$",
  },
  {
    name: "Basic",
    properties: {
      Monitors: 50,
      Frequency: "30Sec",
      "Status Pages": 1,
      SMS: 20,
      Teammates: 1,
    },
    price: 29,
    period: "month",
    currency: "$",
    preferred: true,
  },
  {
    name: "Pro",
    properties: {
      Monitors: 100,
      Frequency: "30Sec",
      "Status Pages": infinity,
      SMS: 75,
      Teammates: 5,
      Subscribers: 1000,
    },
    price: 89,
    period: "month",
    currency: "$",
  },
  {
    name: "Bussinss",
    properties: {
      Monitors: infinity,
      Frequency: "10Sec",
      "Status Pages": infinity,
      SMS: 250,
      Teammates: 15,
      Subscribers: infinity,
    },
    price: 199,
    period: "month",
    currency: "$",
  },
];
