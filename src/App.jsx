import Header from "./components/Header";
import Quiz from "./components/Quiz";
import { useState } from "react";

export default function App() {
  const [isFrontpageShown, setIsFrontpageShown] = useState(true);

  return (
    <main>
      {isFrontpageShown ? <Header setIsFrontpageShown={setIsFrontpageShown} /> : <Quiz />}
    </main>
  );
}
