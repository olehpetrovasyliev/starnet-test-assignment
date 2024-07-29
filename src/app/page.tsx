import Image from "next/image";
import { getAllCharacters } from "./helpers/api/api";
import { Character } from "./helpers/types";
import Link from "next/link";
import PaginationControls from "./Components/PaginationControls";
import PaginatedCharactersList from "./Components/CharactersList";

export default async function Home() {
  const charactersRes = await getAllCharacters(1);
  const charactersArr = charactersRes.results;
  const isCharactersNext = charactersRes.next !== null;
  const isCharactersPrev = charactersRes.previous !== null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section>
        <PaginatedCharactersList />
      </section>
    </main>
  );
}
