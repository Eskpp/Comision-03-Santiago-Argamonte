import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, isAuth, errors: loginErrors } = useAuth();

  const onSubmit = handleSubmit(async (values) => {
    signin(values);
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth]);

  return (
    <>
      <Navbar />
      <div className="flex h-screen items-center justify-center">
        <div className="bg-zinc-900 max-w-md p-8 rounded-md">
          <form action="post">
            <h1 className="text-3xl text-center font-semibold mb-5">Login</h1>
            {loginErrors.map((err, i) => (
              <div key={i} className="bg-red-800 px-4 rounded-md my-2 py-1">
                {err}
              </div>
            ))}
            <input
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-800 px-4 my-1 py-0.5">
                El email es requerido.
              </p>
            )}
            <input
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              type="password"
              placeholder="Contraseña"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-800 px-4 my-1 py-0.5">
                La contraseña es requerida.
              </p>
            )}
            <button
              onClick={onSubmit}
              className="h-10 px-6 font-semibold rounded-md bg-blue-500 text-white my-3"
            >
              Logearse
            </button>
          </form>
          <div className="flex mt-10 justify-between items-center">
            <p>¿No tienes una cuenta?</p>
            <Link
              to="/register"
              className="px-4 py-1 font-semibold rounded-md bg-green-500 text-white"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
