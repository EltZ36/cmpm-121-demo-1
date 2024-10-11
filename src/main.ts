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

app.append(image);

//button code pulled from the lecture on 10/02/24 and mdn docs for addEventListener
const clicker = document.createElement("button");
clicker.innerHTML = "🪤 <- Steal Da Cheez";
clicker.addEventListener("click", incrementCounter);
clicker.id = "clickerButton";
app.append(clicker);

interface Item {
  name: string;
  cost: number;
  units: number;
}

const availableItems: Item[] = [
  { name: "Big pair of Sneakers", cost: 10, units: 0.1 },
  { name: "Mousetrap Tamperers", cost: 100, units: 2},
  { name: "Mechanical Mice", cost: 1000, units: 50 },
];

interface Purchase {
  name: string;
  purchaseCount: number;
}

const purchaseList: Purchase[] = availableItems.map((item) => ({
  name: item.name,
  purchaseCount: 0,
}));

app.append(counterValue, growthValue, purchaseValue);

createUpgradeButtons();

//makes the upgrade buttons form the upgrade list
function createUpgradeButtons() {
  availableItems.forEach((item, index) => {
    const upgradeButton = document.createElement("button");
    upgradeButton.innerHTML = `${item.name} \n (${item.cost.toFixed(2)} piece(s) of cheese)`;
    upgradeButton.disabled = true;
    upgradeButton.addEventListener("click", () => getUpgrade(index));
    app.append(upgradeButton);
  });
}

function updateUpgradeText(button: HTMLButtonElement, item: Item) {
  button.innerHTML = `${item.name} \n (${item.cost.toFixed(2)} piece(s) of cheese)`;
}

function displayTotal() {
  counterValue.innerHTML = `${count.toFixed()} piece(s) of cheese stolen`;
  growthValue.innerHTML = `${growthRate.toFixed(1)} piece(s) of cheese/sec`;
  canUpgrade();
}

function displayStatus() {
  purchaseValue.innerHTML = availableItems
    .map((item, index) => `${item.name}: ${purchaseList[index].purchaseCount}`)
    .join("<br>");
}

function incrementCounter() {
  count += 1;
  displayTotal();
  displayStatus();
}

function growCounter() {
  const currentTime: number = performance.now();
  const timeDifference: number = (currentTime - previousTime) / 1000;

  if (timeDifference > 1) {
    count += growthRate;
    displayTotal();
    previousTime = currentTime;
  }
  requestAnimationFrame(growCounter);
}

function getUpgrade(index: number) {
  //worked with CJ Moshy to get the growth code
  const item = availableItems[index];
  if (count >= item.cost) {
    count -= item.cost;
    growthRate += item.units;
    item.cost *= 1.15;
    purchaseList[index].purchaseCount += 1;
    displayTotal();
    displayStatus();
    requestAnimationFrame(growCounter);
  }
}

function canUpgrade() {
  app.querySelectorAll<HTMLButtonElement>("button").forEach((button, index) => {
    if (index > 0 && index <= availableItems.length) {
      const item = availableItems[index - 1]; // Adjust index to skip clicker button
      button.disabled = count < item.cost;
      updateUpgradeText(button, item);
    }
  });
}
