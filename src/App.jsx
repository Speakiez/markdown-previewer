import { useEffect } from "react"
import { marked } from "marked"

export default function App() {

  useEffect(() => {
    document.getElementById("preview").innerHTML = marked.parse("# Markup Previewer");
  });

  return (
    <>
      <textarea id="editor"></textarea>
      <div id="preview"></div>
    </>
  )
}