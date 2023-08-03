"use client";

import { ThemeProvider } from "@emotion/react";
import { createContext, useContext } from "react";

const ConfigContext = createContext({});

export const ConfigProvider = ({
  children,
  config,
}: {
  children: any;
  config: any;
}) => {
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};

export const useConfigContext = () => useContext(ConfigContext);

// without this component wrapping, we can't divide into Server + Client parts
// a context provider, React.context etc needs to be a client component
export const AppConfig = ({
  children,
  config,
}: {
  children: any;
  config: any;
}) => (
  <ConfigProvider config={config}>
    <ThemeProvider theme={{ color: "green" }}>{children}</ThemeProvider>
  </ConfigProvider>
);
