import React from "react";
import PropTypes from "prop-types";

function MessageReponse({ message, className }) {
  return (
    <div className={`px-5 py-3 border-2 rounded-md ${className}`}>
      <p className="text-sm">{message}</p>
    </div>
  );
}

MessageReponse.propTypes = {
  message: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default MessageReponse;
