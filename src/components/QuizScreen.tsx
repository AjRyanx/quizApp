import Timer from "./Timer"
import ProgressBar from "./ProgressBar"
import QuestionCard from "./QuestionCard"

export default function QuizScreen() {
  return (
    <div className="screen quiz-screen">
      <ProgressBar />
      <Timer />
      <QuestionCard />
    </div>
  )
}
