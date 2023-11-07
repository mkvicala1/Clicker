var resources = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
var peasantNum = 5;
var farmerNum = 3;
var lumberjackNum = 0;
var stonemasonNum = 0;
let resourceType = ["Grain", "Wood", "Stone", "Leather", "Ore", "Metal"];
var housingNum = 1;
var granaryNum = 0;
var lumberMillNum = 0;
var mineNum = 0;
var templeNum = 0;
var grainMod = 0;
var woodMod = 0;
var leatherMod = 0;
var stoneMod = 0;
var oreMod = 0;
var metalMod = 0;
var lumberMillEmployment = 0;
var mineEmployment = 0;
var grainchange = [0.0, 0.0];
var woodchange = [0.0, 0.0];
var stonechange = [0.0, 0.0];
var grainRate = 0.0;
var resourceRate = [];
var deathCheck = false;
var marketplaceLevel = 0;
var portLevel = 0;
var grainCapacity = 100;
var woodCapacity = 100;
var stoneCapacity = 100;
var housingCapacity = 0;
var stoneDepot = 0;
var lumberYard = 0;

function peasantWork() {
  grainchange[0] += Math.round(farmerNum * (1.1 + grainMod));
  woodchange[0] += Math.round(lumberjackNum * (1.25 + woodMod));
  stonechange[0] += Math.round(stonemasonNum * (1.25 + stoneMod));
  resourceTick();
}
let clickerInterval = setInterval(peasantWork, 1000);

function resourceTick() {
  let grainPerSec = 0;
  let woodPerSec = 0;
  let stonePerSec = 0;
  for (let i = 0; i < grainchange.length; i++) {
    if (grainchange[i] != null && !isNaN(grainchange[i])) {
      grainPerSec += grainchange[i];
      grainchange[i] = null;
    }
  }
  resourceRate[0] = grainPerSec;
  resources[0] += grainPerSec;
  if (resources[0] > grainCapacity) {
    resources[0] = grainCapacity;
  }
  else if(resources[0] <= 0)
  {
    resources[0] = 0;
  }
  document.getElementById("grainChange").innerHTML = grainPerSec;

  for (let i = 0; i < woodchange.length; i++) {
    if (typeof woodchange[i] === "number" && !isNaN(woodchange[i])) {
      woodPerSec += woodchange[i];
      woodchange[i] = 0;
    }
  }

  if (!isNaN(woodPerSec)) {
    resourceRate[1] = woodPerSec;
    resources[1] += woodPerSec;
    document.getElementById("testvalue1").innerHTML = woodPerSec;
  }
  document.getElementById("woodChange").innerHTML = woodPerSec;

  for (let i = 0; i < stonechange.length; i++) {
    if (typeof stonechange[i] === "number" && !isNaN(stonechange[i])) {
      stonePerSec += stonechange[i];
      stonechange[i] = 0;
    }
  }

  if (!isNaN(stonePerSec)) {
  resourceRate[2] = stonePerSec;
  resources[2] += stonePerSec;
  }
  document.getElementById("stoneChange").innerHTML = stonePerSec;

  updateChart();
}

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

function peasantBirth() {
  if (resources[0] > 0 || resourceRate[0] > 0) {
    if (housingNum > Math.floor(peasantNum / 5)) {
      peasantNum = Math.round(peasantNum * 1.1);
      updateChart();
      document.getElementById("testvalue2").innerHTML = Math.round(
        peasantNum * 1.1
      );
    }
    deathCheck = false;
  } else if (deathCheck == true) {
    peasantNum = peasantNum - Math.ceil(peasantNum * 0.1);
    deathCheck = false;
  } else {
    deathCheck = true;
  }
}

let birthInterval = setInterval(peasantBirth, 10000);

function updateChart() {
  document.getElementById("farmerNum").innerHTML = farmerNum;
  document.getElementById("lumberjackNum").innerHTML = lumberjackNum;
  document.getElementById("stonemasonNum").innerHTML = stonemasonNum;
  document.getElementById("peasantNum").innerHTML = peasantNum;
  document.getElementById("availableNum").innerHTML =
    peasantNum - (farmerNum + lumberjackNum + stonemasonNum);
  document.getElementById("GrainLine").innerHTML = Math.round(resources[0]);
  document.getElementById("WoodLine").innerHTML = resources[1];
  document.getElementById("StoneLine").innerHTML = Math.round(resources[2]);
  document.getElementById("LeatherLine").innerHTML = Math.round(resources[3]);
  document.getElementById("OreLine").innerHTML = Math.round(resources[4]);
  document.getElementById("MetalLine").innerHTML = Math.round(resources[5]);
  document.getElementById("housingNum").innerHTML = Math.round(housingNum);
  document.getElementById("granaryNum").innerHTML = Math.round(granaryNum);
  document.getElementById("lumberMillNum").innerHTML =
    Math.round(lumberMillNum);
  document.getElementById("mineNum").innerHTML = Math.round(mineNum);
  document.getElementById("templeNum").innerHTML = Math.round(templeNum);

  updateResourceCapacities();
  updateColor();
}

function updateColor() {
  let table = document.getElementById("resourceTable");
  chartColor(table);
}

function updateResourceCapacities() {
  grainCapacity = 100 + granaryNum * 20;
  document.getElementById("grainCapacity").innerHTML = grainCapacity;
  housingCapacity = housingNum * 5;
  document.getElementById("housingCapacity").innerHTML = housingCapacity;
}

function chartColor(table) {
  for (let i = 0; i < table.rows.length; i++) {
    for (let j = 0; j < table.rows[i].cells.length; j++) {
      if (!isNaN(parseFloat(table.rows[i].cells[j].innerText))) {
        if (parseFloat(table.rows[i].cells[j].innerText) > 0) {
          table.rows[i].cells[j].style.color = "#04AF70";
        } else if (parseFloat(table.rows[i].cells[j].innerText) < 0) {
          table.rows[i].cells[j].style.color = "#FF0000";
        } else {
          table.rows[i].cells[j].style.color = "#000000";
        }
        //table.rows[i].cells[j].style.color = "#00FF00";
        //document.getElementById("testvalue2").innerHTML = 'done';
      }
    }
  }
}

function resourceConsumption() {
  grainConsumption();
}
let resourceConsumer = setInterval(resourceConsumption, 1000);

function grainConsumption() {
  grainchange[1] = 0 - 0.5 * peasantNum;
}

function buildBuildings(buildingType) {
  //1 = wood, 2 = stone
  switch (buildingType) {
    case "house":
      if (resources[2] > 8 && resources[1] > 2) {
        resources[2] -= 8;
        resources[1] -= 2;
        housingNum++;
        document.getElementById("testvalue1").innerHTML = "fired";
      }
      updateChart();
      break;
    case "granary":
      if (resources[1] > 20) {
        resources[1] -= 20;
        granaryNum++;
      }
      updateChart();
      break;
    case "lumberMill":
      if (resources[2] > 20 && resources[1] > 10) {
        resources[2] -= 20;
        resources[1] -= 10;
        lumberMillNum++;
      }
      updateChart();
      break;
    case "mine":
      if (resources[2] > 5 && resources[1] > 30) {
        resources[2] -= 5;
        resources[1] -= 30;
        mineNum++;
      }
      updateChart();
      break;
    case "temple":
      if (resources[2] > 100 && resources[1] > 25) {
        resources[2] -= 100;
        resources[1] -= 25;
        templeNum++;
      }
      updateChart();
      break;
  }
  updateChart();
  buildingProduction();
}

function buildingProduction() {
  let granaryEmployment = 10;
  //grainMod = ((granaryEmployment * granaryNum) / farmerNum) * 0.1;
  woodMod = ((lumberMillEmployment * lumberMillNum) / lumberjackNum) * 0.75;
  stoneMod = ((mineEmployment * mineNum) / stonemasonNum) * 0.75;
  updateChart();
}

function openChart(chartId) {
  let chartsAll = ["Population", "Buildings", "Upgrades"];

  if (document.getElementById(chartId).style.display == "none") {
    document.getElementById(chartId).style.display = "block";
  }

  for (let i = 0; i < chartsAll.length; i++) {
    if (chartsAll[i] != chartId) {
      document.getElementById(chartsAll[i]).style.display = "none";
    }
  }
}
