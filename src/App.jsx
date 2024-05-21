import { useState } from "react"
import { useEffect } from "react"
import { marked } from "marked"

marked.use({
  breaks: true
});

const defaultMarkup = 
`
# Welcome to my React Markdown Previewer!
## This is a sub-heading...
### And here's some other cool stuff:
`;

export default function App() {
  const [userInput, setUserInput] = useState(defaultMarkup);

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