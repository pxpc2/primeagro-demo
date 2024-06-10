import Head from "next/head";

export const metadata = {
  title: "ConfidensAgro - Login",
  description: "Consultoria e Crédito Rural",
};

export default function Layout({ children }) {
  return (
    <>
      <main className="w-full h-full">{children}</main>
    </>
  );
}
