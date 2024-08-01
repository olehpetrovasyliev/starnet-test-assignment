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
// import { apiWrapper } from "./apiWrapper";
import { BASE_URL } from "../constants";

const instance = axios.create({ baseURL: BASE_URL });

export const getAllCharacters = (
  page: number
): Promise<ApiPaginatedRes<CharactersArr>> =>
  instance.get("/people/", { params: { page } }).then((res) => res.data);

export const getCharacterById = (id: number): Promise<Character> =>
  instance.get(`/people/${id}`).then((res) => res.data);

export const getAllStarships = (params: {}): Promise<
  ApiPaginatedRes<StarshipsArr>
> =>
  instance
    .get("/starships/", { params: { ...params } })
    .then((res) => res.data);

export const getStarshipById = (id: number): Promise<Starship> =>
  instance.get(`/starships/${id}`).then((res) => res.data);

export const getAllFilms = (params: {}): Promise<ApiPaginatedRes<FilmsArr>> =>
  instance.get("/films/", { params: { ...params } }).then((res) => res.data);

export const getFilmById = (id: number): Promise<Film> =>
  instance.get(`/films/${id}`).then((res) => res.data);

export const getAllPlanets = (params: {}): Promise<PlanetsArr> =>
  instance.get("/planets", { params: { ...params } }).then((res) => res.data);

export const getPlanetById = (id: number): Promise<Planet> =>
  instance.get(`/planets/${id}`).then((res) => res.data);
