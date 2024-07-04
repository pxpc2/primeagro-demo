export const metadata = {
  title: "ConfidensAgro - Dashboard",
  description: "Consultoria e Crédito Rural",
};

export default function Layout({ children }) {
  return (
    <>
      <main className="w-full h-full bg-gray-100">{children}</main>
    </>
  );
}
