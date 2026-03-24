type Props = {
  value: number;
};

function ProgressBar({ value }: Props) {
  return (
    <div
      className="progress-bar"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value)}
      aria-label="Viktoriini edenemine"
    >
      <div className="progress" style={{ width: `${value}%` }} />
    </div>
  );
}

export default ProgressBar;