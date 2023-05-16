// const axios = require("axios");

class APIHandler {
  constructor() {
    this.api = axios.create({
      BASE_URL: "http://localhost:5500",
    });
  }

  getFullList() {
    return this.api.get("http://localhost:5500/characters");
  }

  getOneRegister(characterId) {
    return this.api.get(`http://localhost:5500/characters/${characterId}`);
  }
  createOneRegister(characterInfo) {
    return this.api.post(`http://localhost:5500/characters`, characterInfo);
  }

  updateOneRegister(characterId, characterInfo) {
    return this.api.put(
      `http://localhost:5500/characters/${characterId}`,
      characterInfo
    );
  }

  deleteOneRegister(characterId) {
    return this.api.delete(`http://localhost:5500/characters/${characterId}`);
  }
}

// module.exports = APIHandler;
