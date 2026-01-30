import { useState, useEffect } from "react";
import HabitCard from "./HabitCard";
import ProgressChart from "./ProgressChart";
import ResetButton from "./ResetButton";
import { Switch } from "@radix-ui/react-switch";
import "./index.css";

const App = () => {
  // 🌙 Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // 🧘 Habit counts
  const [habits, setHabits] = useState({
    water: 0,
    sleep: 0,
    workouts: 0,
    meditation: 0,
    healthyEating: 0,
    reading: 0,
    screenTime: 0,
  });

  // 📊 Chart data
  const [data, setData] = useState([]);

  // ⏰ Reminders
  const [reminders, setReminders] = useState({
    water: "",
    sleep: "",
    workouts: "",
    meditation: "",
    healthyEating: "",
    reading: "",
    screenTime: "",
  });

  // 🔹 Load chart data from localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("healthData")) || [];
    setData(storedData);
  }, []);

  // 🔹 Save chart data to localStorage
  useEffect(() => {
    localStorage.setItem("healthData", JSON.stringify(data));
  }, [data]);

  // 🌙 Dark mode effect
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [darkMode]);

  // ⏰ Reminder alerts
  useEffect(() => {
    Object.keys(reminders).forEach((habit) => {
      if (reminders[habit]) {
        const reminderTime = new Date(reminders[habit]).getTime();
        const now = new Date().getTime();
        const delay = reminderTime - now;

        if (delay > 0) {
          setTimeout(() => {
            alert(`Reminder: Time to log your ${habit}!`);
          }, delay);
        }
      }
    });
  }, [reminders]);

  // ➕ Log habit
  const logHabit = (type) => {
    const today = new Date().toLocaleDateString();

    setHabits((prev) => {
      const updatedHabits = { ...prev, [type]: prev[type] + 1 };

      setData((prevData) => {
        const existingIndex = prevData.findIndex(
          (entry) => entry.date === today
        );

        if (existingIndex !== -1) {
          const updatedData = [...prevData];
          updatedData[existingIndex] = {
            date: today,
            ...updatedHabits,
          };
          return updatedData;
        }

        return [...prevData, { date: today, ...updatedHabits }];
      });

      return updatedHabits;
    });
  };

  // 🔄 Reset habits
  const resetHabits = () => {
    const resetData = Object.keys(habits).reduce((acc, habit) => {
      acc[habit] = 0;
      return acc;
    }, {});

    setHabits(resetData);
  };

  return (
    <div className="app-container">
      <div className="tracker-container">
        {/* Header */}
        <div className="header">
          <h1>Daily Health & Wellness Tracker</h1>
          <div className="toggle-container">
            <span>Dark Mode</span>
            <Switch
              checked={darkMode}
              onCheckedChange={() => setDarkMode(!darkMode)}
            />
          </div>
        </div>

        {/* Habit cards */}
        <div className="habit-grid">
          {Object.keys(habits).map((habit) => (
            <HabitCard
              key={habit}
              habit={habit}
              count={habits[habit]}
              onLog={() => logHabit(habit)}
            />
          ))}
        </div>

        {/* Reset button */}
        <ResetButton onReset={resetHabits} />

        {/* Chart */}
        <div className="progress-section">
          <ProgressChart data={data} habits={Object.keys(habits)} />
        </div>

        {/* Reminders */}
        <div className="reminder-section">
          <h2>Set Reminders</h2>
          {Object.keys(reminders).map((habit) => (
            <div key={habit} className="reminder-input">
              <label>Set reminder for {habit}:</label>
              <input
                type="datetime-local"
                value={reminders[habit]}
                onChange={(e) =>
                  setReminders((prev) => ({
                    ...prev,
                    [habit]: e.target.value,
                  }))
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
