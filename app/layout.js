import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ConfiensAgro",
  description: "Consultoria e Financiamento de Agronegócio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className="h-full">{children}</body>
    </html>
  );
}
