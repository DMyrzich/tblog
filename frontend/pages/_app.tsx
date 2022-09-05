import type { AppProps } from "next/app";
import React from "react";
import Head from "next/head";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { theme } from "../theme";
import { Header } from "../components/Header";

import "../styles/globals.scss";
import { wrapper } from '../redux/store';
import { setUserData } from "../redux/slices/user";
import { Api } from "../components/Api";

function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>My App</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
      </Head>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Component {...pageProps} />
      </MuiThemeProvider>
    </>
  );
}

App.getInitialProps = wrapper.getInitialAppProps(store => async ({ ctx, Component }) => {

  try {

    const userData = await Api(ctx).user.me();
    store.dispatch(setUserData(userData));

    return {
      pageProps: Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {}
    }

  } catch (error) {
    //console.log(error);
    return {
      pageProps: {}
    }
  }
});

export default wrapper.withRedux(App);

