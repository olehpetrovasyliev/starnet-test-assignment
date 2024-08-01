import Image from "next/image";
import { getAllCharacters } from "./helpers/api/api";
import { Character } from "./helpers/types";
import Link from "next/link";
import PaginationControls from "./Components/PaginationControls";
import PaginatedCharactersList from "./Components/ClientCharactersList";
import CharacterList from "./Components/CharactersList";

export default async function Home() {
  const charactersRes = await getAllCharacters(1);
  // const charactersArr = charactersRes.results;
  // const isCharactersNext = charactersRes.next !== null;
  // const isCharactersPrev = charactersRes.previous !== null;

  return (
    <main className="">
      <section className="py-12">
        <div className="container ml-auto mr-auto">
          <CharacterList />
        </div>
      </section>
    </main>
  );
}
