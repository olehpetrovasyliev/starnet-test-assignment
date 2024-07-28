import { FC } from "react";
import { getCharacterById } from "../helpers/api/api";

type CharacterPageProps = {
  params: {
    characterId: string;
  };
};

const CharacterPage: FC<CharacterPageProps> = async ({ params }) => {
  const { characterId } = params;
  const character = await getCharacterById(characterId);

  return <div>{character.name}</div>;
};

export default CharacterPage;
