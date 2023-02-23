import React from "react";
import { AiOutlineTool } from "react-icons/ai";
import { BsConeStriped } from "react-icons/bs";
import { FaGithub, FaWatchmanMonitoring } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";
import { SiStatuspal } from "react-icons/si";

export const sideBarItems = [
  {
    key: 0,
    title: "Monitors",
    to: "/monitors",
    icon: <FaWatchmanMonitoring />,
  },
  {
    key: 1,
    title: "Github",
    to: "/github",
    icon: <FaGithub />,
  },
  {
    key: 2,
    title: "Status Pages",
    to: "/status",
    icon: <SiStatuspal />,
    comingSoon: true,
  },
  {
    key: 3,
    title: "Incident",
    to: "/incident",
    icon: <BsConeStriped />,
    comingSoon: true,
  },
  {
    key: 4,
    title: "Maintenance",
    to: "/maintenance",
    icon: <AiOutlineTool />,
    comingSoon: true,
  },
  {
    key: 5,
    title: "Settings",
    to: "/settings",
    icon: <FiSettings />,
    comingSoon: true,
  },
  {
    key: 6,
    title: "Account",
    to: "/account",
    icon: <RxAvatar />,
    comingSoon: true,
    space: true,
  },
];
