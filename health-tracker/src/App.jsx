import { useState, useEffect } from "react";
import HabitCard from "./HabitCard";
import ProgressChart from "./ProgressChart";
import { Switch } from "@radix-ui/react-switch";
import "./index.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [habits, setHabits] = useState({
    water: 0,
    sleep: 0,
    workouts: 0,
    meditation: 0,
    healthyEating: 0,
    reading: 0,
    screenTime: 0,
  });
  
  const [data, setData] = useState([]);
  const [reminders, setReminders] = useState({
    water: "", sleep: "", workouts: "", meditation: "", healthyEating: "", reading: "", screenTime: ""
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("healthData")) || [];
    setData(storedData);
  }, []);

  useEffect(() => {
    localStorage.setItem("healthData", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [darkMode]);

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

  const logHabit = (type) => {
    setHabits((prev) => {
      const updatedHabits = { ...prev, [type]: prev[type] + 1 };
  
      const newEntry = {
        date: new Date().toLocaleDateString(),
        ...updatedHabits
      };
  
      setData((prevData) => [...prevData, newEntry]); // Append new data without removing previous ones
  
      return updatedHabits;
    });
  };
  

  return (
    <div className="app-container">
      <div className="tracker-container">
        <div className="header">
          <h1>Daily Health & Wellness Tracker</h1>
          <div className="toggle-container">
            <span>Dark Mode</span>
            <Switch checked={darkMode} onCheckedChange={() => setDarkMode(!darkMode)} />
          </div>
        </div>
        
        <div className="habit-grid">
          {Object.keys(habits).map((habit) => (
            <HabitCard key={habit} habit={habit} count={habits[habit]} onLog={() => logHabit(habit)} />
          ))}
        </div>
        
        <div className="progress-section">
          <ProgressChart data={data} habits={Object.keys(habits)} />
        </div>
        
        <div className="reminder-section">
          <h2>Set Reminders</h2>
          {Object.keys(reminders).map((habit) => (
            <div key={habit} className="reminder-input">
              <label>Set reminder for {habit}:</label>
              <input
                type="datetime-local"
                value={reminders[habit]}
                onChange={(e) => setReminders((prev) => ({ ...prev, [habit]: e.target.value }))}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
