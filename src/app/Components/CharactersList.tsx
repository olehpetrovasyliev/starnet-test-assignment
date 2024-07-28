'use client'
import { useState } from "react";
import { getAllCharacters } from "../helpers/api/api";
import { Character } from "../helpers/types";

export default function PaginatedCharacters() {
  const [page, setPage] = useState<number>(1)
  const [characters, setCharacters] = useState<number>(1)

  
  useEffect(() => {
  
  }, [])

  return (
    // <ul className="flex flex-wrap gap-12">
    //   {charactersArr.map((character: Character) => (
    //     <li key={character.id} className="p-4 border rounded-lg shadow-md">
    //       <h2 className="text-xl font-bold">{character.name}</h2>
    //       <div className="mt-2">
    //         {Object.entries(character).map(([key, value]) => (
    //           <div key={key} className="mb-1">
    //             <strong>{key}:</strong>{" "}
    //             {Array.isArray(value) ? value.join(", ") : value}
    //           </div>
    //         ))}
    //       </div>
    //     </li>
    //   ))}
    // </ul>
  );
}
