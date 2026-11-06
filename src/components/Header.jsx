import Button from "./Button";
import "../header.css";

export default function Header({ setIsFrontpageShown }) {
  const startQuiz = () => setIsFrontpageShown(false);

  return (
    <header>
      <h1>Quizzical</h1>
      <p>Some description if needed</p>
      <Button handleClick={startQuiz}>Start quiz</Button>
    </header>
  );
}
