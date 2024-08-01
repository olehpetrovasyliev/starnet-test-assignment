"use client";
import { useEffect, useState } from "react";
import { getAllCharacters } from "../helpers/api/api";
import { Character, CharactersArr } from "../helpers/types";
import PaginationControls from "./PaginationControls";
import Link from "next/link";

export default function MoreCharactersList() {
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
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {characters.map((character) => (
          <li
            key={character.id}
            className="p-4 border rounded-lg shadow-md bg-gray-800 text-white transition-transform transform hover:scale-105 text-center"
          >
            <Link href={`/${character.id}`}>
              <h2 className="text-xl font-bold text-center mb-2 text-yellow-400">
                {character.name}
              </h2>
              <p className="text-sm">Gender: {character.gender}</p>
              <p className="text-sm">Skin Color: {character.skin_color}</p>
              <p className="text-sm">Birth Year: {character.birth_year}</p>
            </Link>
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
