import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const counterValue: HTMLDivElement = document.querySelector("#counterValue")!;
let previousTime: number = performance.now();
//growth rate of the counter that goes up as it continues
let growthRate: number = 0; 
let count: number = 0;

const gameName = "My clicking game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//button code pulled from the lecture on 10/02/24 and mdn docs for addEventListener
const button = document.createElement("button");
button.innerHTML = "🪤";
button.addEventListener("click", incrementCounter);
app.append(button);

//button that upgrades with the increasing growth rate each purchase. 
const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "Purchase an Upgrade"
upgradeButton.disabled = true;
upgradeButton.addEventListener("click", getUpgrade);
app.append(upgradeButton); 

app.append(counterValue);

function displayTotal(){
  counterValue.innerHTML = `${count} pieces of cheese stolen`;
}


function incrementCounter() {
  count += 1;
  canUpgradeButton(); 
  displayTotal(); 
}

function growCounter() {
  const currentTime: number = performance.now();
  const timeDifference: number = (currentTime - previousTime) / 1000;

  //worked with CJ Moshy to get the growth code 
  if (timeDifference > 1) {
    count += growthRate;
    displayTotal();
    canUpgradeButton();
    previousTime = currentTime;
  }
  requestAnimationFrame(growCounter);
}

function getUpgrade() {
  if(count >= 10){
    count -= 10; 
    growthRate += 1;
    canUpgradeButton();
    requestAnimationFrame(growCounter);
  }
}

function canUpgradeButton(){
  if(count < 10){
    upgradeButton.disabled = true; 
  }
  else{
    upgradeButton.disabled = false; 
  }
}

