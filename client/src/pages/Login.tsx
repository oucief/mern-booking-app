import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { login } from "../api-client";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../contexts/UseAppContext";

export type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const mutation = useMutation(login, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ type: "SUCCESS", message: "HEY! Welcome Back." });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ type: "ERROR", message: error.message });
      console.log(error);
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) =>
    mutation.mutate(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Login To Your Account</h2>
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
      </div>
      <div className="flex flex-wrap justify-between">
        <span className="py-2">
          Do not have an account?{" "}
          <Link className="underline" to="/register">
            Sign up here
          </Link>
        </span>
        <button
          type="submit"
          className="py-2 px-3 bg-blue-800 hover:bg-blue-900 text-white text-1xl font-semibold rounded-md shadow cursor-pointer"
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

export default Login;
