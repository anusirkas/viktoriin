import { useState, useEffect } from "react";
import type { Question } from "../types/QuizTypes";

type Props = {
  question: Question;
  onAnswer: (answer: string) => void;
};

function QuestionCard({ question, onAnswer }: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    if (showFeedback) return;

    if (timeLeft === 0) {
      setShowFeedback(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, showFeedback]);

  const handleClick = (option: string) => {
    if (selectedAnswer || showFeedback) return;
    setSelectedAnswer(option);
    setShowFeedback(true);
  };

  const handleNext = () => {
    onAnswer(selectedAnswer || "");
    setSelectedAnswer(null);
    setShowFeedback(false);
    setTimeLeft(20);
  };

  const getButtonStyle = (option: string) => {
    if (!showFeedback) return {};

    if (option === question.correctAnswer) {
      return { backgroundColor: "green" };
    }

    if (option === selectedAnswer) {
      return { backgroundColor: "red" };
    }

    return { backgroundColor: "#ccc" };
  };

  return (
    <div className="question-card">
      <h2>{question.question}</h2>

      <p>Aega jäänud: {timeLeft} s</p>

      <div>
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => handleClick(option)}
            disabled={showFeedback}
            style={getButtonStyle(option)}
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