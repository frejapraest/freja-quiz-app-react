import { decode } from "html-entities";
import { useState, useEffect } from "react";
import { shuffleArray } from "../shuffleArray.js";
import clsx from "clsx";
import "../question.css";

export default function Question({
  question,
  questionIndex,
  isAnswersShown,
  setCorrectAnswersCount,
}) {
  const [clickedBtn, setClickedBtn] = useState({});
  const [answersArray] = useState(
    shuffleArray([question.correct_answer, ...question.incorrect_answers]),
  );

  const handleBtnClick = (event) => {
    setClickedBtn(() => {
      return {
        buttonId: event.target.id,
        buttonText: event.target.innerText,
      };
    });
  };

  const answerBtn = answersArray.map((answer, answerIndex) => {
    const id = `${questionIndex}-${answerIndex}`;

    const style = clsx("answer-btn", {
      "answer-btn-clicked answer-btn": clickedBtn.buttonId === id,
      "correct-answer": isAnswersShown && answer === question.correct_answer,
      "wrong-answer":
        isAnswersShown && answer !== question.correct_answer && clickedBtn.buttonId === id,
      "wrong-answers-not-chosen": isAnswersShown && answer !== question.correct_answer,
    });

    return (
      <button disabled={isAnswersShown} id={id} className={style} key={answerIndex}>
        {decode(answer)}
      </button>
    );
  });

  useEffect(() => {
    if (clickedBtn.buttonText === question.correct_answer && isAnswersShown) {
      setCorrectAnswersCount((prevCount) => {
        return prevCount + 1;
      });
    }
  }, [isAnswersShown, setCorrectAnswersCount, question.correct_answer, clickedBtn.buttonText]);

  return (
    <section>
      <h2>{decode(question.question)}</h2>
      <div className="answer-options-container" onClick={handleBtnClick}>
        {answerBtn}
      </div>
      <hr />
    </section>
  );
}
