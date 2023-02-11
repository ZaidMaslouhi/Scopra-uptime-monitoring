import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OauthButton({ title, Icon, handleClick, routeTo }) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async () => {
    try {
      setLoading(true);
      await handleClick();
      navigate(routeTo);
    } catch (error) {
      setErrorMessage("Unable to get profile information from the provider");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <button
        type="button"
        className="text-center text-slate-800 border-2 border-slate-800 bg-white font-semibold block w-full rounded-md mt-3 px-4 py-2 shadow-sm transition-all duration-200 outline-none hover:shadow-md"
        onClick={handleButtonClick}
      >
        <Icon className="inline text-xl mr-1" />
        {loading ? "Loading..." : title}
      </button>
      <span className="mt-2 text-sm text-center text-red-700 leading-4 block">
        {errorMessage}
      </span>
    </>
  );
}

OauthButton.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  routeTo: PropTypes.string.isRequired,
};

export default OauthButton;
