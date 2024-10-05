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
button.addEventListener("click", () => {
  counter += 1;
  counterValue.innerHTML = `${counter} pieces of cheese stolen`;
});

app.append(button);
app.append(counterValue);
