type Props = {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
  onRestart: () => void;
};

function QuizTopBar({
  currentQuestion,
  totalQuestions,
  score,
  onRestart,
}: Props) {
  return (
    <div className="quiz-topbar">
      <span className="question-counter">
        Küsimus {currentQuestion} / {totalQuestions}
      </span>

      <span className="live-score" aria-label={`Praegune skoor ${score}`}>
        Skoor: {score}
      </span>

      <button
        type="button"
        className="ghost-button"
        onClick={onRestart}
        aria-label="Alusta viktoriini uuesti"
      >
        Alusta uuesti
      </button>
    </div>
  );
}

export default QuizTopBar;