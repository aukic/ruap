const express = require("express");
const cors = require("cors");

const ENDPOINT_ID = "8893193093080154112";
const PROJECT_ID = "disco-haiku-360413";
const INPUT_DATA_FILE = "imageData";
const url = `https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/us-central1/endpoints/${ENDPOINT_ID}:predict`;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("App radi");
});

app.post(
  `https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/us-central1/endpoints/${ENDPOINT_ID}:predict`,
  (req, res) => {}
);
app.listen(8080, () => {
  console.log("app is running on port 8080");
});
