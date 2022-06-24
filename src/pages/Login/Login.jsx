import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { login } from "../../api/auth.js";
import { authContext } from "../../contexts/authContext.js";
import "./Login.css";

const Login = () => {
  const { isAuthenticated } = useContext(authContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (credentials) => {
    login(credentials);
  };

  useEffect(() => {
    if (isAuthenticated) {
      window.location.replace("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="Login">
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label
          className={`input-container ${errors.email && errors.email.type === "pattern" ? "isWrong" : ""}${
            watch("email") === "" ? "empty" : ""
          }`}
          htmlFor="email"
        >
          <input
            type="text"
            {...register("email", {
              required: "L'email est requis",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Merci d'entrer un email valide",
              },
            })}
            id="email"
            className={watch("email") === "" ? "empty" : ""}
          />
          <span>Email</span>
        </label>
        {errors.email && <span className="error">{errors.email.message}</span>}

        <label
          htmlFor="password"
          className={`input-container ${errors.password && errors.password.type === "pattern" ? "isWrong" : ""}${
            watch("password") === "" ? "empty" : ""
          }`}
        >
          <input
            type="password"
            {...register("password", {
              required: "Le mot de passe est requis",
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                message: "Merci d'entrer un mot de passe valide",
              },
            })}
            id="password"
            className={watch("password") === "" ? "empty" : ""}
          />
          <span>Password</span>
        </label>
        {errors.password && <span className="error">{errors.password.message}</span>}

        <input type="submit" value="Connexion" />
      </form>
    </div>
  );
};

export default Login;
