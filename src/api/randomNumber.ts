// Each game session is 2 minutes and there's a 2 second wait before the player can make
// another guess. So
const COUNT = 60;
const MIN_VALUE = 0;
const MAX_VALUE = 4;
const API_ENDOPINT = "http://www.randomnumberapi.com/api/v1.0/random";

const REQUEST_URL = `${API_ENDOPINT}?min=${MIN_VALUE}&max=${MAX_VALUE}&count=${COUNT}`;

// Production values
// export async function fetchRandomNumbers(): Promise<number[]> {
//   let response = await fetch(REQUEST_URL);
//   let randomNumbers = await response.json();

//   return randomNumbers as number[];
// }

// When not testing random number logic
export async function fetchRandomNumbers(): Promise<number[]> {
  return new Promise((resolve, _) =>
    resolve([0, 1, 3, 4, 2, 3, 2, 3, 0, 3, 0, 4, 3, 2, 2, 1, 0, 4, 3])
  );
}
