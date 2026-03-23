import type { Result } from "../types/QuizTypes";

type Props = {
  results: Result[];
};

function ResultsTable({ results }: Props) {
  const score = results.filter((r) => r.isCorrect).length;

  return (
    <div>
      <h2>Tulemused</h2>

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Küsimus</th>
            <th>Sinu vastus</th>
            <th>Tulemus</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.question}</td>
              <td>{result.selectedAnswer}</td>
              <td>{result.isCorrect ? "Õige" : "Vale"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>
        Skoor: {score} / {results.length}
      </h3>

      <PersonalMessage score={score} total={results.length} />
    </div>
  );
}

function PersonalMessage({ score, total }: { score: number; total: number }) {
  if (score === total)
    return <p>Suurepärane! Vastasin kõik õigesti.</p>;

  if (score >= total / 2)
    return <p>Hea tulemus! Mõned vead, aga tubli.</p>;

  return <p>Proovi uuesti ja paranda tulemust!</p>;
}

export default ResultsTable;