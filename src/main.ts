import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const counterValue = createStyledElement<HTMLDivElement>("div", {
  id: "counterValue",
});
const growthValue = createStyledElement<HTMLDivElement>("div", {
  id: "growthValue",
});
const purchaseValue = createStyledElement<HTMLDivElement>("div", {
  id: "purchaseValue",
});

let previousTime: number = performance.now();
let count: number = 0;
let growthRate: number = 0;

const gameName = "Mousetrap Mastermind";
document.title = gameName;

const header = createStyledElement<HTMLHeadingElement>("h1", {
  innerHTML: gameName,
});
app.append(header);

const image = document.createElement("img");
//rat photo link https://pixabay.com/illustrations/mouse-rat-horse-riding-mouse-trap-1027582/
image.style.width = "320px";
image.style.height = "320px";
image.src =
  "https://cdn.pixabay.com/photo/2015/11/06/13/12/mouse-1027582_1280.jpg";
app.append(image);

//button code pulled from the lecture on 10/02/24 and mdn docs for addEventListener
const clicker = createStyledElement<HTMLButtonElement>("button", {
  innerHTML: "🪤 <- Steal Da Cheez",
});
clicker.addEventListener("click", incrementCounter);
clicker.id = "clickerButton";
app.append(clicker);

interface Item {
  name: string;
  cost: number;
  units: number;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "Some sneakers",
    cost: 10,
    units: 0.1,
    description: "Lets you be more silent and adds extra cool points",
  },
  {
    name: "A big stick",
    cost: 100,
    units: 2,
    description:
      "A crude stick that allows the trap to snap the stick and not your fingers",
  },
  {
    name: "Cheddar Chisel",
    cost: 1000,
    units: 50,
    description: "Lets you cut more pieces of cheese to sell (very legal)",
  },
  {
    name: "Mousetrap Tamperer",
    cost: 25000,
    units: 200,
    description: "Tampers with the mousetrap but with a 10% chance to fail",
  },
  {
    name: "Gouda Guard",
    cost: 55000,
    units: 550,
    description: "Protects you from mousetraps better than the tamperer.",
  },
  {
    name: "Mechanical Mice",
    cost: 2000000,
    units: 1000,
    description:
      "Mechanical mice to take the cheese and let you reap the rewards",
  },
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

function generateUpgradeButtonText(item: Item): string {
  return `${item.name} <br> Cost: (${item.cost.toFixed(2)} piece(s) of cheese)`;
}

//makes the upgrade buttons form the upgrade list
function createUpgradeButtons() {
  availableItems.forEach((item, index) => {
    const upgradeButton = document.createElement("button");
    //code for hover inspired by https://github.com/cheristic/cmpm-121-demo-1/blob/main/src/main.ts on lines 115 - 118 and 124 - 134
    const hoverDescription = document.createElement("div");
    hoverDescription.id = "hoverDescription";
    document.body.appendChild(hoverDescription);
    upgradeButton.innerHTML = generateUpgradeButtonText(item);
    upgradeButton.disabled = true;
    upgradeButton.addEventListener("click", () => {
      getUpgrade(index);
    });
    upgradeButton.addEventListener("mouseover", () => {
      hoverDescription.innerHTML = item.description;
      hoverDescription.style.visibility = "visible";
    });
    upgradeButton.addEventListener("mousemove", (e) => {
      hoverDescription.style.left = `${e.pageX + 40}px`;
      hoverDescription.style.top = `${e.pageY}px`;
    });
    upgradeButton.addEventListener("mouseout", () => {
      hoverDescription.style.visibility = "hidden";
    });
    app.append(upgradeButton);
  });
}

function updateUpgradeText(button: HTMLButtonElement, item: Item) {
  button.innerHTML = generateUpgradeButtonText(item);
}

function displayTotal() {
  counterValue.innerHTML = `${count.toFixed()} piece(s) of cheese stolen`;
  growthValue.innerHTML = `${growthRate.toFixed(1)} piece(s) of cheese/sec`;
  canUpgrade();
}

function displayStatus() {
  purchaseValue.innerHTML = generatePurchaseListText(
    availableItems,
    purchaseList,
  );
}

function formatPurchase(item: Item, purchaseCount: number): string {
  return `${item.name}: ${purchaseCount}`;
}

function generatePurchaseListText(
  availableItems: Item[],
  purchaseList: Purchase[],
): string {
  return availableItems
    .map((item, index) =>
      formatPurchase(item, purchaseList[index].purchaseCount),
    )
    .join("<br>");
}

function createStyledElement<T extends HTMLElement>(
  tagName: string,
  options: {
    id?: string;
    className?: string;
    innerHTML?: string;
    src?: string;
    style?: Partial<CSSStyleDeclaration>;
  } = {},
): T {
  const element = document.createElement(tagName) as T;

  if (options.id) element.id = options.id;
  if (options.className) element.className = options.className;
  if (options.innerHTML) element.innerHTML = options.innerHTML;
  if (options.src && tagName === "img")
    (element as unknown as HTMLImageElement).src = options.src;

  if (options.style) {
    Object.assign(element.style, options.style);
  }

  return element;
}

function incrementCounter() {
  count += 1;
  displayTotal();
  displayStatus();
  //this code was inspired by https://github.com/maozblan/cmpm-121-demo-1 lines 43 to 49 on main.ts
  const cheese = createStyledElement<HTMLImageElement>("img", {
    src: "assets/img/cheese.png",
    className: "cheese",
    style: {
      position: "absolute",
      left: `${clicker.getBoundingClientRect().left + window.scrollX + 10}px`,
      top: `${clicker.getBoundingClientRect().top + window.scrollY}px`,
    },
  });

  document.body.appendChild(cheese);
  requestAnimationFrame(() => {
    cheese.classList.add("buttonMovement");
  });
  setTimeout(() => {
    cheese.remove();
  }, 3000);
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
  const growthFactor: number = 1.15;
  if (count >= item.cost) {
    count -= item.cost;
    growthRate += item.units;
    item.cost *= growthFactor;
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
