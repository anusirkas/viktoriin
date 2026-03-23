import { useEffect, useMemo, useState } from "react";
import type { Question } from "../types/QuizTypes";

type Props = {
  question: Question;
  onAnswer: (answer: string) => void;
};

const QUESTION_TIME = 20;

function QuestionCard({ question, onAnswer }: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);

  useEffect(() => {
    if (showFeedback) return;

    if (timeLeft <= 0) {
      setShowFeedback(true);
      return;
    }

    const timer = window.setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [timeLeft, showFeedback]);

  const isCorrectAnswer = selectedAnswer === question.correctAnswer;
  const timedOut = showFeedback && selectedAnswer === null;

  const feedbackText = useMemo(() => {
    if (timedOut) {
      return "Aeg sai otsa.";
    }

    if (isCorrectAnswer) {
      return "Õige vastus!";
    }

    return "Vale vastus!";
  }, [isCorrectAnswer, timedOut]);

  const feedbackClassName = isCorrectAnswer ? "correct" : "incorrect";

  const handleSelectAnswer = (option: string) => {
    if (showFeedback) return;

    setSelectedAnswer(option);
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    onAnswer(selectedAnswer ?? "");
  };

  const getOptionClassName = (option: string) => {
    const classNames = ["option-button"];

    if (!showFeedback) return classNames.join(" ");

    if (option === question.correctAnswer) {
      classNames.push("correct");
    } else if (option === selectedAnswer) {
      classNames.push("incorrect");
    } else {
      classNames.push("muted");
    }

    return classNames.join(" ");
  };

  return (
    <div className="question-card">
      <div className="question-meta">
        <span className={`timer-badge ${timeLeft <= 5 ? "warning" : ""}`}>
          {timeLeft}s
        </span>
      </div>

      <h2>{question.question}</h2>

      <div className="options-list">
        {question.options.map((option, index) => (
          <button
            key={option}
            type="button"
            className={getOptionClassName(option)}
            onClick={() => handleSelectAnswer(option)}
            disabled={showFeedback}
          >
            <span className="option-letter">
              {String.fromCharCode(65 + index)}
            </span>
            <span className="option-text">{option}</span>
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className={`feedback-box ${feedbackClassName}`}>
          <p className="feedback-title">{feedbackText}</p>

          {!isCorrectAnswer && (
            <p className="feedback-detail">
              Õige vastus oli: <strong>{question.correctAnswer}</strong>
            </p>
          )}

          <button
            type="button"
            className="primary-button next-button"
            onClick={handleNextQuestion}
          >
            Järgmine küsimus
          </button>
        </div>
      )}
    </div>
  );
}

export default QuestionCard;