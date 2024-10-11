import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const counterValue: HTMLDivElement = document.querySelector("#counterValue")!;
const growthValue: HTMLDivElement = document.querySelector("#growthValue")!;
const purchaseValue: HTMLDivElement = document.querySelector("#purchaseValue")!;

let previousTime: number = performance.now();
let count: number = 0;
let growthRate: number = 0;

const gameName = "Mousetrap Mastermind";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const image = document.createElement("img");
//rat photo link https://pixabay.com/illustrations/mouse-rat-horse-riding-mouse-trap-1027582/
image.style.width = "320px"; 
image.style.height = "320px"; 
image.src = "./mouse.jpg"; 

app.append(image)

//button code pulled from the lecture on 10/02/24 and mdn docs for addEventListener
const clicker = document.createElement("button");
clicker.innerHTML = "🪤 <- Steal Da Cheez";
clicker.addEventListener("click", incrementCounter);
clicker.id = "clickerButton";
app.append(clicker);

interface Upgrade {
  name: string;
  cost: number;
  units: number;
}

const upgradeList: Upgrade[] = [
  { name: "Big pair of Sneakers", cost: 10, units: 0.1 },
  { name: "Mousetrap Tamperers", cost: 100, units: 2.0 },
  { name: "Mechanical Mice", cost: 1000, units: 50 },
];

interface Purchase {
  name: string;
  purchaseCount: number;
}

const purchaseList: Purchase[] = [
  { name: "A", purchaseCount: 0 },
  { name: "B", purchaseCount: 0 },
  { name: "C", purchaseCount: 0 },
];

app.append(counterValue);
app.append(growthValue);
app.append(purchaseValue);

createUpgradeButtons(upgradeList);

//makes the upgrade buttons form the upgrade list
function createUpgradeButtons(upgradeList: Upgrade[]) {
  for (let i = 0; i < upgradeList.length; i++) {
    const upgradeButton = document.createElement("button");
    upgradeButton.innerHTML = `${upgradeList[i].name} \n (${upgradeList[i].cost} piece(s) of cheese)`;
    upgradeButton.disabled = true;
    upgradeButton.addEventListener("click", () => {
      getUpgrade(upgradeList, i);
    });
    app.append(upgradeButton);
  }
}

function updateUpgradeText(
  button: HTMLButtonElement,
  upgradeList: Upgrade[],
  index: number,
) {
  button.innerHTML = `${upgradeList[index].name} \n (${upgradeList[index].cost.toFixed(2)} piece(s) of cheese)`;
}

function displayTotal() {
  counterValue.innerHTML = `${count.toFixed()} piece(s) of cheese stolen`;
  growthValue.innerHTML = `${growthRate.toFixed(1)} piece(s) of cheese/sec`;
  canUpgrade(upgradeList);
}

function displayStatus() {
  purchaseValue.innerHTML = `Big pair of sneakers: ${purchaseList[0].purchaseCount} <br> Mousetrap tamperers: ${purchaseList[1].purchaseCount} <br> Mechanical Mice: ${purchaseList[2].purchaseCount}`;
}

function incrementCounter() {
  count += 1;
  displayTotal();
  displayStatus();
}

function growCounter() {
  const currentTime: number = performance.now();
  const timeDifference: number = (currentTime - previousTime) / 1000;

  //worked with CJ Moshy to get the growth code
  if (timeDifference > 1) {
    count += growthRate;
    displayTotal();
    previousTime = currentTime;
  }
  requestAnimationFrame(growCounter);
}

function getUpgrade(upgradeList: Upgrade[], index: number) {
  if (count >= upgradeList[index].cost) {
    count -= upgradeList[index].cost;
    growthRate += upgradeList[index].units;
    upgradeList[index].cost = upgradeList[index].cost * 1.15;
    purchaseList[index].purchaseCount += 1;
    displayTotal();
    displayStatus();
    requestAnimationFrame(growCounter);
  }
}

function canUpgrade(upgradeList: Upgrade[]) {
  for (let i = 0; i < upgradeList.length; i++) {
    const upgradeButton = app.querySelectorAll("button")[1 + i];
    upgradeButton.disabled = count < upgradeList[i].cost;
    updateUpgradeText(upgradeButton, upgradeList, i);
  }
}
