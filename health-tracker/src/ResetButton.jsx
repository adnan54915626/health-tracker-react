const ResetButton = ({ onReset }) => {
  return (
    <div className="reset-section">
      <button className="reset-btn" onClick={onReset}>
        Reset Today’s Habits
      </button>
    </div>
  );
};

export default ResetButton;
