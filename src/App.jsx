import { useState } from "react"
import { useEffect } from "react"
import { marked } from "marked"

marked.use({
  breaks: true
});

export default function App() {
  const [userInput, setUserInput] = useState("# Markup Previewer");

  const handleChange = (event) => setUserInput(event.target.value);

  useEffect(() => {
    document.getElementById("preview").innerHTML = marked.parse(userInput);
  });

  return (
    <>
      <textarea id="editor" onChange={handleChange}>{userInput}</textarea>
      <div id="preview"></div>
    </>
  )
}