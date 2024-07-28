import axios from "axios";
import {
  ApiPaginatedRes,
  Character,
  CharactersArr,
  Film,
  FilmsArr,
  Planet,
  PlanetsArr,
  Starship,
  StarshipsArr,
} from "../types";
import { apiWrapper } from "./apiWrapper";
import { BASE_URL } from "../constants";

const instance = axios.create({ baseURL: BASE_URL });

export const getAllCharacters = (
  page: number
): Promise<ApiPaginatedRes<CharactersArr>> => {
  return apiWrapper(() =>
    instance.get("/people/", { params: { page } }).then((res) => res.data)
  );
};

export const getCharacterById = (id: string): Promise<Character> => {
  return apiWrapper(() =>
    instance.get(`/people/${id}`).then((res) => res.data)
  );
};

export const getAllPlanets = (
  page: number
): Promise<ApiPaginatedRes<PlanetsArr>> => {
  return apiWrapper(() =>
    instance.get("/planets/", { params: { page } }).then((res) => res.data)
  );
};

export const getPlanetById = (id: string): Promise<Planet> => {
  return apiWrapper(() =>
    instance.get(`/planets/${id}`).then((res) => res.data)
  );
};

export const getAllStarships = (
  page: number
): Promise<ApiPaginatedRes<StarshipsArr>> => {
  return apiWrapper(() =>
    instance.get("/starships/", { params: { page } }).then((res) => res.data)
  );
};

export const getStarshipById = (id: string): Promise<Starship> => {
  return apiWrapper(() =>
    instance.get(`/starships/${id}`).then((res) => res.data)
  );
};

export const getAllFilms = (
  page: number
): Promise<ApiPaginatedRes<FilmsArr>> => {
  return apiWrapper(() =>
    instance.get("/films/", { params: { page } }).then((res) => res.data)
  );
};

export const getFilmById = (id: string): Promise<Film> => {
  return apiWrapper(() => instance.get(`/films/${id}`).then((res) => res.data));
};
