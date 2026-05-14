import { useQuiz } from "../context/QuizContext"

export default function ProgressBar() {
  const { state } = useQuiz()
  const { currentIndex, questions } = state
  const total = questions.length
  const pct = ((currentIndex + 1) / total) * 100

  return (
    <div className="progress-container">
      <span className="progress-label">
        Question {currentIndex + 1} of {total}
      </span>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
