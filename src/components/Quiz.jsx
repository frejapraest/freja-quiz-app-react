import { useEffect, useState } from "react";

import "../quiz.css";
import Question from "./Question";
import Button from "./Button";

export default function Quiz() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [isAnswersShown, setIsAnswersShown] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  function handleShowCorrectAnswers() {
    setIsAnswersShown(true);
  }

  function replayGame() {
    setAllQuestions([]);
    setIsAnswersShown(false);
    setCorrectAnswersCount(0);
  }

  useEffect(() => {
    if (allQuestions && !allQuestions.length) {
      async function callApi() {
        try {
          const response = await fetch(
            "https://opentdb.com/api.php?amount=5&category=9&type=multiple",
          );
          const data = await response.json();
          setAllQuestions(data.results);
        } catch (error) {
          console.log(error);
        }
      }

      callApi();
    }
  }, [allQuestions]);

  const allQuestionsArr = allQuestions ? (
    allQuestions.map((question, questionIndex) => {
      return (
        <Question
          key={questionIndex}
          question={question}
          questionIndex={questionIndex}
          isAnswersShown={isAnswersShown}
          setCorrectAnswersCount={setCorrectAnswersCount}
        />
      );
    })
  ) : (
    <div className="refresh-game-container">
      <div>
        <h2>Something went wrong.</h2>
        <h2>Please refresh game.</h2>
      </div>
      <Button className="refresh-game" handleClick={replayGame}>
        Refresh game
      </Button>
    </div>
  );

  return (
    <>
      <div className="questions-container">{allQuestionsArr}</div>
      <div className="show-correct-answer-container">
        {isAnswersShown && (
          <h2 className="correct-answers">You scored {correctAnswersCount}/5 correct answers</h2>
        )}
        {allQuestions ? (
          <Button
            handleClick={isAnswersShown ? replayGame : handleShowCorrectAnswers}
            className="check-answers-btn"
          >
            {isAnswersShown ? "Play again" : "Check answers"}
          </Button>
        ) : null}
      </div>
    </>
  );
}
