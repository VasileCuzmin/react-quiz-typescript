import Question from "./Question";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { RootState } from "../store";
import {
  loadQuestions,
  nextQuestion,
  propagateError,
  restart,
} from "../state/quizSlice";

const Quiz: React.FC = () => {
  const apiUrl =
    "https://opentdb.com/api.php?amount=8&type=multiple&encode=url3986";

  const quizState = useSelector((state: RootState) => state.quiz);

  const dispatch = useDispatch();

  useEffect(() => {
    if (quizState.questions.length > 0 || quizState.error) {
      return;
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        dispatch(loadQuestions(data.results));
      })
      .catch((error) => {
        console.log(error);
        dispatch(propagateError(error.message));
      });
  });

  // useEffect(() => {
  //   fetch(apiUrl)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       dispatch(loadQuestions(data.results));
  //     });
  // }, []);

  const disabledNextButtonClass =
    quizState.currentAnswer === "" ? "disabled-div" : "";

  return (
    <div className="quiz">
      {quizState.showResults && (
        <div className="results">
          <div className="congratulations">Congratulations</div>
          <div className="results-info">
            <div>You have completed the quiz</div>
            <div>
              You've got {quizState.correctAnswersCount} of{" "}
              {quizState.questions.length}
            </div>
          </div>
          <div className="next-button" onClick={() => dispatch(restart())}>
            Restart
          </div>
        </div>
      )}
      {!quizState.showResults && quizState.questions.length > 0 && (
        <div>
          <div className="score">
            Question {quizState.currentQIndex + 1}/{quizState.questions.length}{" "}
          </div>
          <Question />
          <div
            className={`next-button ${disabledNextButtonClass}`}
            onClick={() => dispatch(nextQuestion())}
          >
            Next question{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
