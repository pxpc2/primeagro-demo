import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

export const metadata = {
  title: "ConfidensAgro",
  description: "Consultoria e Crédito Rural",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-gray-100 dark">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={"h-full bg-gray-900 w-full antialiased"}>
        {children}
      </body>
      <GoogleAnalytics gaID="AW-16657425488" />
    </html>
  );
}
