import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-full flex items-center flex-col align-middle justify-center">
      <h1 className="font-bold text-4xl pb-12">EM CONSTRUÇÃO.</h1>
      <Link href={"/login"}>
        <button className="rounded-md bg-white px-28 py-5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Sistema ConfidensAgro
        </button>
      </Link>
    </main>
  );
}
