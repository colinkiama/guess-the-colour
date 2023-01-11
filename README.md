# Guess The Colour

This is a game created using PixiJS where you guess the correct colour that the computer has randomly selected.

You're given 20 seconds to guess as many correct colours as you can from the following choices: red, blue, green, yellow and orange. You get a point for each colour that you guess correctly!

## Setup Instructions

### Prerequisites

- Node.js (Built with Node v18.12.1)
- Node Package Manager (NPM) - (Built with NPM 8.19.2)
- Yarn - (Built with Yarn 3.3.0).

### Onboarding

To get started with running this project locally on your machine:

1. Clone this repository
2. Run the `yarn install` comamand in the directory to install the required packages for the project
3. Run a build of the project using the `yarn dev` command.

### Issues

Changes made in `src/api` aren't don't trigger a live reload. You'll need to restart the development server to see the changes applied in `src/api`.

### Development Commands

| Name           | Description                                                                                          |
| -------------- | ---------------------------------------------------------------------------------------------------- |
| `yarn dev`     | Runs an unoptimsed version of the game on a development server                                       |
| `yarn build`   | Create an optimsed build of the game, resulting in a static output, ready for deployment on the web. |
| `yarn preview` | Locally preview production build                                                                     |
