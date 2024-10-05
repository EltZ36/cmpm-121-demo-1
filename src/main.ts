import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const counterValue: HTMLDivElement = document.querySelector("#counterValue")!;

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
  counterValue.innerHTML = `${counter} pieces of cheese stolen`;
}

button.addEventListener("click", incrementCounter);

//do the incrementation and asked brace for an example of using setInterval 
setInterval(incrementCounter, 1000);

app.append(button);
app.append(counterValue);

