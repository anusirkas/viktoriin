import { useMemo, useState } from "react";
import "./App.css";
import logo from "./assets/logo.png";
import IntroCard from "./components/IntroCard";
import ProgressBar from "./components/ProgressBar";
import QuestionCard from "./components/QuestionCard";
import QuizTopBar from "./components/QuizTopBar";
import ResultsTable from "./components/ResultsTable";
import ScoreSummary from "./components/ScoreSummary";
import { questions } from "./data/questions";
import type { Result } from "./types/QuizTypes";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState<Result[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswer = (answer: string) => {
    const activeQuestion = questions[currentQuestion];
    const isCorrect = answer === activeQuestion.correctAnswer;

    const newResult: Result = {
      question: activeQuestion.question,
      selectedAnswer: answer,
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
    setQuizStarted(false);
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
            <h1>Viktoriin</h1>
          </header>

          {!quizStarted ? (
            <IntroCard onStart={() => setQuizStarted(true)} />
          ) : !quizFinished ? (
            <>
              <QuizTopBar
                currentQuestion={currentQuestion + 1}
                totalQuestions={questions.length}
                score={score}
                onRestart={restartQuiz}
              />

              <ProgressBar value={progressPercentage} />

              <QuestionCard
                key={currentQuestion}
                question={questions[currentQuestion]}
                onAnswer={handleAnswer}
              />
            </>
          ) : (
            <>
              <ScoreSummary
                score={score}
                totalQuestions={questions.length}
              />

              <ResultsTable results={results} />

              <button
                type="button"
                className="primary-button restart-button"
                onClick={restartQuiz}
              >
                Alusta uuesti
              </button>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;