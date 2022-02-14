import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { userService } from "services";
import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import styles from "./index.module.scss";
import Image from "next/image";

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: "onSubmit",
  });
  const [credentialErrors, setCredentialErrors] = useState(false);
  useEffect(() => {
    // redirect to home if already logged in
    if (userService.userValue) {
      router.push("/tasks");
    }
  }, [router]);
  const submit = async (data: any) => {
    setIsLoading(true);
    return userService
      .login(data?.username, data?.password)
      .then((data: any) => {
        if (!data.error) {
          router.push("/tasks");
        } else setCredentialErrors(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("error", error);
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.Login}>
      <div className={styles.FormDiv}>
        {credentialErrors && (
          <Alert severity="error">Username or password are incorrect !</Alert>
        )}
        <form onSubmit={handleSubmit(submit)} className={styles.Form}>
          <Controller
            control={control}
            name={"username"}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                required
                color="primary"
                type="text"
                label="Username"
                error={fieldState?.error as any}
                className={styles.Input}
              />
            )}
          />
          <Controller
            control={control}
            name={"password"}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                required
                color="primary"
                type="password"
                label="Password"
                error={fieldState?.error as any}
                className={styles.Input}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isValid || isLoading}
            className={styles.Button}
          >
            {isLoading ? <CircularProgress /> : "Log in"}
          </Button>
        </form>
      </div>
      <div style={{ width: "50%", position: "relative" }}>
        <Image
          priority
          alt="Login image"
          className={styles.Image}
          src="https://www.docstring.fr/media/blog_posts/creer-une-todo-app-avec-flask/thumbnail/creer-une-todo-app-avec-flask.jpg"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default Login;
