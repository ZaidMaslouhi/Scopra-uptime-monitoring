import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import FormInput from "../input/FormInput/FormInput";
import { useForm } from "react-hook-form";
import { getCurrentUser } from "../../services/auth.service";
import { addMonitor } from "../../services/monitor.service";
import { ProjectsContext } from "../../context/ProjectsContext";
import { MonitorsContext } from "../../context/MonitorsContext";
import { ErrorNotification, SuccessNotification } from "../toasts/toasts";

function AddMonitorModal({ buttonContent, className }) {
  const [showModal, setShowModal] = useState(false);
  const { projects } = useContext(ProjectsContext);
  const { setMonitors } = useContext(MonitorsContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const closeModal = () => {
    reset();
    setShowModal(false);
  };

  const handleModalForm = async (values) => {
    try {
      const user = getCurrentUser();
      const monitor = {
        name: values.monitor,
        endpoint: values.endpoint,
        timestamp: Date.now(),
      };
      const project = projects.find((project) => project.selected);
      const newMonitorId = await addMonitor(user, project, monitor);
      setMonitors((prevMonitors) => [
        ...prevMonitors,
        { ...monitor, id: newMonitorId },
      ]);
      setShowModal(false);
      SuccessNotification("New monitor created.");
    } catch (_) {
      ErrorNotification("Error: Unable to create new monitors.");
    }
  };

  return (
    <>
      <button
        className={className}
        type="button"
        onClick={() => setShowModal(true)}
      >
        {buttonContent}
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-2/6 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Create new Monitor</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-slate-800 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-slate-800 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <form onSubmit={handleSubmit(handleModalForm)}>
                  <div className="relative p-6 flex-auto">
                    <FormInput
                      label="Monitor Name"
                      id="Monitor"
                      placeholder="Name your monitor"
                      ref={register("monitor", {
                        required: "You should give a name to your monitor!",
                      })}
                      errorMessage={errors.monitor?.message}
                    />
                    <FormInput
                      label="End-Point"
                      id="endpoint"
                      placeholder="Enter the endpoint"
                      type="url"
                      ref={register("endpoint", {
                        required: "You should enter the endpoint!",
                        pattern: {
                          value:
                            /http(s?)(:\/\/)((www.)?)(([^.]+)\.)?([a-zA-z0-9\-_]+)(.com|.net|.gov|.org|.in)(\/[^\s]*)?/,
                          message: "Invalid URL",
                        },
                      })}
                      errorMessage={errors.endpoint?.message}
                    />
                  </div>

                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-gray-700 bg-gray-100 font-lato font-semibold text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="reset"
                      onClick={() => closeModal()}
                    >
                      Close
                    </button>
                    <button
                      className="bg-slate-700 text-white active:bg-slate-900 font-lato font-bold text-sm px-6 py-3 rounded shadow-lg hover:shadow-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

AddMonitorModal.propTypes = {
  buttonContent: (PropTypes.node || PropTypes.string).isRequired,
  className: PropTypes.string,
};

export default AddMonitorModal;
