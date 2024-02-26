# Where's Waldo (A Photo Tagging App) Server Side
This this a Where's Waldo web game built using the MERN stack (MongoDB, Express.js, React.js, Node.js) along with the CSS module for styling.
Check out the [client-side repo](https://github.com/LaythAlqadhi/where-is-waldo-client-side).

## Preview
Check out the web application [Where's Waldo](https://where-is-waldo-five.vercel.app) to explore its features.

## Models
- Game
- Character

## Features
- Utilized RESTful API architectural style for seamless communication.
- Instantly retrieves start time and elapsed time within the model, minimizing delays.
- Implemented data validation and sanitization using Express-validator for enhanced security.

## Installation
1. **Clone the Repository:**
   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. **Start the Server:**
   To start the server in production mode, run:
   ```bash
   npm start
   ```

   To start the server in development mode with automatic restart on file changes, run:
   ```bash
   npm run devstart
   ```

   You can also start the server with debug logs enabled by running:
   ```bash
   npm run serverstart
   ```

4. **Running Tests:**
   To run tests, execute:
   ```bash
   npm test
   ```

## Additional Notes
- Make sure to have Node.js and npm/yarn installed and properly configured on your machine.
- This application uses ESLint for code linting and Prettier for code formatting. You can run linting using:
  ```bash
  npm run lint
  ```
  or
  ```bash
  yarn lint
  ```

- The application utilizes various middleware and packages for functionality such as authentication (Passport.js), data validation (express-validator), logging (morgan), etc.
- For detailed configuration and customization, refer to the `package.json` file and the respective configuration files (`eslintConfig`, `prettier`, etc.).
