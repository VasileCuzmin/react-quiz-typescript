import React from "react";

interface AnswerProps {
  answer: string;
  onSelectAnswer: (answer: string) => void;
  index: number;
  currentAnswer: string;
  correctAnswer: string;
}

const Answer: React.FC<AnswerProps> = ({
  answer,
  onSelectAnswer,
  index,
  currentAnswer,
  correctAnswer,
}) => {
  const letterMapping = ["A", "B", "C", "D"];

  const isCorrectAnswer = currentAnswer && answer === correctAnswer;
  const isWrongAnswer =
    currentAnswer === answer && currentAnswer !== correctAnswer;
  const correntAnswerClass = isCorrectAnswer ? "correct-answer" : "";
  const wrongAnswerClass = isWrongAnswer ? "wrong-answer" : "";
  const disabledClass = currentAnswer ? "disabled-answer" : "";

  return (
    <div
      className={`answer ${correntAnswerClass}  ${wrongAnswerClass} ${disabledClass}`}
      onClick={() => onSelectAnswer(answer)}
    >
      <div className="answer-letter">{letterMapping[index]}</div>
      <div className="answer-text">{answer}</div>
    </div>
  );
};

export default Answer;
