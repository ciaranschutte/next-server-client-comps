/** @jsxImportSource react */

import { AppConfig, ConfigProvider } from "./appConfigContext";

async function getAppConfig() {
  // cache: "no-store" ensures it's run server side
  // fetch isn't actually doing anything except forcing server side render
  // it's a "blocking" data call
  // this is a server component so we have full access to process and can get vars from ehre
  // url cannot be root - will cause infinite loop
  try {
    await fetch("http://localhost:3000/api", { cache: "no-store" });
    console.log("getconfig", process.env.TEST_RUNTIME_VAR);
    return process.env.TEST_RUNTIME_VAR;
  } catch (e) {
    console.log(
      'this is likely happening during "next build". catch it so it doesnt exit build'
    );
    console.error(e);
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const appConfig = await getAppConfig();
  return (
    <html lang="en">
      <body>
        <pre>{JSON.stringify(appConfig)}</pre>
        {/** here on down client components */}
        {/** this is just wrapping children in a context provider, but importantly module wise it's a different function */}
        <ConfigProvider config={appConfig}>{children}</ConfigProvider>
      </body>
    </html>
  );
}
