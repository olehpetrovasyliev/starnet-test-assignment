"use client";
import { useState } from "react";
import { CharactersArr } from "../helpers/types";
import Link from "next/link";

interface ClientSideCharactersProps {
  initialCharacters: CharactersArr;
  initialNextPageUrl: string | null;
}

const ClientSideCharacters: React.FC<ClientSideCharactersProps> = ({
  initialCharacters,
  initialNextPageUrl,
}) => {
  const [characters, setCharacters] =
    useState<CharactersArr>(initialCharacters);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(
    initialNextPageUrl
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadMoreCharacters = async () => {
    if (!nextPageUrl) return;
    setIsLoading(true);
    const charactersRes = await fetch(nextPageUrl).then((res) => res.json());
    setCharacters((prev) => [...prev, ...charactersRes.results]);
    setNextPageUrl(charactersRes.next);
    setIsLoading(false);
  };

  return (
    <>
      <h1 className="text-4xl text-center mb-7 font-bold">Characters List</h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {characters.map((character) => (
          <li
            key={character.id}
            className="p-4 border border-yellow-400 rounded-lg shadow-md bg-black text-white transition-transform transform hover:scale-105 text-center"
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
      {nextPageUrl && (
        <div className="flex justify-center mt-4">
          <button
            onClick={loadMoreCharacters}
            className="px-6 py-2 text-lg font-bold text-black bg-yellow-400 rounded-lg hover:bg-yellow-500 focus:outline-none"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </>
  );
};

export default ClientSideCharacters;
