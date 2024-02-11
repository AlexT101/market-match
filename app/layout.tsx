import type { Metadata } from "next";
import "../styles/index.css";
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import Navbar from '../components/Navbar';


export const metadata: Metadata = {
  title: "Invested | Stock Swiping App",
  description: "Input your preferences and swipe on your favorite stocks.",
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
          <Navbar/>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
