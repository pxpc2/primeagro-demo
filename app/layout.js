import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ConfidensAgro",
  description: "Consultoria e Crédito Rural",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className={"h-full w-full"}>{children}</body>
    </html>
  );
}
