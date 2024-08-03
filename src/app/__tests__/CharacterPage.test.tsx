import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi, expect, test, beforeEach } from "vitest";
import CharacterPage from "../characters/[characterId]/page";
import {
  getAllFilms,
  getAllStarships,
  getCharacterById,
  getPlanetById,
} from "../helpers/api/api";
import * as api from "../helpers/api/api";

const mockCharacter = {
  id: 1,
  name: "Obi-Wan Kenobi",
  height: "182",
  mass: "77",
  hair_color: "auburn, white",
  skin_color: "fair",
  eye_color: "blue-gray",
  birth_year: "57BBY",
  gender: "male",
  homeworld: 20,
  films: [1, 2, 3, 4, 5, 6],
  species: [1],
  vehicles: [38],
  starships: [48, 59, 64, 65, 74],
  created: "2014-12-10T16:16:29.192000Z",
  edited: "2014-12-20T21:17:50.325000Z",
  url: "https://sw-api.starnavi.io/people/10/",
};

const mockStarships = [
  {
    id: 59,
    name: "Trade Federation cruiser",
    model: "Providence-class carrier/destroyer",
    manufacturer: "Rendili StarDrive, Free Dac Volunteers Engineering corps.",
    cost_in_credits: "125000000",
    length: "1088",
    max_atmosphering_speed: "1050",
    crew: "600",
    passengers: "48247",
    cargo_capacity: "50000000",
    consumables: "4 years",
    hyperdrive_rating: "1.5",
    MGLT: "unknown",
    starship_class: "capital ship",
    pilots: [10, 11],
    films: [6],
    created: "2014-12-20T19:40:21.902000Z",
    edited: "2014-12-20T21:23:49.941000Z",
    url: "https://sw-api.starnavi.io/starships/59/",
  },
  {
    id: 61,
    name: "Theta-class T-2c shuttle",
    model: "Theta-class T-2c shuttle",
    manufacturer: "Cygnus Spaceworks",
    cost_in_credits: "1000000",
    length: "18.5",
    max_atmosphering_speed: "2000",
    crew: "5",
    passengers: "16",
    cargo_capacity: "50000",
    consumables: "56 days",
    hyperdrive_rating: "1.0",
    MGLT: "unknown",
    starship_class: "transport",
    pilots: [],
    films: [6],
    created: "2014-12-20T19:48:40.409000Z",
    edited: "2014-12-20T21:23:49.944000Z",
    url: "https://sw-api.starnavi.io/starships/61/",
  },
  {
    id: 63,
    name: "Republic attack cruiser",
    model: "Senator-class Star Destroyer",
    manufacturer: "Kuat Drive Yards, Allanteen Six shipyards",
    cost_in_credits: "59000000",
    length: "1137",
    max_atmosphering_speed: "975",
    crew: "7400",
    passengers: "2000",
    cargo_capacity: "20000000",
    consumables: "2 years",
    hyperdrive_rating: "1.0",
    MGLT: "unknown",
    starship_class: "star destroyer",
    pilots: [],
    films: [6],
    created: "2014-12-20T19:52:56.232000Z",
    edited: "2014-12-20T21:23:49.946000Z",
    url: "https://sw-api.starnavi.io/starships/63/",
  },
  {
    id: 64,
    name: "Naboo star skiff",
    model: "J-type star skiff",
    manufacturer:
      "Theed Palace Space Vessel Engineering Corps/Nubia Star Drives, Incorporated",
    cost_in_credits: "unknown",
    length: "29.2",
    max_atmosphering_speed: "1050",
    crew: "3",
    passengers: "3",
    cargo_capacity: "unknown",
    consumables: "unknown",
    hyperdrive_rating: "0.5",
    MGLT: "unknown",
    starship_class: "yacht",
    pilots: [10, 35],
    films: [6],
    created: "2014-12-20T19:55:15.396000Z",
    edited: "2014-12-20T21:23:49.948000Z",
    url: "https://sw-api.starnavi.io/starships/64/",
  },
  {
    id: 65,
    name: "Jedi Interceptor",
    model: "Eta-2 Actis-class light interceptor",
    manufacturer: "Kuat Systems Engineering",
    cost_in_credits: "320000",
    length: "5.47",
    max_atmosphering_speed: "1500",
    crew: "1",
    passengers: "0",
    cargo_capacity: "60",
    consumables: "2 days",
    hyperdrive_rating: "1.0",
    MGLT: "unknown",
    starship_class: "starfighter",
    pilots: [10, 11],
    films: [6],
    created: "2014-12-20T19:56:57.468000Z",
    edited: "2014-12-20T21:23:49.951000Z",
    url: "https://sw-api.starnavi.io/starships/65/",
  },
  {
    id: 66,
    name: "arc-170",
    model: "Aggressive Reconnaissance-170 starfighte",
    manufacturer: "Incom Corporation, Subpro Corporation",
    cost_in_credits: "155000",
    length: "14.5",
    max_atmosphering_speed: "1000",
    crew: "3",
    passengers: "0",
    cargo_capacity: "110",
    consumables: "5 days",
    hyperdrive_rating: "1.0",
    MGLT: "100",
    starship_class: "starfighter",
    pilots: [],
    films: [6],
    created: "2014-12-20T20:03:48.603000Z",
    edited: "2014-12-20T21:23:49.953000Z",
    url: "https://sw-api.starnavi.io/starships/66/",
  },
  {
    id: 68,
    name: "Banking clan frigte",
    model: "Munificent-class star frigate",
    manufacturer: "Hoersch-Kessel Drive, Inc, Gwori Revolutionary Industries",
    cost_in_credits: "57000000",
    length: "825",
    max_atmosphering_speed: "unknown",
    crew: "200",
    passengers: "unknown",
    cargo_capacity: "40000000",
    consumables: "2 years",
    hyperdrive_rating: "1.0",
    MGLT: "unknown",
    starship_class: "cruiser",
    pilots: [],
    films: [6],
    created: "2014-12-20T20:07:11.538000Z",
    edited: "2014-12-20T21:23:49.956000Z",
    url: "https://sw-api.starnavi.io/starships/68/",
  },
  {
    id: 2,
    name: "CR90 corvette",
    model: "CR90 corvette",
    manufacturer: "Corellian Engineering Corporation",
    cost_in_credits: "3500000",
    length: "150",
    max_atmosphering_speed: "950",
    crew: "30-165",
    passengers: "600",
    cargo_capacity: "3000000",
    consumables: "1 year",
    hyperdrive_rating: "2.0",
    MGLT: "60",
    starship_class: "corvette",
    pilots: [],
    films: [1, 3, 6],
    created: "2014-12-10T14:20:33.369000Z",
    edited: "2014-12-20T21:23:49.867000Z",
    url: "https://sw-api.starnavi.io/starships/2/",
  },
  {
    id: 3,
    name: "Star Destroyer",
    model: "Imperial I-class Star Destroyer",
    manufacturer: "Kuat Drive Yards",
    cost_in_credits: "150000000",
    length: "1,600",
    max_atmosphering_speed: "975",
    crew: "47,060",
    passengers: "n/a",
    cargo_capacity: "36000000",
    consumables: "2 years",
    hyperdrive_rating: "2.0",
    MGLT: "60",
    starship_class: "Star Destroyer",
    pilots: [],
    films: [1, 2, 3],
    created: "2014-12-10T15:08:19.848000Z",
    edited: "2014-12-20T21:23:49.870000Z",
    url: "https://sw-api.starnavi.io/starships/3/",
  },
  {
    id: 5,
    name: "Sentinel-class landing craft",
    model: "Sentinel-class landing craft",
    manufacturer: "Sienar Fleet Systems, Cyngus Spaceworks",
    cost_in_credits: "240000",
    length: "38",
    max_atmosphering_speed: "1000",
    crew: "5",
    passengers: "75",
    cargo_capacity: "180000",
    consumables: "1 month",
    hyperdrive_rating: "1.0",
    MGLT: "70",
    starship_class: "landing craft",
    pilots: [],
    films: [1],
    created: "2014-12-10T15:48:00.586000Z",
    edited: "2014-12-20T21:23:49.873000Z",
    url: "https://sw-api.starnavi.io/starships/5/",
  },
];

const mockPlanet = {
  id: 1,
  name: "Tatooine",
  rotation_period: "23",
  orbital_period: "304",
  diameter: "10465",
  climate: "arid",
  gravity: "1 standard",
  terrain: "desert",
  surface_water: "1",
  population: "200000",
  residents: [1, 2, 4, 6, 7, 8, 9, 43, 11, 62],
  films: [1, 3, 4, 5, 6],
  created: "2014-12-09T13:50:49.641000Z",
  edited: "2014-12-20T20:58:18.411000Z",
  url: "https://sw-api.starnavi.io/planets/1/",
};
const mockFilms = [
  {
    id: 1,
    title: "A New Hope",
    episode_id: 4,
    opening_crawl:
      "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
    director: "George Lucas",
    producer: "Gary Kurtz, Rick McCallum",
    release_date: "1977-05-25",
    characters: [10, 12, 13, 14, 15, 16, 18, 19, 1, 2, 3, 4, 5, 6, 7, 8, 9, 81],
    planets: [1, 2, 3],
    starships: [2, 3, 5, 9, 10, 11, 12, 13],
    vehicles: [4, 6, 7, 8],
    species: [1, 2, 3, 4, 5],
    created: "2014-12-10T14:23:31.880000Z",
    edited: "2014-12-20T19:49:45.256000Z",
    url: "https://sw-api.starnavi.io/films/1/",
  },
  {
    id: 2,
    title: "The Empire Strikes Back",
    episode_id: 5,
    opening_crawl:
      "It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space....",
    director: "Irvin Kershner",
    producer: "Gary Kurtz, Rick McCallum",
    release_date: "1980-05-17",
    characters: [10, 13, 14, 18, 20, 21, 22, 23, 24, 25, 26, 1, 2, 3, 4, 5],
    planets: [4, 5, 6, 27],
    starships: [3, 10, 11, 12, 15, 17, 21, 22, 23],
    vehicles: [8, 14, 16, 18, 19, 20],
    species: [1, 2, 3, 6, 7],
    created: "2014-12-12T11:26:24.656000Z",
    edited: "2014-12-15T13:07:53.386000Z",
    url: "https://sw-api.starnavi.io/films/2/",
  },
  {
    id: 3,
    title: "Return of the Jedi",
    episode_id: 6,
    opening_crawl:
      "Luke Skywalker has returned to\r\nhis home planet of Tatooine in\r\nan attempt to rescue his\r\nfriend Han Solo from the\r\nclutches of the vile gangster\r\nJabba the Hutt.\r\n\r\nLittle does Luke know that the\r\nGALACTIC EMPIRE has secretly\r\nbegun construction on a new\r\narmored space station even\r\nmore powerful than the first\r\ndreaded Death Star.\r\n\r\nWhen completed, this ultimate\r\nweapon will spell certain doom\r\nfor the small band of rebels\r\nstruggling to restore freedom\r\nto the galaxy...",
    director: "Richard Marquand",
    producer: "Howard G. Kazanjian, George Lucas, Rick McCallum",
    release_date: "1983-05-25",
    characters: [
      10, 13, 14, 16, 18, 20, 21, 22, 25, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 45,
    ],
    planets: [1, 5, 7, 8, 9],
    starships: [27, 2, 3, 10, 11, 12, 15, 17, 22, 23, 28, 29],
    vehicles: [26, 8, 16, 18, 19, 24, 25, 30],
    species: [10, 15, 1, 2, 3, 5, 6, 8, 9],
    created: "2014-12-18T10:39:33.255000Z",
    edited: "2014-12-20T09:48:37.462000Z",
    url: "https://sw-api.starnavi.io/films/3/",
  },
  {
    id: 4,
    title: "The Phantom Menace",
    episode_id: 1,
    opening_crawl:
      "Turmoil has engulfed the\r\nGalactic Republic. The taxation\r\nof trade routes to outlying star\r\nsystems is in dispute.\r\n\r\nHoping to resolve the matter\r\nwith a blockade of deadly\r\nbattleships, the greedy Trade\r\nFederation has stopped all\r\nshipping to the small planet\r\nof Naboo.\r\n\r\nWhile the Congress of the\r\nRepublic endlessly debates\r\nthis alarming chain of events,\r\nthe Supreme Chancellor has\r\nsecretly dispatched two Jedi\r\nKnights, the guardians of\r\npeace and justice in the\r\ngalaxy, to settle the conflict....",
    director: "George Lucas",
    producer: "Rick McCallum",
    release_date: "1999-05-19",
    characters: [
      10, 16, 20, 21, 32, 33, 34, 35, 36, 37, 38, 39, 2, 3, 40, 41, 42, 43, 44,
      46, 47, 48, 11, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    ],
    planets: [1, 8, 9],
    starships: [31, 32, 39, 40, 41],
    vehicles: [34, 35, 36, 42, 33, 37, 38],
    species: [
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 1, 2, 6, 22, 23, 24, 25, 26,
      27,
    ],
    created: "2014-12-19T16:52:55.740000Z",
    edited: "2014-12-20T10:54:07.216000Z",
    url: "https://sw-api.starnavi.io/films/4/",
  },
  {
    id: 5,
    title: "Attack of the Clones",
    episode_id: 2,
    opening_crawl:
      "There is unrest in the Galactic\r\nSenate. Several thousand solar\r\nsystems have declared their\r\nintentions to leave the Republic.\r\n\r\nThis separatist movement,\r\nunder the leadership of the\r\nmysterious Count Dooku, has\r\nmade it difficult for the limited\r\nnumber of Jedi Knights to maintain \r\npeace and order in the galaxy.\r\n\r\nSenator Amidala, the former\r\nQueen of Naboo, is returning\r\nto the Galactic Senate to vote\r\non the critical issue of creating\r\nan ARMY OF THE REPUBLIC\r\nto assist the overwhelmed\r\nJedi....",
    director: "George Lucas",
    producer: "Rick McCallum",
    release_date: "2002-05-16",
    characters: [
      10, 20, 21, 22, 33, 35, 36, 2, 3, 6, 7, 40, 43, 46, 11, 51, 52, 53, 58,
      59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76,
      77, 78, 82,
    ],
    planets: [1, 8, 9, 10, 11],
    starships: [43, 47, 48, 49, 52, 58, 21, 32, 39],
    vehicles: [44, 45, 46, 50, 51, 53, 54, 55, 56, 57, 4],
    species: [12, 13, 15, 1, 2, 6, 28, 29, 30, 31, 32, 33, 34, 35],
    created: "2014-12-20T10:57:57.886000Z",
    edited: "2014-12-20T20:18:48.516000Z",
    url: "https://sw-api.starnavi.io/films/5/",
  },
  {
    id: 6,
    title: "Revenge of the Sith",
    episode_id: 3,
    opening_crawl:
      "War! The Republic is crumbling\r\nunder attacks by the ruthless\r\nSith Lord, Count Dooku.\r\nThere are heroes on both sides.\r\nEvil is everywhere.\r\n\r\nIn a stunning move, the\r\nfiendish droid leader, General\r\nGrievous, has swept into the\r\nRepublic capital and kidnapped\r\nChancellor Palpatine, leader of\r\nthe Galactic Senate.\r\n\r\nAs the Separatist Droid Army\r\nattempts to flee the besieged\r\ncapital with their valuable\r\nhostage, two Jedi Knights lead a\r\ndesperate mission to rescue the\r\ncaptive Chancellor....",
    director: "George Lucas",
    producer: "Rick McCallum",
    release_date: "2005-05-19",
    characters: [
      10, 12, 13, 20, 21, 33, 35, 1, 2, 3, 4, 5, 6, 7, 46, 11, 51, 52, 53, 54,
      55, 56, 58, 63, 64, 67, 68, 75, 78, 79, 80, 81, 82, 83,
    ],
    planets: [1, 2, 5, 8, 9, 12, 13, 14, 15, 16, 17, 18, 19],
    starships: [48, 59, 61, 63, 64, 65, 66, 68, 2, 32, 74, 75],
    vehicles: [50, 53, 56, 60, 62, 67, 69, 70, 71, 72, 73, 33, 76],
    species: [
      15, 19, 20, 1, 2, 3, 6, 28, 29, 30, 33, 34, 35, 36, 37, 23, 24, 25, 26,
      27,
    ],
    created: "2014-12-20T18:49:38.403000Z",
    edited: "2014-12-20T20:47:52.073000Z",
    url: "https://sw-api.starnavi.io/films/6/",
  },
];

const mockData = { mockCharacter, mockStarships, mockPlanet, mockFilms };

vi.mock("../helpers/api/api");

vi.mock("@xyflow/react", () => ({
  ReactFlow: vi.fn(() => null),
  Background: vi.fn(() => null),
}));

describe("CharacterPage", () => {
  beforeEach(() => {
    vi.mocked(getCharacterById).mockResolvedValue(mockCharacter);
    vi.mocked(getPlanetById).mockResolvedValue(mockPlanet);
    vi.mocked(getAllFilms).mockResolvedValue({
      count: mockFilms.length,
      next: null,
      previous: null,
      results: mockFilms,
    });
    vi.mocked(getAllStarships).mockResolvedValue({
      count: mockStarships.length,
      next: null,
      previous: null,
      results: mockStarships,
    });
  });

  it("renders character name", async () => {
    await render(
      await CharacterPage({ params: { characterId: mockCharacter.id } })
    );
    expect(screen.getByText(mockCharacter.name)).toBeDefined();
  });

  it("displays character details", async () => {
    expect(await screen.findByText(`${mockCharacter.height} cm`)).toBeDefined();
    expect(await screen.findByText(`${mockCharacter.mass} kg`)).toBeDefined();
    expect(await screen.findByText(mockCharacter.hair_color)).toBeDefined();
    expect(await screen.findByText(mockCharacter.skin_color)).toBeDefined();
    expect(await screen.findByText(mockCharacter.eye_color)).toBeDefined();
    expect(await screen.findByText(mockCharacter.birth_year)).toBeDefined();
    expect(await screen.findByText(mockCharacter.gender)).toBeDefined();
  });

  it("displays homeworld", async () => {
    expect(await screen.findByText(mockPlanet.name)).toBeDefined();
  });

  it("renders Films And Starships Flow section", async () => {
    expect(await screen.findByText("Films And Starships Flow")).toBeDefined();
  });

  it("Renders correct flow", async () => {
    await screen.findByText(mockCharacter.name);
    mockFilms.forEach(async (film) => {
      if (await mockCharacter.films.includes(film.id)) {
        screen.findByText(film.title);
      }
    });

    mockStarships.forEach(async (starship) => {
      if (await mockCharacter.starships.includes(starship.id)) {
        screen.findByText(starship.name);
      }
    });

    expect(api.getCharacterById).toHaveBeenCalledWith(1);
    expect(api.getPlanetById).toHaveBeenCalledWith(20);
    expect(api.getAllFilms).toHaveBeenCalledWith({ characters__in: 1 });
    expect(api.getAllStarships).toHaveBeenCalledWith({ pilots__in: 1 });
  });
});
