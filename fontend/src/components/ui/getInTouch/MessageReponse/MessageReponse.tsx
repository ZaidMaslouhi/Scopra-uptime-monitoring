import React from "react";

function MessageReponse({
  message,
  className,
}: {
  message: string;
  className: string;
}) {
  return (
    <div className={`px-5 py-3 border-2 rounded-md ${className}`}>
      <p className="text-sm">{message}</p>
    </div>
  );
}

export default MessageReponse;
