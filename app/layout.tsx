import type { Metadata } from "next";
import "../styles/index.css";
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import Navbar from '../components/Navbar';
import Footer from '../components/FooterSimple';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "MarketMatch | Stock Swiping App",
  description: "Input your trading preferences and swipe on your favorite stocks.",
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
        <link rel="icon" href="/icon.ico" sizes="any" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className="body">
        <MantineProvider forceColorScheme="dark">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </MantineProvider>
      </body>
    </html>
  );
}
