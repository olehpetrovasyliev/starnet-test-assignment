import { FC } from "react";
import {
  getAllFilms,
  getAllStarships,
  getCharacterById,
} from "../helpers/api/api";
import { ReactFlow, Node, Edge } from "@xyflow/react";

type CharacterPageProps = {
  params: {
    characterId: number;
  };
};

const CharacterPage: FC<CharacterPageProps> = async ({ params }) => {
  const { characterId } = params;

  const character = await getCharacterById(characterId);

  const characterNode = {
    id: characterId.toString(),
    data: { label: character.name },
    position: { x: 0, y: 0 },
  };

  const filmsRes = await getAllFilms({ characters__in: characterId });
  const films = filmsRes.results;

  const filmsNodes = films.map((film, index) => ({
    id: `film-${film.id}`,
    data: { label: film.title, value: film.title },
    position: { x: index * 200, y: 100 },
  }));

  const filmsEdges = films.map((film) => ({
    id: `e${characterId}-film-${film.id}`,
    source: characterId.toString(),
    target: `film-${film.id}`,
  }));

  const starshipEdges: Edge[] = [];

  const starshipsRes = await getAllStarships({
    pilots__in: characterId,
  });

  const starships = starshipsRes.results;

  const starshipNodes = starships.map((starship, i) => ({
    id: `starship-${starship.id}`,
    data: { label: starship.name, name: starship.name },
    position: { x: i * 200, y: 200 },
  }));

  films.forEach((film) => {
    film.starships.forEach((starshipId) => {
      starshipEdges.push({
        id: `efilm-${film.id}-starship-${starshipId}`,
        source: `film-${film.id}`,
        target: `starship-${starshipId}`,
      });
    });
  });

  starships.forEach((starship) => {
    starship.films.forEach((filmId) => {
      starshipEdges.push({
        id: `estarship-${starship.id}-film-${filmId}`,
        source: `film-${filmId}`,
        target: `starship-${starship.id}`,
      });
    });
  });

  const nodes = [characterNode, ...filmsNodes, ...starshipNodes];
  const edges = [...filmsEdges, ...starshipEdges];

  return (
    <>
      <div className="h-screen container ml-auto mr-auto">
        <h1>{character.name}</h1>
        <ReactFlow nodes={nodes} edges={edges}></ReactFlow>
      </div>
    </>
  );
};

export default CharacterPage;
