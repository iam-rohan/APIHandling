const userInput = document.querySelector("#userInput");
const img = document.querySelector(".weatherGipsy");

weatherGipsy("Funny Weather News");

userInput.addEventListener("submit", async function (event) {
  event.preventDefault();

  const location = document.getElementById("location").value;

  //To handle the weather API value
  try {
    const loggedData = await hitAPI(location);
    const liveResult = loggedData;
    const condition = liveResult.currentConditions.conditions;
    img.style.display = "none";
    img.src = "";
    weatherGipsy(condition);
    handleDisplay(liveResult);
  } catch (error) {
    console.log("Error(from eventlistner function): ", error);
  }
});

//To Handle the appropirate Gipsy for the current weather condition
async function weatherGipsy(condition) {
  img.style.display = "block";
  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=3Nnbnu5G5xbCIE1Cnfs3H3BI7wpjnlka&s=${condition} weather sky`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    const url = data.data.images.original.url;
    img.src = url;
  } catch (error) {
    console.log(`Fetch error: ${error.message}`);
  }
}

// To handle Weather APIHIT
async function hitAPI(location) {
  try {
    const data = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=5C2K3RFNADS7XS3Q24829L8HR`
    );
    const response = await data.json();
    return response;
  } catch (error) {
    console.log("Error: ", error);
  }
}

function handleDisplay(liveResult) {
  const temperature = document.querySelector(".temp");
  const location = document.querySelector(".loc");
  const description = document.querySelector(".des");

  temperature.textContent = `${Math.round(liveResult.currentConditions.temp)}°F | ${Math.round(
    ((liveResult.currentConditions.temp - 32) * 5) / 9
  )}°C`;
  location.textContent = liveResult.resolvedAddress;
  description.textContent = liveResult.description;
}
