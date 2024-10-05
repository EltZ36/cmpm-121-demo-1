import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My clicking game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//button code pulled from the lecture on 10/02/24
const button = document.createElement('button');
button.innerHTML = "🪤"
app.append(button)



