# Dev Notes

## Project Structure

- `entities` — business entities. (e.g., User, Client, Website, WebsitePage)
  - `user` - user specific functionality
  - `client` - user specific functionality
  - `website` - user specific functionality
- `features` — user interactions, actions that bring business value to the user. (e.g. UsersSearch, DataTable)
- `providers` — global providers, such as `QueryClientProvider`, `AuthProvider`, `ThemeProvider`.
- `routes` — compositional layer to construct full pages from entities, features and widgets.
- `shared` — reusable functionality, detached from the specifics of the project/business.
  - `api` - api calls to the backend
  - `sass` - global styles
  - `utils` - utility functions
  - `server` - server side code
- `widgets` — compositional layer to combine entities and features into meaningful blocks. (e.g. UserProfile, CoreWebVitalsGraph)

## Git Branch Heirarchy

- `main` - main branch used for *production*
- `dev` - branch for integrating `base` code for *testing* and *staging*
- `base` - base branch for integrating `feature` branches
  - `feat-` - feature branches for developing new features

----

## Dependencies

### Routing

- [Solid Router](https://docs.solidjs.com/guides/how-to-guides/routing-in-solid/solid-router)

### Data Management

- [Tanstack Query (Solid)](https://tanstack.com/query/latest/docs/framework/solid/overview)
- [Tanstack Form (Solid)](https://tanstack.com/form/latest/docs/guides/basic-concepts)
- [TanStack Table (Solid)](https://tanstack.com/table/v8/docs/introduction)

### Auth

- [Auth0 JS](https://auth0.com/docs/libraries/auth0js)

### Theme & Styles

- [Solid Boostrap](https://solid-libs.github.io/solid-bootstrap/)

----

## Patterns

### Folder Structure

- [Feature Sliced Design (FSD)](https://feature-sliced.design/docs/get-started/overview)
  - [FSD Realworld React Example](https://github.com/sldk-yuri/realworld-react-fsd/)

### Component Patterns

- [SolidJS Patterns](https://raqueebuddinaziz.com/blog/3-patterns-to-write-better-and-more-readable-solidjs-components)

## Resources

- [SolidJS](https://docs.solidjs.com/)
- [SolidStart](https://start.solidjs.com/)
- [SolidStart Repo](https://github.com/solidjs/solid-start/)

### Solid Start Examples

- [Route Fetching](https://github.com/solidjs/solid-start/blob/main/examples/hackernews/src/routes/%5B...stories%5D.tsx)
