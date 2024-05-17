import { useAppContext } from "../contexts/UseAppContext";
import * as apiClient from "../api-client";
import { useMutation, useQueryClient } from "react-query";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const mutation = useMutation(apiClient.logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ type: "SUCCESS", message: "Logged out successfully" });
    },
    onError: (error: Error) => {
      showToast({ type: "ERROR", message: error.message });
      console.log(error);
    },
  });
  return (
    <button
      onClick={() => {
        mutation.mutate();
      }}
      className="flex items-center bg-white text-blue-700 px-3 font-bold rounded hover:bg-gray-200 hover:text-blue-800"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
