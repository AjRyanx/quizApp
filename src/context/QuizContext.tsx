import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from "react"
import { questions, type Question } from "../data/questions"

type Screen = "home" | "quiz" | "result" | "leaderboard"

interface Answer {
  questionId: number
  selectedIndex: number
  isCorrect: boolean
}

interface LeaderboardEntry {
  name: string
  score: number
  date: string
}

interface QuizState {
  screen: Screen
  questions: Question[]
  currentIndex: number
  score: number
  answers: Answer[]
  timeLeft: number
  playerName: string
  leaderboard: LeaderboardEntry[]
}

type Action =
  | { type: "START_QUIZ" }
  | { type: "ANSWER_QUESTION"; selectedIndex: number }
  | { type: "TIMEOUT" }
  | { type: "NEXT_QUESTION" }
  | { type: "TICK" }
  | { type: "FINISH_QUIZ" }
  | { type: "SET_PLAYER_NAME"; name: string }
  | { type: "SUBMIT_SCORE" }
  | { type: "VIEW_LEADERBOARD" }
  | { type: "GO_HOME" }

const TIME_PER_QUESTION = 20
const LEADERBOARD_KEY = "football-quiz-leaderboard"

function loadLeaderboard(): LeaderboardEntry[] {
  try {
    const data = localStorage.getItem(LEADERBOARD_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function saveLeaderboard(entries: LeaderboardEntry[]) {
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries))
}

const SCORE_PER_CORRECT = 10

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function initialState(): QuizState {
  return {
    screen: "home",
    questions: shuffleArray(questions).slice(0, 10),
    currentIndex: 0,
    score: 0,
    answers: [],
    timeLeft: TIME_PER_QUESTION,
    playerName: "",
    leaderboard: loadLeaderboard(),
  }
}

function reducer(state: QuizState, action: Action): QuizState {
  switch (action.type) {
    case "START_QUIZ": {
      const shuffled = shuffleArray(questions).slice(0, 10)
      return {
        ...state,
        screen: "quiz",
        questions: shuffled,
        currentIndex: 0,
        score: 0,
        answers: [],
        timeLeft: TIME_PER_QUESTION,
      }
    }

    case "ANSWER_QUESTION": {
      const current = state.questions[state.currentIndex]
      const isCorrect = action.selectedIndex === current.correctIndex
      const answer: Answer = {
        questionId: current.id,
        selectedIndex: action.selectedIndex,
        isCorrect,
      }
      return {
        ...state,
        score: isCorrect ? state.score + SCORE_PER_CORRECT : state.score,
        answers: [...state.answers, answer],
      }
    }

    case "TIMEOUT": {
      const current = state.questions[state.currentIndex]
      const answer: Answer = {
        questionId: current.id,
        selectedIndex: -1,
        isCorrect: false,
      }
      return {
        ...state,
        answers: [...state.answers, answer],
      }
    }

    case "NEXT_QUESTION": {
      const nextIndex = state.currentIndex + 1
      if (nextIndex >= state.questions.length) {
        return { ...state, screen: "result", timeLeft: 0 }
      }
      return {
        ...state,
        currentIndex: nextIndex,
        timeLeft: TIME_PER_QUESTION,
      }
    }

    case "TICK": {
      if (state.timeLeft <= 1) {
        return state
      }
      return { ...state, timeLeft: state.timeLeft - 1 }
    }

    case "FINISH_QUIZ":
      return { ...state, screen: "result" }

    case "SET_PLAYER_NAME":
      return { ...state, playerName: action.name }

    case "SUBMIT_SCORE": {
      const entry: LeaderboardEntry = {
        name: state.playerName || "Anonymous",
        score: state.score,
        date: new Date().toLocaleDateString(),
      }
      const updated = [...state.leaderboard, entry]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
      saveLeaderboard(updated)
      return { ...state, leaderboard: updated, screen: "leaderboard" }
    }

    case "VIEW_LEADERBOARD":
      return { ...state, screen: "leaderboard" }

    case "GO_HOME":
      return { ...state, screen: "home" }

    default:
      return state
  }
}

const QuizContext = createContext<{
  state: QuizState
  dispatch: Dispatch<Action>
} | null>(null)

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, initialState)

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  const ctx = useContext(QuizContext)
  if (!ctx) throw new Error("useQuiz must be used within QuizProvider")
  return ctx
}
