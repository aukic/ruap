import React, { Component } from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import WelcomeText from "./components/WelcomeText/WelcomeText";
import ImageRecognition from "./components/ImageRecognition/ImageRecognition";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import ImageUpload from "./components/ImageUpload//ImageUpload";
import "./App.css";
const ENDPOINT_ID = "8893193093080154112";
const PROJECT_ID = "disco-haiku-360413";

const app = new Clarifai.App({
  apiKey: "01fd84557c63442ea510f3b4a3881d36",
});

const particlesOptions = {
  particles: {
    number: {
      value: 75,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
    };
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    console.log(this.state.input);
    // app.models
    //   .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    //   .then((response) => {
    //     console.log("Odziv API-a: ", response);
    //     if (response) {
    //       this.displayFaceBox(this.calculateFaceLocation(response));
    //     }
    //   })
    //   .catch((err) => console.log(err));
    const imageData = {
      instances: [
        {
          content: "YOUR_IMAGE_BYTES",
        },
      ],
      parameters: {
        confidenceThreshold: 0.5,
        maxPredictions: 5,
      },
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: imageData,
    };
    fetch(
      `https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/us-central1/endpoints/${ENDPOINT_ID}:predict`,
      requestOptions
    ).then((response) => console.log(response.json()));
  };

  render() {
    const { imageUrl, box } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <div>
          <WelcomeText />
          <ImageUpload />
          <ImageLinkForm
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
          />
          <ImageRecognition box={box} imageUrl={imageUrl} />
        </div>
      </div>
    );
  }
}

export default App;
