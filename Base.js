var resources = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
var peasantNum = 0;
var farmerNum = 0;
var lumberjackNum = 0;
var stonemasonNum = 0;
let resourceType = ["Grain", "Wood", "Stone", "Leather", "Ore", "Metal"];
var housingNum = 0;
var granaryNum = 0;
var lumberMillNum = 0;
var mineNum = 0;
var templeNum = 0;

function peasantWork() {
  resources[0] += Math.round(farmerNum * 1.25);
  resources[1] += Math.round(lumberjackNum * 1.25);
  resources[2] += Math.round(stonemasonNum * 1.25);
  updateChart();
}
let clickerInterval = setInterval(peasantWork, 1000);

function addResources(resourceType) {
  switch (resourceType) {
    case "Grain":
      resources[0]++;
      document.getElementById(resourceType + "Line").innerHTML = resources[0];
      break;
    case "Wood":
      resources[1]++;
      document.getElementById(resourceType + "Line").innerHTML = resources[1];
      break;
    case "Stone":
      resources[2]++;
      document.getElementById(resourceType + "Line").innerHTML = resources[2];
      break;
  }
}

function addPeasants() {
  peasantNum++;
  updateChart();
}

function assignPeasants(peasantChange) {
  switch (peasantChange) {
    case "Farmer":
      if (farmerNum + lumberjackNum + stonemasonNum < peasantNum) {
        farmerNum++;
      }
      updateChart();
      break;

    case "Lumberjack":
      if (farmerNum + lumberjackNum + stonemasonNum < peasantNum) {
        lumberjackNum++;
      }
      updateChart();
      break;
    case "Stonemason":
      if (farmerNum + lumberjackNum + stonemasonNum < peasantNum) {
        stonemasonNum++;
      }
      updateChart();
      break;
  }
}

function updateChart() {
  document.getElementById("farmerNum").innerHTML = farmerNum;
  document.getElementById("lumberjackNum").innerHTML = lumberjackNum;
  document.getElementById("stonemasonNum").innerHTML = stonemasonNum;
  document.getElementById("peasantNum").innerHTML = peasantNum;
  document.getElementById("availableNum").innerHTML =
    peasantNum - (farmerNum + lumberjackNum + stonemasonNum);

  document.getElementById("GrainLine").innerHTML = resources[0];
  document.getElementById("WoodLine").innerHTML = resources[1];
  document.getElementById("StoneLine").innerHTML = resources[2];
  document.getElementById("LeatherLine").innerHTML = resources[3];
  document.getElementById("OreLine").innerHTML = resources[4];
  document.getElementById("MetalLine").innerHTML = resources[5];
  document.getElementById("housingNum").innerHTML = housingNum;
  document.getElementById("granaryNum").innerHTML = granaryNum;
  document.getElementById("lumberMillNum").innerHTML = lumberMillNum;
  document.getElementById("mineNum").innerHTML = mineNum;
  document.getElementById("templeNum").innerHTML = templeNum;
}

function resourceConsumption() {
  grainConsumption();
}
let resourceConsumer = setInterval(resourceConsumption, 2000);

function grainConsumption() {
  resources[0] -= peasantNum;
  updateChart();
}

function buildBuildings(buildingType) {
  //1 = wood, 2 = stone
  switch (buildingType) {
    case "house":
      if (resources[2] >= 8 && resources[1] >= 2) {
        resources[2] -= 8;
        resources[1] -= 2;
        housingNum++;
      }
      updateChart();
      break;
    case "granary":
      if (resources[1] >= 20) {
        resources[1] -= 20;
        granaryNum++;
      }
      updateChart();
      break;
    case "lumberMill":
      if (resources[2] >= 20 && resources[1] >= 10) {
        resources[2] -= 20;
        resources[1] -= 10;
        lumberMillNum++;
      }
      updateChart();
      break;
    case "mine":
      if (resources[2] >= 5 && resources[1] >= 30) {
        resources[2] -= 5;
        resources[1] -= 30;
        mineNum++;
      }
      updateChart();
      break;
    case "temple":
      if (resources[2] >= 100 && resources[1] >= 25) {
        resources[2] -= 100;
        resources[1] -= 25;
        templeNum++;
      }
      updateChart();
      break;
  }
  updateChart();
}

function buildingProduction()
{
  let granaryEfficiency = 5;
  let granaryEmployment = 10
  if(granaryEmployment*granaryNum<=farmerNum)
  {
    resources[0] += Math.round((farmerNum * 1.25)*granaryNum);
  }
  else{
    resources[0] += Math.round((farmerNum * 1.25)*(granaryEmployment*granaryNum)/farmerNum);
  }
}

function openChart(chartId) {
  let chartsAll = ["Population", "Buildings"];

  if (document.getElementById(chartId).style.display == "none") {
    document.getElementById(chartId).style.display = "block";
  }

  for (let i = 0; i < chartsAll.length; i++) {
    if (chartsAll[i] != chartId) {
      document.getElementById(chartsAll[i]).style.display = "none";
    }
  }
}
