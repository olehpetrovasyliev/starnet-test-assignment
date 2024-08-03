# Star Wars Heroes Viewer

## Overview

This web application allows users to browse a list of Star Wars heroes and view detailed information about the movies and spaceships associated with each hero. Built using the latest version of Next.js, the application leverages Axios for API requests and React Flow for visualizing data in a graph format. The UI is styled with Tailwind CSS.

## Features

- **Heroes List**: Displays a paginated with "Load More" button list of Star Wars heroes retrieved from the `sw-api.starnavi.io` API.
- **Hero Info**: Card with all the detailed information about hero.
- **Hero Details**: On selecting a hero, displays a detailed graph with:
  - The hero as the main node.
  - Connections to movies the hero appears in.
  - Connections from each movie to the spaceships the hero traveled on.

## Technologies Used

- **Framework**: Next.js
- **API Requests**: Axios
- **UI Library**: Tailwind CSS
- **Graph Visualization**: React Flow
- **Testing**: Vitest

## Getting Started

You can view the deployed version of this project on Vercel:

[https://starnet-test-assignment.vercel.app/](https://starnet-test-assignment.vercel.app/)

## Design Principles

This project adheres to the principles of SOLID, DRY, and KISS:

- **SOLID**: Each component and function has a single responsibility, and the code is organized to be easily extendable and maintainable.
- **DRY**: Repeated code is abstracted into reusable functions and components.
- **KISS**: The implementation is kept simple and straightforward.

## Notes

- All comments and documentation are written in English.
- Names of modules, classes, functions, and variables are descriptive and avoid abbreviations.
- No API requests are made during test runs.

## Author

- [Oleh Vasyliev](https://github.com/olehpetrovasyliev)
