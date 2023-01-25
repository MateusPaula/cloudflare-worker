import { Router } from "tiny-request-router";
import data from "./mocks/data.json";
import {postError} from "./logger";

const respondWithJson = (data) =>
  new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application-json",
    },
  });

const mockedRouter = new Router();

mockedRouter.get("/ping", async () => new Response("mockedPong"));
mockedRouter.get("/data", async () => new Response("some data will be ret"));
mockedRouter.get("/starwars", () => {
  return respondWithJson({
    name: "Mateus",
    population: 1,
    residents: ["João"],
  });
});

const router = new Router();
router.get("/ping", async () => new Response("pong"));
router.get("/data", async () => {
  return respondWithJson(data);
});

router.get("/starwars", async () => {
  const request = new Request("https://swapi.dev/api/planets/1/");
  const originalResponse = await fetch(request);
  const originalData = await originalResponse.json();
  //const fake = doesNotExist;
  const reducedData = {
    name: originalData.name,
    population: originalData.population,
    residents: originalData.residents[0],
    films: originalData.films[0],
  };

  return new Response(JSON.stringify(reducedData), {
    headers: {
      "content-type": "application-json"
    },
  });
});

export async function handleRequest(event) {
  const { request } = event;

  try {
    const { pathname } = new URL(request.url);
    const mocked = request.headers.get("mocked") === "true" || false;

    let match;

    if (mocked) {
      match = mockedRouter.match(request.method, pathname);
    } else {
      match = router.match(request.method, pathname);
    }
    
    return match.handler(match.params);
  
  } catch (error) {
    event.waitUntil(postError(error.stack | error));
    return new Response('Oops not found 404');

  }
  

}
