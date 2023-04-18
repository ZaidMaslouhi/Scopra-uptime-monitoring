import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconType } from "react-icons";
import { authOauth } from "../../../store/slices/auth.slice";
import { useAppDispatch } from "../../../utils/hooks/react-redux-hooks";

interface IOauthButton {
  title: string;
  Icon: IconType;
  routeTo: string;
}

function OauthButton({ title, Icon, routeTo }: IOauthButton) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleButtonClick = async () => {
    try {
      setLoading(true);
      await dispatch(authOauth());
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

export default OauthButton;
