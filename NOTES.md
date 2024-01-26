# Dev Notes

## Git Branch Heirarchy

- `dev` - main branch for testing and experimenting
- `base` - base branch for all feature branches
  - `base-ssr` - base branch for integrating features in SSR mode
  - `base-csr` - base branch for integrating features in CSR mode
- `theme` - branch for developing the theme and layout components
- `styles` - branch for developing the sass styles
- `utils` - branch for developing the utility functions
- `auth0` - branch for developing the auth0 integration

----

## Dependencies

### Theme & Styles

- [Solid Boostrap](https://solid-libs.github.io/solid-bootstrap/)

### Data Management

- [Tanstack Query (Solid)](https://tanstack.com/query/latest/docs/framework/solid/overview)
- [Tanstack Form (Solid)](https://tanstack.com/form/latest/docs/guides/basic-concepts)
- [TanStack Table (Solid)](https://tanstack.com/table/v8/docs/introduction)

### Auth

- [Auth0 JS](https://auth0.com/docs/libraries/auth0js)

----

## Reference

- [SolidJS](https://docs.solidjs.com/)
- [SolidStart](https://start.solidjs.com/)
- [SolidStart Repo](https://github.com/solidjs/solid-start/)
- [SolidJS Patterns](https://raqueebuddinaziz.com/blog/3-patterns-to-write-better-and-more-readable-solidjs-components)
