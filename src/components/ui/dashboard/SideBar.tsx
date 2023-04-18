import React from "react";
import { sideBarItems } from "../../../utils/constants/sideBarItems";
import { NavLink } from "react-router-dom";
import ComingSoon from "./ComingSoon";

function SideBar() {
  return (
    <aside className="w-1/5 2xl:w-1/6 min-h-full h-auto flex flex-col justify-between text-2xl font-lato font-normal overflow-y-auto">
      <ul className="fixed flex flex-col flex-1" style={{ width: "inherit" }}>
        {sideBarItems.length > 0 &&
          sideBarItems.map((item) => (
            <React.Fragment key={item.key}>
              {item.space && (
                <li key={`${item.key}-space`} className="flex-1"></li>
              )}
              <li key={item.title}>
                <NavLink
                  to={item.to}
                  onClick={(e) => item.comingSoon && e.preventDefault()}
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "text-white bg-slate-700 shadow-lg"
                        : "text-slate-800"
                    } flex items-center py-4 pl-10 pr-4 my-3 rounded-r-full duration-100 cursor-pointer`
                  }
                >
                  {item.icon}
                  <span className="ml-6">{item.title}</span>
                  {item.comingSoon && <ComingSoon />}
                </NavLink>
              </li>
            </React.Fragment>
          ))}
      </ul>
    </aside>
  );
}

export default SideBar;
