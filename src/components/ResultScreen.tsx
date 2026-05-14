import { useQuiz } from "../context/QuizContext"

export default function ResultScreen() {
  const { state, dispatch } = useQuiz()
  const { score, questions, answers } = state
  const total = questions.length
  const correct = answers.filter((a) => a.isCorrect).length
  const pct = Math.round((correct / total) * 100)

  let grade: string
  let emoji: string
  if (pct >= 90) {
    grade = "Legendary"
    emoji = "\u{1F3C6}"
  } else if (pct >= 70) {
    grade = "Great"
    emoji = "\u{1F44F}"
  } else if (pct >= 50) {
    grade = "Not Bad"
    emoji = "\u{1F60A}"
  } else {
    grade = "Try Again"
    emoji = "\u{1F4AA}"
  }

  return (
    <div className="screen result-screen">
      <div className="result-card">
        <div className="result-emoji">{emoji}</div>
        <h1 className="result-grade">{grade}</h1>
        <div className="result-score">
          <span className="score-value">{score}</span>
          <span className="score-label">points</span>
        </div>
        <div className="result-stats">
          <div className="stat">
            <span className="stat-value">{correct}</span>
            <span className="stat-label">Correct</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-value">{total - correct}</span>
            <span className="stat-label">Wrong</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-value">{pct}%</span>
            <span className="stat-label">Accuracy</span>
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => dispatch({ type: "SUBMIT_SCORE" })}
        >
          View Leaderboard
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => dispatch({ type: "START_QUIZ" })}
        >
          Play Again
        </button>
        <button
          className="btn btn-ghost"
          onClick={() => dispatch({ type: "GO_HOME" })}
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}
