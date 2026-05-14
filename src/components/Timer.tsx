import { useEffect, useRef } from "react"
import { useQuiz } from "../context/QuizContext"

export default function Timer() {
  const { state, dispatch } = useQuiz()
  const { timeLeft, answers, currentIndex } = state
  const hasAnswered = answers.length > currentIndex
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (state.screen !== "quiz") return

    intervalRef.current = window.setInterval(() => {
      dispatch({ type: "TICK" })
    }, 1000)

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
      }
    }
  }, [state.screen, dispatch])

  useEffect(() => {
    if (timeLeft === 0 && !hasAnswered && state.screen === "quiz") {
      dispatch({ type: "TIMEOUT" })
    }
  }, [timeLeft, hasAnswered, dispatch, state.screen])

  const pct = (timeLeft / 20) * 100
  const isLow = timeLeft <= 5

  return (
    <div className="timer-container">
      <div className="timer-bar-track">
        <div
          className={`timer-bar-fill ${isLow ? "timer-low" : ""}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={`timer-text ${isLow ? "timer-low" : ""}`}>
        {timeLeft}s
      </span>
    </div>
  )
}
