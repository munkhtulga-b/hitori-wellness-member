```
@author - Munkhtulga Borgil
@since - Feb 05, 2024
@contact - munkhtulga@mirai.mn
```

## Getting Started

After cloning the project, first run "yarn" or "npm install" then start your dev server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Project Structure

"app" folder -> This folder contains the all development related files including layouts, page, components, providers, and much more. Folders names starting with an underscore ("\_") are not for routing purposes.

>>* `_api` -> The folder containing all the http request config and controllers

>>* `_components` -> The folder containing all the components used in the project

>>* `_enums` -> The folder containing all the enums used in the project

>>* `_lottie` -> The folder containing all the lottie files for the animation

>>* `_provider` -> The folder containing the provider component (wrapper component for the whole app)

>>* `_store` -> The folder containing the config and stores of Zustand (state management library for React)

>>* `_utils` -> The folder containing all the helper functions used in the project (e.g. `getFullName()`, `nullSafety()`)

".github" folder -> This folder contains the config for github CI/CD

"public" folder -> This folder contains all the assets including icons and vectors used in the project
