import "./index.css";
import "./index.less";

function appendPElement() {
  var p = document.createElement("p");
  p.innerText = "bbbb";
  p.classList.add("p-background");
  document.body.appendChild(p);
}

appendPElement();

function appendDivElement() {
  var div = document.createElement("div");
  div.classList.add("div-class");
  document.body.appendChild(div);
}
appendDivElement();