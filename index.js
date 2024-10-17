const userInput = document.querySelector("#userInput");

userInput.addEventListener("submit", async function (event) {
  event.preventDefault();

  const location = document.getElementById("location").value;
  const img = document.querySelector(".weatherGipsy");

  //To handle the weather API value
  try {
    const loggedData = await hitAPI(location);
    console.log(loggedData.currentConditions);
    const condition = loggedData.currentConditions.conditions;
    weatherGipsy(condition);
  } catch (error) {
    console.log("Error(from eventlistner function): ", error);
  }

  //To Handle the appropirate Gipsy for the current weather condition
  async function weatherGipsy(condition) {
    try {
      const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=3Nnbnu5G5xbCIE1Cnfs3H3BI7wpjnlka&s=${condition} weather`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      const url = data.data.images.original.url;
      img.src = url;
    } catch (error) {
      errorMsg.textContent = `Fetch error: ${error.message}`;
    }
  }
});

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
