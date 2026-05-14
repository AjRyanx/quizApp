import { useState } from "react"
import { useQuiz } from "../context/QuizContext"

export default function HomeScreen() {
  const { state, dispatch } = useQuiz()
  const [name, setName] = useState(state.playerName)

  function handleStart() {
    dispatch({ type: "SET_PLAYER_NAME", name: name.trim() || "Anonymous" })
    dispatch({ type: "START_QUIZ" })
  }

  return (
    <div className="screen home-screen">
      <div className="home-content">
        <div className="football-icon">
          <span>&#9917;</span>
        </div>
        <h1 className="home-title">Football Quiz</h1>
        <p className="home-subtitle">
          Test your football knowledge! Answer 10 multiple-choice questions
          about the beautiful game.
        </p>
        <div className="name-input-group">
          <input
            className="name-input"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={20}
          />
        </div>
        <div className="home-rules">
          <div className="rule">
            <span className="rule-icon">&#10003;</span>
            <span>10 general football questions</span>
          </div>
          <div className="rule">
            <span className="rule-icon">&#9201;</span>
            <span>20 seconds per question</span>
          </div>
          <div className="rule">
            <span className="rule-icon">&#127942;</span>
            <span>+10 points for each correct answer</span>
          </div>
        </div>
        <button
          className="btn btn-primary btn-large"
          onClick={handleStart}
        >
          Start Quiz
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => dispatch({ type: "VIEW_LEADERBOARD" })}
        >
          Leaderboard
        </button>
        <a
          className="github-link"
          href="https://github.com/AjRyanx"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          AjRyanx
        </a>
      </div>
    </div>
  )
}
