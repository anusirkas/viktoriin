import { useMemo, useState } from "react";
import "./App.css";
import logo from "./assets/logo.png";
import QuestionCard from "./components/QuestionCard";
import ResultsTable from "./components/ResultsTable";
import { questions } from "./data/questions";
import type { Result } from "./types/QuizTypes";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState<Result[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswer = (answer: string) => {
    const activeQuestion = questions[currentQuestion];
    const isCorrect = answer === activeQuestion.correctAnswer;

    const newResult: Result = {
      question: activeQuestion.question,
      selectedAnswer: answer || "Vastus jäi valimata",
      isCorrect,
    };

    setResults((prevResults) => [...prevResults, newResult]);

    const isLastQuestion = currentQuestion === questions.length - 1;

    if (isLastQuestion) {
      setQuizFinished(true);
      return;
    }

    setCurrentQuestion((prev) => prev + 1);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setResults([]);
    setQuizFinished(false);
  };

  const score = useMemo(
    () => results.filter((result) => result.isCorrect).length,
    [results]
  );

  const progressPercentage = useMemo(() => {
    if (quizFinished) return 100;
    return ((currentQuestion + 1) / questions.length) * 100;
  }, [currentQuestion, quizFinished]);

  return (
    <div className="page-shell">
      <div className="dot-pattern" aria-hidden="true" />

      <main className="quiz-layout">
        <section className="quiz-card">
          <header className="quiz-header">
            <img src={logo} alt="Statistikaameti logo" className="logo" />
            <p className="eyebrow">Eesti statistika viktoriin</p>
            <h1>Viktoriin</h1>
            <p className="subtitle">
              Kontrolli oma teadmisi ja saa kohe tagasisidet.
            </p>
          </header>

          {!quizFinished ? (
            <>
              <div className="quiz-topbar">
                <span className="question-counter">
                  Küsimus {currentQuestion + 1} / {questions.length}
                </span>

                <button
                  type="button"
                  className="ghost-button"
                  onClick={restartQuiz}
                >
                  Alusta uuesti
                </button>
              </div>

              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progressPercentage)}
                aria-label="Viktoriini edenemine"
              >
                <div
                  className="progress"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              <QuestionCard
                key={currentQuestion}
                question={questions[currentQuestion]}
                onAnswer={handleAnswer}
              />
            </>
          ) : (
            <>
              <section className="score-summary">
                <p className="summary-label">Lõpptulemus</p>
                <h2 className="score-title">
                  {score} / {questions.length}
                </h2>
                <p className="summary-message">
                  {score === questions.length &&
                    "Suurepärane tulemus — kõik vastused olid õiged."}
                  {score < questions.length &&
                    score >= Math.ceil(questions.length / 2) &&
                    "Tubli tulemus — enamik vastuseid olid õiged."}
                  {score < Math.ceil(questions.length / 2) &&
                    "Hea algus — proovi uuesti ja paranda tulemust."}
                </p>
              </section>

              <ResultsTable results={results} />

              <button
                type="button"
                className="primary-button restart-button"
                onClick={restartQuiz}
              >
                Proovi uuesti
              </button>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;