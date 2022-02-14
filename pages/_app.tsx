import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { userService } from "services";
import { createTheme as createMuiTheme, ThemeProvider } from "@mui/material";
import Navbar from "components/Navbar/Navbar";
import "assets/scss/_fonts.scss";
import "assets/scss/_styles.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // run auth check on initial load
    authCheck(router.asPath);

    // set authorized to false to hide page content while changing routes
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // run auth check on route change
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  });

  function authCheck(url: string) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ["/login"];
    const path = url.split("?")[0];
    if (!userService.userValue && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/login",
        query: { returnUrl: router.asPath },
      });
    } else {
      setAuthorized(true);
    }
  }
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#5457F3",
        light: "#8591FF",
        dark: "#371DB2",
      },
      secondary: {
        main: "#371DB2",
        dark: "#371DB2",
        light: "#371DB2",
      },
      text: {
        primary: "#1d1e1f",
      },
      error: {
        main: "#F44336",
        dark: "#E31B0C",
        light: "#F88078",
      },
      warning: {
        main: "#FF9800",
        dark: "#C77700",
        light: "#FFB547",
      },
      info: {
        main: "#2196F3",
        dark: "#0B79D0",
        light: "#64B6F7",
      },
      success: {
        main: "#4CAF50",
        dark: "#3B873E",
        light: "#7BC67E",
      },
    },
    typography: {
      fontFamily: "Fira Regular, sans-serif",
      htmlFontSize: 10,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      {authorized && <Component {...pageProps} />}
      <ToastContainer />
    </ThemeProvider>
  );
}

export default MyApp;
