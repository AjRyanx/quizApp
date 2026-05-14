import { useQuiz } from "../context/QuizContext"

export default function QuestionCard() {
  const { state, dispatch } = useQuiz()
  const { questions, currentIndex, answers } = state
  const question = questions[currentIndex]
  const hasAnswered = answers.length > currentIndex
  const selectedIndex = hasAnswered ? answers[currentIndex].selectedIndex : -1
  const isTimeout = hasAnswered && selectedIndex === -1

  function handleSelect(index: number) {
    if (hasAnswered) return
    dispatch({ type: "ANSWER_QUESTION", selectedIndex: index })
    setTimeout(() => {
      dispatch({ type: "NEXT_QUESTION" })
    }, 600)
  }

  function getOptionClass(index: number) {
    if (!hasAnswered) return ""
    if (index === question.correctIndex) return "option-correct"
    if (index === selectedIndex && !isTimeout) return "option-wrong"
    return "option-dimmed"
  }

  return (
    <div className="question-card">
      <h2 className="question-text">{question.question}</h2>
      <div className="options-list">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`option-btn ${getOptionClass(index)}`}
            onClick={() => handleSelect(index)}
            disabled={hasAnswered}
          >
            <span className="option-letter">
              {String.fromCharCode(65 + index)}
            </span>
            <span className="option-text">{option}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
