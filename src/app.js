const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];


app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repositorie = { id: uuid(), title, url, techs, likes: 0 };
  repositories.push(repositorie);
  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title, techs } = request.body;
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (repositorieIndex === -1) {
    return response.status(400).json({ error: "Repositorie not found" });
  }

  const repositorieUpdate = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositorieIndex].likes,
  };

  repositories[repositorieIndex] = repositorieUpdate;

  return response.json(repositorieUpdate);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositorieFindIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (repositorieFindIndex === -1) {
    return response.status(400).json({ error: "Repositorie not found" });
  }


  repositories.splice(repositorieFindIndex, 1);


  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositorieFindIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (repositorieFindIndex === -1) {
    return response.status(400).json({ error: "Repositorie not found" });
  }

  repositories[repositorieFindIndex].likes += 1;

  return response.json(repositories[repositorieFindIndex]);


});

module.exports = app;
