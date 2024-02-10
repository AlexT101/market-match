import type { Metadata } from "next";
import "../styles/index.css";
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import { MantineProvider, ColorSchemeScript } from "@mantine/core";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript forceColorScheme="dark" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className="body">
        <MantineProvider forceColorScheme="dark">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
