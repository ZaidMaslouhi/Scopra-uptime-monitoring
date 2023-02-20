import toast from "react-hot-toast";

export const SuccessNotification = (message) => toast.success(message);
export const ErrorNotification = (message) => toast.error(message);
