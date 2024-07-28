import Image from "next/image";
import { getAllCharacters } from "./helpers/api/api";
import { Character } from "./helpers/types";
import Link from "next/link";
import PaginationControls from "./Components/PaginationControls";

export default async function Home() {
  const charactersRes = await getAllCharacters(1);
  const charactersArr = charactersRes.results;
  const isCharactersNext = charactersRes.next !== null;
  const isCharactersPrev = charactersRes.previous !== null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section>
        <div className="ml-auto mr-auto container">
          <div className="flex flex-wrap gap-12 ">
            {charactersArr.map((character: Character) => (
              <Link
                href={String(character.id)}
                key={character.id}
                className="p-4 border rounded-lg shadow-md"
              >
                <h2 className="text-xl font-bold">{character.name}</h2>
                <div className="mt-2">
                  {Object.entries(character).map(([key, value]) => (
                    <div key={key} className="mb-1">
                      <strong>{key}:</strong>{" "}
                      {Array.isArray(value) ? value.join(", ") : value}
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <PaginationControls
          hasNextPage={isCharactersNext}
          hasPrevPage={isCharactersPrev}
        />
      </section>
    </main>
  );
}
