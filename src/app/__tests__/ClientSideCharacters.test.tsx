import { expect, test, vi, afterEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import ClientSideCharacters from "../Components/ClientCharactersList";

const mockInitCharacters = [
  {
    id: 10,
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
  },
  {
    id: 12,
    name: "Wilhuff Tarkin",
    height: "180",
    mass: "unknown",
    hair_color: "auburn, grey",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "64BBY",
    gender: "male",
    homeworld: 21,
    films: [1, 6],
    species: [1],
    vehicles: [],
    starships: [],
    created: "2014-12-10T16:26:56.138000Z",
    edited: "2014-12-20T21:17:50.330000Z",
    url: "https://sw-api.starnavi.io/people/12/",
  },
  {
    id: 13,
    name: "Chewbacca",
    height: "228",
    mass: "112",
    hair_color: "brown",
    skin_color: "unknown",
    eye_color: "blue",
    birth_year: "200BBY",
    gender: "male",
    homeworld: 14,
    films: [1, 2, 3, 6],
    species: [3],
    vehicles: [19],
    starships: [10, 22],
    created: "2014-12-10T16:42:45.066000Z",
    edited: "2014-12-20T21:17:50.332000Z",
    url: "https://sw-api.starnavi.io/people/13/",
  },
  {
    id: 14,
    name: "Han Solo",
    height: "180",
    mass: "80",
    hair_color: "brown",
    skin_color: "fair",
    eye_color: "brown",
    birth_year: "29BBY",
    gender: "male",
    homeworld: 22,
    films: [1, 2, 3],
    species: [1],
    vehicles: [],
    starships: [10, 22],
    created: "2014-12-10T16:49:14.582000Z",
    edited: "2014-12-20T21:17:50.334000Z",
    url: "https://sw-api.starnavi.io/people/14/",
  },
  {
    id: 15,
    name: "Greedo",
    height: "173",
    mass: "74",
    hair_color: "n/a",
    skin_color: "green",
    eye_color: "black",
    birth_year: "44BBY",
    gender: "male",
    homeworld: 23,
    films: [1],
    species: [4],
    vehicles: [],
    starships: [],
    created: "2014-12-10T17:03:30.334000Z",
    edited: "2014-12-20T21:17:50.336000Z",
    url: "https://sw-api.starnavi.io/people/15/",
  },
  {
    id: 16,
    name: "Jabba Desilijic Tiure",
    height: "175",
    mass: "1,358",
    hair_color: "n/a",
    skin_color: "green-tan, brown",
    eye_color: "orange",
    birth_year: "600BBY",
    gender: "hermaphrodite",
    homeworld: 24,
    films: [1, 3, 4],
    species: [5],
    vehicles: [],
    starships: [],
    created: "2014-12-10T17:11:31.638000Z",
    edited: "2014-12-20T21:17:50.338000Z",
    url: "https://sw-api.starnavi.io/people/16/",
  },
  {
    id: 18,
    name: "Wedge Antilles",
    height: "170",
    mass: "77",
    hair_color: "brown",
    skin_color: "fair",
    eye_color: "hazel",
    birth_year: "21BBY",
    gender: "male",
    homeworld: 22,
    films: [1, 2, 3],
    species: [1],
    vehicles: [14],
    starships: [12],
    created: "2014-12-12T11:08:06.469000Z",
    edited: "2014-12-20T21:17:50.341000Z",
    url: "https://sw-api.starnavi.io/people/18/",
  },
  {
    id: 19,
    name: "Jek Tono Porkins",
    height: "180",
    mass: "110",
    hair_color: "brown",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "unknown",
    gender: "male",
    homeworld: 26,
    films: [1],
    species: [1],
    vehicles: [],
    starships: [12],
    created: "2014-12-12T11:16:56.569000Z",
    edited: "2014-12-20T21:17:50.343000Z",
    url: "https://sw-api.starnavi.io/people/19/",
  },
  {
    id: 20,
    name: "Yoda",
    height: "66",
    mass: "17",
    hair_color: "white",
    skin_color: "green",
    eye_color: "brown",
    birth_year: "896BBY",
    gender: "male",
    homeworld: 28,
    films: [2, 3, 4, 5, 6],
    species: [6],
    vehicles: [],
    starships: [],
    created: "2014-12-15T12:26:01.042000Z",
    edited: "2014-12-20T21:17:50.345000Z",
    url: "https://sw-api.starnavi.io/people/20/",
  },
  {
    id: 21,
    name: "Palpatine",
    height: "170",
    mass: "75",
    hair_color: "grey",
    skin_color: "pale",
    eye_color: "yellow",
    birth_year: "82BBY",
    gender: "male",
    homeworld: 8,
    films: [2, 3, 4, 5, 6],
    species: [1],
    vehicles: [],
    starships: [],
    created: "2014-12-15T12:48:05.971000Z",
    edited: "2014-12-20T21:17:50.347000Z",
    url: "https://sw-api.starnavi.io/people/21/",
  },
];

const mockNewCharacters = [
  {
    id: 22,
    name: "Boba Fett",
    height: "183",
    mass: "78.2",
    hair_color: "black",
    skin_color: "fair",
    eye_color: "brown",
    birth_year: "31.5BBY",
    gender: "male",
    homeworld: 10,
    films: [2, 3, 5],
    species: [1],
    vehicles: [],
    starships: [21],
    created: "2014-12-15T12:49:32.457000Z",
    edited: "2014-12-20T21:17:50.349000Z",
    url: "https://sw-api.starnavi.io/people/22/",
  },
  {
    id: 23,
    name: "IG-88",
    height: "200",
    mass: "140",
    hair_color: "none",
    skin_color: "metal",
    eye_color: "red",
    birth_year: "15BBY",
    gender: "none",
    homeworld: 28,
    films: [2],
    species: [2],
    vehicles: [],
    starships: [],
    created: "2014-12-15T12:51:10.076000Z",
    edited: "2014-12-20T21:17:50.351000Z",
    url: "https://sw-api.starnavi.io/people/23/",
  },
  {
    id: 24,
    name: "Bossk",
    height: "190",
    mass: "113",
    hair_color: "none",
    skin_color: "green",
    eye_color: "red",
    birth_year: "53BBY",
    gender: "male",
    homeworld: 29,
    films: [2],
    species: [7],
    vehicles: [],
    starships: [],
    created: "2014-12-15T12:53:49.297000Z",
    edited: "2014-12-20T21:17:50.355000Z",
    url: "https://sw-api.starnavi.io/people/24/",
  },
  {
    id: 25,
    name: "Lando Calrissian",
    height: "177",
    mass: "79",
    hair_color: "black",
    skin_color: "dark",
    eye_color: "brown",
    birth_year: "31BBY",
    gender: "male",
    homeworld: 30,
    films: [2, 3],
    species: [1],
    vehicles: [],
    starships: [10],
    created: "2014-12-15T12:56:32.683000Z",
    edited: "2014-12-20T21:17:50.357000Z",
    url: "https://sw-api.starnavi.io/people/25/",
  },
  {
    id: 26,
    name: "Lobot",
    height: "175",
    mass: "79",
    hair_color: "none",
    skin_color: "light",
    eye_color: "blue",
    birth_year: "37BBY",
    gender: "male",
    homeworld: 6,
    films: [2],
    species: [1],
    vehicles: [],
    starships: [],
    created: "2014-12-15T13:01:57.178000Z",
    edited: "2014-12-20T21:17:50.359000Z",
    url: "https://sw-api.starnavi.io/people/26/",
  },
  {
    id: 27,
    name: "Ackbar",
    height: "180",
    mass: "83",
    hair_color: "none",
    skin_color: "brown mottle",
    eye_color: "orange",
    birth_year: "41BBY",
    gender: "male",
    homeworld: 31,
    films: [3],
    species: [8],
    vehicles: [],
    starships: [],
    created: "2014-12-18T11:07:50.584000Z",
    edited: "2014-12-20T21:17:50.362000Z",
    url: "https://sw-api.starnavi.io/people/27/",
  },
  {
    id: 28,
    name: "Mon Mothma",
    height: "150",
    mass: "unknown",
    hair_color: "auburn",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "48BBY",
    gender: "female",
    homeworld: 32,
    films: [3],
    species: [1],
    vehicles: [],
    starships: [],
    created: "2014-12-18T11:12:38.895000Z",
    edited: "2014-12-20T21:17:50.364000Z",
    url: "https://sw-api.starnavi.io/people/28/",
  },
  {
    id: 29,
    name: "Arvel Crynyd",
    height: "unknown",
    mass: "unknown",
    hair_color: "brown",
    skin_color: "fair",
    eye_color: "brown",
    birth_year: "unknown",
    gender: "male",
    homeworld: 28,
    films: [3],
    species: [1],
    vehicles: [],
    starships: [28],
    created: "2014-12-18T11:16:33.020000Z",
    edited: "2014-12-20T21:17:50.367000Z",
    url: "https://sw-api.starnavi.io/people/29/",
  },
  {
    id: 30,
    name: "Wicket Systri Warrick",
    height: "88",
    mass: "20",
    hair_color: "brown",
    skin_color: "brown",
    eye_color: "brown",
    birth_year: "8BBY",
    gender: "male",
    homeworld: 7,
    films: [3],
    species: [9],
    vehicles: [],
    starships: [],
    created: "2014-12-18T11:21:58.954000Z",
    edited: "2014-12-20T21:17:50.369000Z",
    url: "https://sw-api.starnavi.io/people/30/",
  },
  {
    id: 31,
    name: "Nien Nunb",
    height: "160",
    mass: "68",
    hair_color: "none",
    skin_color: "grey",
    eye_color: "black",
    birth_year: "unknown",
    gender: "male",
    homeworld: 33,
    films: [3],
    species: [10],
    vehicles: [],
    starships: [10],
    created: "2014-12-18T11:26:18.541000Z",
    edited: "2014-12-20T21:17:50.371000Z",
    url: "https://sw-api.starnavi.io/people/31/",
  },
];
const mockInitialNextPageUrl = "https://api.example.com/characters?page=2";

afterEach(() => {
  cleanup();
});

test("renders initial characters list and heading", () => {
  render(
    <ClientSideCharacters
      initialCharacters={mockInitCharacters}
      initialNextPageUrl={mockInitialNextPageUrl}
    />
  );

  expect(
    screen.getByRole("heading", { level: 1, name: "Characters List" })
  ).toBeDefined();

  mockInitCharacters.forEach((character) => {
    const characterElement = screen.getByTestId(`character-${character.id}`);
    expect(characterElement).toBeDefined();
  });
});

test("loads more characters when 'Load More' button is clicked", async () => {
  const mockFetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          results: mockNewCharacters,
          next: "123",
        }),
    })
  );
  global.fetch = mockFetch as any;

  render(
    <ClientSideCharacters
      initialCharacters={mockInitCharacters}
      initialNextPageUrl={mockInitialNextPageUrl}
    />
  );

  screen.debug();

  const loadMoreButton = await screen.getByTestId("loadMoreBtn");
  fireEvent.click(loadMoreButton);

  screen.debug();

  await waitFor(() => {
    for (const character of mockNewCharacters) {
      expect(screen.getByTestId(`character-${character.id}`)).toBeDefined();
    }
  });

  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(mockFetch).toHaveBeenCalledWith(mockInitialNextPageUrl);
});

test("displays 'Loading...' text on 'Load More' button while fetching data", async () => {
  // Mock fetch to simulate a delay
  const mockFetch = vi.fn(
    () =>
      new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              json: () =>
                Promise.resolve({
                  results: mockNewCharacters,
                  next: null,
                }),
            }),
          1000
        )
      )
  );
  global.fetch = mockFetch as any;

  render(
    <ClientSideCharacters
      initialCharacters={mockInitCharacters}
      initialNextPageUrl="https://api.example.com/characters?page=2"
    />
  );

  // Click the 'Load More' button
  const loadMoreButton = screen.getByTestId("loadMoreBtn");
  fireEvent.click(loadMoreButton);

  // Assert that the button text changes to 'Loading...' during the fetch
  expect(loadMoreButton.textContent).toBe("Loading...");

  // Wait for the fetch to complete and the new characters to be displayed
  await waitFor(() => {
    expect(mockFetch).toHaveBeenCalledTimes(1);
    for (const character of mockNewCharacters) {
      expect(screen.getByTestId(`character-${character.id}`)).toBeDefined();
    }
  });
});

test("does not render 'Load More' button when initialNextPageUrl is null", () => {
  render(
    <ClientSideCharacters
      initialCharacters={mockInitCharacters}
      initialNextPageUrl={null}
    />
  );

  expect(screen.queryByTestId("loadMoreBtn")).toBeNull();
});
