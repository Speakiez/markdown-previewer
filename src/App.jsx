import { useState, useEffect } from "react"
import { marked } from "marked"
import hljs from 'highlight.js';

marked.use({
  breaks: true
});

function Editor({ handleChange, userInput }) {
  useEffect(() => {
    const elementWrapper = document.getElementById("editor-wrapper");
    const elementHeader = document.getElementById("editor-header");

    let 
    initialX = 0,
    initialY = 0,
    newX = 0,
    newY = 0;

    function makeElementDraggable(element, header) {
      header.onmousedown = mouseDownOnElement;

      function mouseDownOnElement(event) {
        initialX = event.clientX;
        initialY = event.clientY;

        document.onmousemove = dragElement;
        document.onmouseup = stopDragElement;
      }

      function dragElement(event) {
        newX = initialX - event.clientX;
        newY = initialY - event.clientY;
        initialX = event.clientX;
        initialY = event.clientY;
        
        element.style.left = (element.offsetLeft - newX) + "px";
        element.style.top = (element.offsetTop - newY) + "px";
      }

      function stopDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }

    makeElementDraggable(elementWrapper, elementHeader);
  });

  return (
    <>
      <div id="editor-wrapper">
        <header id="editor-header">
          <span>Editor</span>
        </header>
        <textarea id="editor" onChange={handleChange} value={userInput}></textarea>
      </div>
    </>
  );
}

function Previewer({ userInput }) {
  useEffect(() => {
    const elementWrapper = document.getElementById("preview-wrapper");
    const elementHeader = document.getElementById("preview-header");

    let 
    initialX = 0,
    initialY = 0,
    newX = 0,
    newY = 0;

    function makeElementDraggable(element, header) {
      header.onmousedown = mouseDownOnElement;

      function mouseDownOnElement(event) {
        initialX = event.clientX;
        initialY = event.clientY;

        document.onmousemove = dragElement;
        document.onmouseup = stopDragElement;
      }

      function dragElement(event) {
        newX = initialX - event.clientX;
        newY = initialY - event.clientY;
        initialX = event.clientX;
        initialY = event.clientY;

        element.style.left = (element.offsetLeft - newX) + "px";
        element.style.top = (element.offsetTop - newY) + "px";
      }

      function stopDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }

    makeElementDraggable(elementWrapper, elementHeader);
  });

  useEffect(() => {
    document.getElementById("preview").innerHTML = marked.parse(userInput);
    hljs.highlightAll();
  });

  return (
    <>
      <div id="preview-wrapper">
        <header id="preview-header">
          <span>Previewer</span>
        </header>
        <div id="preview"></div>
      </div>
    </>
  );
}

export default function App() {
  const [userInput, setUserInput] = useState(initialText);
  const handleChange = (event) => setUserInput(event.target.value);

  return (
    <>
      <Editor handleChange={handleChange} userInput={userInput}/>
      <Previewer userInput={userInput}/>
      <div id="credits">
        Markdown Previewer
        <br />
        <a id="credits-link" href="https://github.com/Speakiez" target="_blank">Made by Speakiez</a>
      </div>
    </>
  )
}

const initialText = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)

`;