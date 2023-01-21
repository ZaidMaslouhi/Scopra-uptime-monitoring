import React from "react";
import PropTypes from "prop-types";

function MessageReponse({ message, color }) {
  return (
    <div
      className={`px-5 py-3 border-2 border-${color}-200 bg-${color}-50 rounded-md`}
    >
      <p className={`text-sm text-${color}-700`}>{message}</p>
    </div>
  );
}

MessageReponse.propTypes = {
  message: PropTypes.string,
  color: PropTypes.string,
};

export default MessageReponse;
