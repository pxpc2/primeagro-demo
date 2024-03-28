import Link from "next/link";

export default function ErrorPage({ searchParams: { message } }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-2xl">{message}</h1>
      <Link href={"/login"}>
        <p className="text-orange-600 hover:text-orange-400">
          Voltar para Login
        </p>
      </Link>
    </div>
  );
}
