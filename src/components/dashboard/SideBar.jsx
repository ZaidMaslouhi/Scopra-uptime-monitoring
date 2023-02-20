import React from "react";
import { sideBarItems } from "../../data/sideBarItems";
import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <aside className="w-1/5 2xl:w-1/6 h-full flex flex-col justify-between text-2xl font-lato font-normal overflow-y-auto">
      <ul className="flex flex-col flex-1">
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
                  {item.comingSoon && (
                    <span className="ml-auto p-2 bg-purple-100 text-xs text-purple-800 font-medium border border-purple-500 rounded-full">
                      Coming Soon
                    </span>
                  )}
                </NavLink>
              </li>
            </React.Fragment>
          ))}
      </ul>
    </aside>
  );
}

export default SideBar;
