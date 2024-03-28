import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-2xl">
        Ocorreu um erro. Por favor, entre em contato com nosso suporte.
      </h1>
      <Link href={"/login"}>
        <p className="text-orange-600 hover:text-orange-400">
          Voltar para Login
        </p>
      </Link>
    </div>
  );
}
