import "./index.css";
import "./index.less";

function appendHtmlElement() {
  var p = document.createElement("p");
  p.innerText = "bbbb";
  p.classList.add("p-background");
  document.body.appendChild(p);
}

const f = () => {
  console.log("log"); 
};

appendHtmlElement();
f();
