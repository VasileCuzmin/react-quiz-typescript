import React from "react";
import Answer from "./Answer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { selectAnswer } from "../state/quizSlice";

const Question: React.FC = () => {
  const quizState = useSelector((state: RootState) => state.quiz);

  const dispatch = useDispatch();

  return (
    <div>
      <div className="question">
        {quizState.questions[quizState.currentQIndex].question}
      </div>
      <div className="answers"></div>
      {quizState.answers.map((item: string, index: number) => (
        <Answer
          answer={item}
          key={index}
          index={index}
          correctAnswer={
            quizState.questions[quizState.currentQIndex].correctAnswer
          }
          currentAnswer={quizState.currentAnswer}
          onSelectAnswer={(answer: string) => dispatch(selectAnswer(answer))}
        />
      ))}
    </div>
  );
};

export default Question;
