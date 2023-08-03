"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ConfigContext = createContext({});

export const ConfigProvider = ({ children }: { children: any }) => {
  // only need to do this once to get values from runtime api route
  // careful of component re-renders
  const [config, setConfig] = useState({ REGION: "" });
  useEffect(() => {
    async function getConfig() {
      const res = await fetch("http://localhost:3000/api");
      const data = await res.json();
      console.log("api resp", data);
      setConfig(data.config);
    }
    getConfig();
  }, []);

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};

export const useConfigContext = () => useContext(ConfigContext);
