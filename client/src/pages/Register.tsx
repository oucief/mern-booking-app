import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/UseAppContext";
import { useNavigate, Link } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ type: "SUCCESS", message: "Registered Successfully" });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({
        type: "ERROR",
        message: error.message,
      });
      console.log("ERROR:", error.message);
    },
  });

  const onSubmit: SubmitHandler<RegisterFormData> = (data) =>
    mutation.mutate(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col gap-5 md:flex-row">
        <label className="text-gray-700 font-bold flex-1">
          First Name:
          <input
            type="text"
            className="font-normal w-full py-1 px-2 rounded border"
            {...register("firstName", { required: "This field is required" })}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm font-semibold">
              {errors.firstName.message}
            </p>
          )}
        </label>
        <label className="text-gray-700 font-bold flex-1">
          Last Name:
          <input
            type="text"
            className="font-normal w-full py-1 px-2 rounded border"
            {...register("lastName", { required: "This field is required" })}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm font-semibold">
              {errors.lastName.message}
            </p>
          )}
        </label>
      </div>
      <div className="flex-1 flex-col gap-5">
        <label className="text-gray-700 font-bold ">
          Email:
          <input
            type="email"
            className="font-normal w-full py-1 px-2 rounded border mb-2"
            {...register("email", { required: "This field is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm font-semibold">
              {errors.email.message}
            </p>
          )}
        </label>
        <label className="text-gray-700 font-bold ">
          Password:
          <input
            type="password"
            className="font-normal w-full py-1 px-2 rounded border mb-2"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "password should be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm font-semibold">
              {errors.password.message}
            </p>
          )}
        </label>
        <label className="text-gray-700 font-bold ">
          Confirm Password:
          <input
            type="password"
            className="font-normal w-full py-1 px-2 rounded border"
            {...register("confirmPassword", {
              validate: (val) => {
                if (!val) {
                  return "This field is required";
                } else if (val !== watch("password")) {
                  return "Your passwords do not match";
                }
              },
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm font-semibold">
              {errors.confirmPassword.message}
            </p>
          )}
        </label>
      </div>
      <div className="flex flex-wrap justify-between">
        <span className="py-2">
          Already have an account?{" "}
          <Link className="underline" to="/login">
            Login here
          </Link>
        </span>
        <button
          type="submit"
          className="py-2 px-3 bg-blue-800 hover:bg-blue-900 text-white text-1xl font-semibold rounded-md shadow cursor-pointer"
        >
          Create Account
        </button>
      </div>
    </form>
  );
};

export default Register;
