import React from "react";
import { CgInfinity } from "react-icons/cg";


const infinity = <CgInfinity />;

export const BillingPlans = [
  {
    name: "Free",
    properties: {
      Monitors: 5,
      Frequency: "3min",
      "Status pages": 1,
      SMS: "-",
      Teammates: "-",
    },
    price: 0,
    period: "month",
    currency: "$",
    preferred: true,
  },
  {
    name: "Hobby",
    properties: {
      Monitors: 15,
      Frequency: "30Sec",
      "Status pages": 1,
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
      "Status pages": 1,
      SMS: 20,
      Teammates: 1,
    },
    price: 29,
    period: "month",
    currency: "$",
  },
  {
    name: "Pro",
    properties: {
      Monitors: 100,
      Frequency: "30Sec",
      "Status pages": infinity,
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
      "Status pages": infinity,
      SMS: 250,
      Teammates: 15,
      Subscribers: infinity,
    },
    price: 199,
    period: "month",
    currency: "$",
  },
];
