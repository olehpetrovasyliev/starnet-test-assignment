// "use client";
import { FC } from "react";
import {
  getAllFilms,
  getAllStarships,
  getCharacterById,
  getPlanetById,
} from "../helpers/api/api";
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  MiniMap,
  Controls,
} from "@xyflow/react";

type CharacterPageProps = {
  params: {
    characterId: number;
  };
};

const CharacterPage: FC<CharacterPageProps> = async ({ params }) => {
  const { characterId } = params;

  const character = await getCharacterById(characterId);

  const filmsRes = await getAllFilms({ characters__in: characterId });
  const films = filmsRes.results;

  const filmsNodes = films.map((film, index) => ({
    id: `film-${film.id}`,
    data: {
      label: `Episode ${film.id}: ${film.title}`,
      value: film.title,
      content: film.title,
    },
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

  const allChildNodes = [...filmsNodes, ...starshipNodes];
  const minX = Math.min(...allChildNodes.map((node) => node.position.x));
  const maxX = Math.max(...allChildNodes.map((node) => node.position.x));
  const characterNodeX = (minX + maxX) / 2;

  const characterNode = {
    id: characterId.toString(),
    data: { label: character.name },
    position: { x: characterNodeX, y: 0 },
  };

  const nodes = [characterNode, ...filmsNodes, ...starshipNodes];
  const edges = [...filmsEdges, ...starshipEdges];

  const rfStyle = {
    backgroundColor: "#000",
    border: "1px solid #ffe81f",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  };

  const homeworld = await getPlanetById(character.homeworld);

  return (
    <div className="h-screen text-white">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          {character.name}
        </h1>
        <div className="mb-8 bg-gray-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-7 text-center">
            Character Details
          </h2>
          <div className="grid grid-cols-2 gap-4 place-items-center">
            <p>
              <strong>Height:</strong> {character.height} cm
            </p>
            <p>
              <strong>Mass:</strong> {character.mass} kg
            </p>
            <p>
              <strong>Hair Color:</strong> {character.hair_color}
            </p>
            <p>
              <strong>Skin Color:</strong> {character.skin_color}
            </p>
            <p>
              <strong>Eye Color:</strong> {character.eye_color}
            </p>
            <p>
              <strong>Birth Year:</strong> {character.birth_year}
            </p>
            <p>
              <strong>Gender:</strong> {character.gender}
            </p>
            <p>
              <strong>Homeworld:</strong> {homeworld.name}
            </p>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">
          Films And Starships Flow
        </h2>

        <div className="relative w-full h-[600px] bg-black rounded-lg shadow-lg overflow-hidden">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            style={rfStyle}
            defaultViewport={{
              x: 200,
              y: 50,
              zoom: 1.5,
            }}
          >
            <Background />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;
