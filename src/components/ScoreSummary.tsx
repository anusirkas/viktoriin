type Props = {
  score: number;
  totalQuestions: number;
};

function ScoreSummary({ score, totalQuestions }: Props) {
  const getSummaryMessage = () => {
    if (score === totalQuestions) {
      return "Suurepärane tulemus — kõik vastused olid õiged.";
    }

    if (score >= Math.ceil(totalQuestions / 2)) {
      return "Tubli tulemus — enamik vastuseid olid õiged.";
    }

    return "Hea algus — proovi uuesti ja paranda tulemust.";
  };

  return (
    <section className="score-summary">
      <p className="summary-label">Lõpptulemus</p>
      <h2 className="score-title">
        {score} / {totalQuestions}
      </h2>
      <p className="summary-message">{getSummaryMessage()}</p>
    </section>
  );
}

export default ScoreSummary;