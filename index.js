const userInput = document.querySelector("#userInput");

userInput.addEventListener("submit", async function (event) {
  event.preventDefault();

  const location = document.getElementById("location").value;

  try {
    const currentConditions = await hitAPI(location);
    console.log(currentConditions.currentConditions);
  } catch (error) {
    console.log("Error(from eventlistner function): ", error);
  }
});

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
