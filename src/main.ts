import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const counterValue: HTMLDivElement = document.querySelector("#counterValue")!;
let previousTime: number = performance.now();

const gameName = "My clicking game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//button code pulled from the lecture on 10/02/24 and mdn docs for addEventListener
let counter: number = 0;
const button = document.createElement("button");
button.innerHTML = "🪤";

function incrementCounter() {
  counter += 1;
  counterValue.innerHTML = `${counter.toFixed()} pieces of cheese stolen`;
}

function growCounter() {
  const currentTime: number = performance.now();
  const timeDifference: number = (currentTime - previousTime) / 1000;

  //worked with CJ Moshy to get the growth code 
  if (timeDifference > 1) {
    counter += 1;
    counterValue.innerHTML = `${counter} pieces of cheese stolen`;
    previousTime = currentTime;
  }
  requestAnimationFrame(growCounter);
}

button.addEventListener("click", incrementCounter);
requestAnimationFrame(growCounter);

app.append(button);
app.append(counterValue);
