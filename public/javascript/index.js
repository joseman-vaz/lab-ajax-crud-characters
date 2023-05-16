// import { APIHandler } from "./APIHandler";
// const APIHandler = require("/public/javascript/APIHandler");

const charactersAPI = new APIHandler("http://localhost:5500");

window.addEventListener("load", () => {
  document
    .getElementById("fetch-all")
    .addEventListener("click", function (event) {
      charactersAPI
        .getFullList()
        .then((response) => {
          const characters = response.data;
          showCharacters(characters);
        })
        .catch((error) => {
          console.log(error);
        });
    });

  document
    .getElementById("fetch-one")
    .addEventListener("click", function (event) {
      event.preventDefault();
      const characterId = document.querySelector(
        'input[name="character-id"]'
      ).value;
      fetchCharacterById(characterId);
    });

  document
    .getElementById("delete-one")
    .addEventListener("click", function (event) {
      event.preventDefault();
      const characterId = document.querySelector(
        'input[name="character-id-delete"]'
      ).value;
      deleteCharacterById(characterId);
    });

  document
    .getElementById("edit-character-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const id = document.querySelector(
        "#edit-character-form input[name='chr-id']"
      ).value;
      const name = document.querySelector(
        "#edit-character-form input[name='name']"
      ).value;
      const occupation = document.querySelector(
        "#edit-character-form input[name='occupation']"
      ).value;
      const weapon = document.querySelector(
        "#edit-character-form input[name='weapon']"
      ).value;
      const cartoon = document.querySelector(
        "#edit-character-form input[name='cartoon']"
      ).checked;

      const characterInfo = {
        name: name,
        occupation: occupation,
        weapon: weapon,
        cartoon: cartoon,
      };

      updateCharacter(id, characterInfo);
    });

  document
    .getElementById("new-character-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.querySelector(
        "#new-character-form input[name='name']"
      ).value;
      const occupation = document.querySelector(
        "#new-character-form input[name='occupation']"
      ).value;
      const weapon = document.querySelector(
        "#new-character-form input[name='weapon']"
      ).value;
      const cartoon = document.querySelector(
        "#new-character-form input[name='cartoon']"
      ).checked;

      const characterInfo = {
        name: name,
        occupation: occupation,
        weapon: weapon,
        cartoon: cartoon,
      };

      createCharacter(characterInfo);
    });
});

function showCharacters(characters) {
  const charactersContainer = document.querySelector(".characters-container");

  charactersContainer.innerHTML = "";

  characters.forEach((character) => {
    const characterCard = document.createElement("div");
    characterCard.classList.add("character-info");

    const name = document.createElement("div");
    name.classList.add("name");
    name.textContent = `Name: ${character.name}`;

    const occupation = document.createElement("div");
    occupation.classList.add("occupation");
    occupation.textContent = `Occupation: ${character.occupation}`;

    const cartoon = document.createElement("div");
    cartoon.classList.add("cartoon");
    cartoon.textContent = `Is a Cartoon? ${character.cartoon ? "Yes" : "No"}`;

    const weapon = document.createElement("div");
    weapon.classList.add("weapon");
    weapon.textContent = `Weapon: ${character.weapon}`;

    characterCard.appendChild(name);
    characterCard.appendChild(occupation);
    characterCard.appendChild(cartoon);
    characterCard.appendChild(weapon);

    charactersContainer.appendChild(characterCard);
  });
}

function fetchCharacterById(characterId) {
  charactersAPI
    .getOneRegister(characterId)
    .then((response) => {
      const character = response.data;
      displayCharacter(character);
    })
    .catch((error) => {
      console.log(error);
    });
}

function displayCharacter(character) {
  const characterInfo = document.querySelector(".character-info");
  characterInfo.innerHTML = `
    <div class="name">${character.name}</div>
    <div class="occupation">${character.occupation}</div>
    <div class="cartoon">${
      character.cartoon ? "Is a Cartoon: Yes" : "Is a Cartoon: No"
    }</div>
    <div class="weapon">${character.weapon}</div>
  `;
}

function deleteCharacterById(characterId) {
  charactersAPI
    .deleteOneRegister(characterId)
    .then((response) => {
      const deleteButton = document.getElementById("delete-one");
      deleteButton.style.backgroundColor = "green";
    })
    .catch((error) => {
      const deleteButton = document.getElementById("delete-one");
      deleteButton.style.backgroundColor = "red";
      console.log(error);
    });
}

function createCharacter(characterInfo) {
  const createButton = document.getElementById("send-data");
  createButton.style.backgroundColor = "";

  charactersAPI
    .createOneRegister(characterInfo)
    .then((response) => {
      createButton.style.backgroundColor = "green";
      console.log("Character created successfully");
    })
    .catch((error) => {
      createButton.style.backgroundColor = "red";
      console.error("Error creating character:", error);
    });
}

function updateCharacter(id, characterInfo) {
  const updateButton = document.getElementById("send-data");
  updateButton.style.backgroundColor = "";

  charactersAPI
    .updateOneRegister(id, characterInfo)
    .then((response) => {
      updateButton.style.backgroundColor = "green";
      console.log("Character updated successfully");
    })
    .catch((error) => {
      updateButton.style.backgroundColor = "red";
      console.error("Error updating character:", error);
    });
}
