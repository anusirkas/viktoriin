import type { Result } from "../types/QuizTypes";

type Props = {
  results: Result[];
};

function ResultsTable({ results }: Props) {
  return (
    <section className="results-section">
      <h3 className="results-title">Tulemuste ülevaade</h3>

      <div className="results-table-wrapper">
        <table className="results-table">
          <thead>
            <tr>
              <th>Küsimus</th>
              <th>Sinu vastus</th>
              <th>Tulemus</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => {
              const isUnanswered =
                !result.selectedAnswer ||
                result.selectedAnswer === "Vastus jäi valimata";

              const badgeClassName = isUnanswered
                ? "result-badge unanswered"
                : result.isCorrect
                  ? "result-badge correct"
                  : "result-badge incorrect";

              const badgeLabel = isUnanswered
                ? "Vastamata"
                : result.isCorrect
                  ? "Õige"
                  : "Vale";

              return (
                <tr key={`${result.question}-${index}`}>
                  <td>{result.question}</td>
                  <td>{result.selectedAnswer || "Vastus jäi valimata"}</td>
                  <td>
                    <span className={badgeClassName}>{badgeLabel}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ResultsTable;