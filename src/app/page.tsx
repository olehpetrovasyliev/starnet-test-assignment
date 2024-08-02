import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <section>
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
          <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center font-jedi">
            Welcome to the Star Wars Characters Database
          </h1>
          <div className="max-w-lg">
            <p className="text-lg text-center mb-8 ">
              Here you can explore the vast universe of Star Wars characters,
              discover detailed info of each character, and see flows of each
              character, containing info about all the films and starships
              retated to him
            </p>
          </div>
          <Link href="/characters">
            <p className="px-6 py-3 text-lg font-bold text-black bg-yellow-400 rounded-lg hover:bg-yellow-500 transition-colors">
              View Characters
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
