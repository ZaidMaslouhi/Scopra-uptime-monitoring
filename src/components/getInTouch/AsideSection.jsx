import React from "react";
import bubbleGum from "../assets/images/bubble-gum_get-int-touch.gif";

function AsideSection() {
  return (
    <aside className="hidden md:flex w-1/2 items-center h-auto shadow-lg overflow-hidden rounded-2xl m-4 bg-slate-300">
      <img src={bubbleGum} alt="Bubble Gum animation" />
    </aside>
  );
}

export default AsideSection;
