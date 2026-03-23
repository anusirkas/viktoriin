type Props = {
  onStart: () => void;
};

function IntroCard({ onStart }: Props) {
  return (
    <section className="intro-card">
      <h2 className="intro-title">Kas oled valmis viktoriiniks?</h2>

      <div className="intro-rules">
        <div className="intro-rule">
          <span className="intro-rule-number">01</span>
          <p>Sind ootab ees 3 küsimust.</p>
        </div>

        <div className="intro-rule">
          <span className="intro-rule-number">02</span>
          <p>Iga küsimuse jaoks on aega 15 sekundit.</p>
        </div>

        <div className="intro-rule">
          <span className="intro-rule-number">03</span>
          <p>Pärast iga vastust saad kohe tagasisidet.</p>
        </div>
      </div>

      <div className="start-button-wrapper">
        <button
          type="button"
          className="primary-button start-button"
          onClick={onStart}
        >
          Alusta viktoriini
        </button>
      </div>
    </section>
  );
}

export default IntroCard;