import toast from "react-hot-toast";

export const successNotification = (message) => toast.success(message);
export const ErrorNotification = (message) => toast.error(message);
