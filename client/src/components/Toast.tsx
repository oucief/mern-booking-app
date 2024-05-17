import { useEffect } from "react";

type ToastProps = {
  type: "SUCCESS" | "ERROR";
  message: string;
  onClose: () => void;
};

const Toast = ({ type, message, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const style =
    type === "SUCCESS"
      ? "fixed top-4 right-4 z-100 p-4 bg-green-500 max-w-md rounded-md"
      : "fixed top-4 right-4 z-100 p-4 bg-red-500 max-w-md rounded-md";

  return (
    <div className={style}>
      <div className="flex justify-center items-center">
        <p className="font-semibold text-lg text-white">{message}</p>
      </div>
    </div>
  );
};

export default Toast;
