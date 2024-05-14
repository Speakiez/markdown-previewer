import { useEffect } from "react"
import { marked } from "marked"

export default function App() {

  useEffect(() => {
    document.getElementById("preview").innerHTML = marked.parse("# Markup Previewer");
  });

  return (
    <>
      <div id="preview"></div>
    </>
  )
}