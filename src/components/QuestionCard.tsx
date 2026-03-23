import { useState } from "react";
import type { Question } from "../types/QuizTypes";

type Props = {
  question: Question;
  onAnswer: (answer: string) => void;
};

function QuestionCard({ question, onAnswer }: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleClick = (option: string) => {
    setSelectedAnswer(option);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      onAnswer(selectedAnswer);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  return (
    <div className="question-card">
      <h2>{question.question}</h2>

      <div>
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => handleClick(option)}
            style={{ display: "block", margin: "10px 0" }}
          >
            {option}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div>
          {selectedAnswer === question.correctAnswer ? (
            <p style={{ color: "green" }}>Õige vastus!</p>
          ) : (
            <p style={{ color: "red" }}>Vale vastus!</p>
          )}

          <button onClick={handleNext}>Järgmine küsimus</button>
        </div>
      )}
    </div>
  );
}

export default QuestionCard;