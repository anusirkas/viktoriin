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
    setSelectedAnswer(null);
    setShowFeedback(false);
    setTimeLeft(QUESTION_TIME);
  }, [question]);

  useEffect(() => {
    if (showFeedback) return;
    if (timeLeft <= 0) {
      setShowFeedback(true);
      return;
    }

    const timer = window.setTimeout(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [timeLeft, showFeedback]);

  const isTimedOut = showFeedback && selectedAnswer === null;
  const isCorrect = selectedAnswer === question.correctAnswer;

  const feedbackTitle = useMemo(() => {
    if (isTimedOut) return "Aeg sai otsa";
    if (isCorrect) return "Õige vastus!";
    return "Vale vastus!";
  }, [isTimedOut, isCorrect]);

  const feedbackDescription = useMemo(() => {
    if (isCorrect) return "Tubli! Võid liikuda järgmise küsimuse juurde.";
    return `Õige vastus oli: ${question.correctAnswer}`;
  }, [isCorrect, question.correctAnswer]);

  const feedbackClassName = isCorrect ? "correct" : "incorrect";

  const handleSelectAnswer = (option: string) => {
    if (showFeedback) return;
    setSelectedAnswer(option);
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    onAnswer(selectedAnswer ?? "");
  };

  const getOptionClassName = (option: string) => {
    const classes = ["option-button"];

    if (!showFeedback) {
      return classes.join(" ");
    }

    if (option === question.correctAnswer) {
      classes.push("correct");
    } else if (option === selectedAnswer) {
      classes.push("incorrect");
    } else {
      classes.push("muted");
    }

    return classes.join(" ");
  };

  return (
    <section className="question-card" aria-live="polite">
      <div className="question-meta">
        <span
          className={`timer-badge ${timeLeft <= 5 ? "warning" : ""}`}
          aria-label={`Aega jäänud ${timeLeft} sekundit`}
        >
          {timeLeft}s
        </span>
      </div>

      <h2>{question.question}</h2>

      <div className="options-list" role="list" aria-label="Vastusevariandid">
        {question.options.map((option, index) => (
          <button
            key={option}
            type="button"
            className={getOptionClassName(option)}
            onClick={() => handleSelectAnswer(option)}
            disabled={showFeedback}
            aria-label={`Vastus ${String.fromCharCode(65 + index)}: ${option}`}
          >
            <span className="option-letter" aria-hidden="true">
              {String.fromCharCode(65 + index)}
            </span>

            <span className="option-text">{option}</span>
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className={`feedback-box ${feedbackClassName}`} role="status">
          <p className="feedback-title">{feedbackTitle}</p>
          <p className="feedback-detail">{feedbackDescription}</p>

          <button
            type="button"
            className="primary-button next-button"
            onClick={handleNextQuestion}
            aria-label="Mine järgmise küsimuse juurde"
          >
            Järgmine küsimus
          </button>
        </div>
      )}
    </section>
  );
}

export default QuestionCard;