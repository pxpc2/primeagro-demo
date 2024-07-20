import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "ConfidensAgro - Login",
  description: "Consultoria e Crédito Rural",
};

export default function Layout({ children }) {
  return (
    <div className="w-full h-full">
      <main className="w-full h-full">{children}</main>
      <Toaster />
    </div>
  );
}
