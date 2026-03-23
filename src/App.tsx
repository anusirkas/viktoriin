import { useState } from "react";
import { questions } from "./data/questions";
import QuestionCard from "./components/QuestionCard";
import ResultsTable from "./components/ResultsTable";
import logo from "./assets/logo.png";
import './App.css'

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswer = (answer: string) => {
    const isCorrect =
      answer === questions[currentQuestion].correctAnswer;

    const result = {
      question: questions[currentQuestion].question,
      selectedAnswer: answer,
      isCorrect: isCorrect,
    };

    setResults([...results, result]);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setResults([]);
    setQuizFinished(false);
  };


  return (
    <div className="container">
      <header>
        <img src={logo} alt="Statistikaamet logo" className="logo" />
        <h1>Viktoriin</h1>
      </header>

      {!quizFinished ? (
        <>
          <p>
            Küsimus {currentQuestion + 1} / {questions.length}
          </p>

          <div className="progress-bar">
            <div
              className="progress"
              style={{
                width: `${(currentQuestion / questions.length) * 100}%`,
              }}
            ></div>
          </div>

          <QuestionCard
            question={questions[currentQuestion]}
            onAnswer={handleAnswer}
          />
        </>
      ) : (
        <>
          <h2>
            Skoor: {results.filter((r) => r.isCorrect).length} / {results.length}
          </h2>

          <ResultsTable results={results} />

          <button onClick={restartQuiz}>Alusta uuesti</button>
        </>
      )}
    </div>
  );
}

export default App;