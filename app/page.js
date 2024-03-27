import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <h1 className="text-xl text-purple-900">olá mundo</h1>
      <h2 className="text-lg text-black">Ir para o login!</h2>
      <Link href={"/login"}>
        <button className="px-8 py-2 rounded-md border-black border">
          Login
        </button>
      </Link>
    </main>
  );
}
