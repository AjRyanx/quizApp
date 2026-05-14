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
      </div>
    </div>
  )
}
