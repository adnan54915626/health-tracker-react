const HabitCard = ({ habit, count, onLog }) => {
  return (
    <div className="habit-card">
      <h2 className="habit-title">{habit}</h2>
      <p className="habit-count">Count: {count}</p>
      <button className="log-button" onClick={onLog}>Log {habit}</button>
    </div>
  );
};

export default HabitCard;
