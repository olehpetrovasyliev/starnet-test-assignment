import { getAllCharacters } from "../helpers/api/api";
import { Character, CharactersArr } from "../helpers/types";
import ClientSideCharacters from "./ClientCharactersList";

const CharacterList = async () => {
  const initialPage = 1;
  const charactersRes = await getAllCharacters(initialPage);
  const initialCharacters: CharactersArr = charactersRes.results;
  const nextPageUrl = charactersRes.next;

  return (
    <ClientSideCharacters
      initialCharacters={initialCharacters}
      initialNextPageUrl={nextPageUrl}
    />
  );
};

export default CharacterList;
