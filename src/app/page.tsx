"use client";
import { useConfigContext } from "./appConfigContext";
import { ConfigProvider } from "./appConfigContext";

export default function Home(props: any) {
  const appConfig = useConfigContext();
  return <main>{`runtime variable is: ${appConfig}`}</main>;
}
