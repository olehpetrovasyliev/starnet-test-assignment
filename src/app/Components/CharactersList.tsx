"use client";
import { useEffect, useState } from "react";
import { getAllCharacters } from "../helpers/api/api";
import { Character, CharactersArr } from "../helpers/types";
import PaginationControls from "./PaginationControls";

export default function PaginatedCharactersList() {
  const [page, setPage] = useState<number>(1);
  const [characters, setCharacters] = useState<CharactersArr>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [prevPageUrl, setPrevPageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      const charactersRes = await getAllCharacters(page);
      const charactersArr = charactersRes.results;
      setCharacters(charactersArr);
      setNextPageUrl(charactersRes.next);
      setPrevPageUrl(charactersRes.previous);
    };
    fetchCharacters();
  }, [page]);
  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {characters.map((character) => (
          <li key={character.id} className="p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold">{character.name}</h2>
            <div className="mt-2"></div>
          </li>
        ))}
      </ul>

      <PaginationControls
        page={page}
        nextPage={() => setPage((prev) => prev + 1)}
        prevPage={() => setPage((prev) => prev - 1)}
        hasNextPage={nextPageUrl !== null}
        hasPrevPage={prevPageUrl !== null}
      />
    </>
  );
}
