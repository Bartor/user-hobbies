# User Hobbies

A React+Redux web app built for a recruitment process. To run a dev server: `npm start`. To run test(s): `npm test`.

## Project structure

The `src` folder contains:

- `components` - the UI files with styles and tests
- `core` - things shared throughout the app, but not owned particularly by anything (e.g. common type definitions)
- `logic` - the data flow in the app; state managers, sagas definition, store definition, simple API client and mocked server

The app runs with a mocked HTTP API using Mirage.js, which also simulates a slight ('real-life') networking delay when performing requests.