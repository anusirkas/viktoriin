import { useState } from "react";
import { questions } from "./data/questions";
import QuestionCard from "./components/QuestionCard";
import ResultsTable from "./components/ResultsTable";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswer = (answer: string) => {
    const isCorrect = answer === questions[currentQuestion].correctAnswer;

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

  return (
    <div>
      <h1>Viktoriin</h1>

      {!quizFinished ? (
        <QuestionCard
          question={questions[currentQuestion]}
          onAnswer={handleAnswer}
        />
      ) : (
        <ResultsTable results={results} />
      )}
    </div>
  );
}

export default App;