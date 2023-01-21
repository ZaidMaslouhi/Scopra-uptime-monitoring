import React from "react";

function CopyRightsFooter() {
  return (
    <footer>
      <p className="mt-auto mb-0 text-xs text-center text-gray-500 md:text-left">
        &copy; made in 🇲🇦 with 💓😀 {new Date().getFullYear()}.
      </p>
    </footer>
  );
}

export default CopyRightsFooter;
