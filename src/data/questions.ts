export interface Question {
  id: number
  question: string
  options: string[]
  correctIndex: number
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Which country has won the most FIFA World Cup titles?",
    options: ["Germany", "Argentina", "Brazil", "Italy"],
    correctIndex: 2,
  },
  {
    id: 2,
    question: "Who holds the record for most goals in Premier League history?",
    options: ["Wayne Rooney", "Alan Shearer", "Thierry Henry", "Harry Kane"],
    correctIndex: 1,
  },
  {
    id: 3,
    question: "Which club has won the most UEFA Champions League titles?",
    options: ["AC Milan", "Barcelona", "Liverpool", "Real Madrid"],
    correctIndex: 3,
  },
  {
    id: 4,
    question: "Who won the Ballon d'Or in 2023?",
    options: ["Kylian Mbappé", "Erling Haaland", "Lionel Messi", "Cristiano Ronaldo"],
    correctIndex: 2,
  },
  {
    id: 5,
    question: "Which country hosted the 2014 FIFA World Cup?",
    options: ["South Africa", "Brazil", "Russia", "Germany"],
    correctIndex: 1,
  },
  {
    id: 6,
    question: "Who is the all-time top scorer in men's international football?",
    options: ["Lionel Messi", "Cristiano Ronaldo", "Ali Daei", "Pelé"],
    correctIndex: 1,
  },
  {
    id: 7,
    question: "Which Premier League club is known as 'The Gunners'?",
    options: ["Chelsea", "Manchester City", "Arsenal", "Tottenham Hotspur"],
    correctIndex: 2,
  },
  {
    id: 8,
    question: "Who scored 'The Hand of God' goal in the 1986 World Cup?",
    options: ["Diego Maradona", "Pelé", "Zinedine Zidane", "Johan Cruyff"],
    correctIndex: 0,
  },
  {
    id: 9,
    question: "Which country won the UEFA Euro 2020 (played in 2021)?",
    options: ["England", "France", "Italy", "Portugal"],
    correctIndex: 2,
  },
  {
    id: 10,
    question: "How many World Cup titles has Argentina won as of 2024?",
    options: ["One", "Two", "Three", "Four"],
    correctIndex: 2,
  },
  {
    id: 11,
    question: "Which player has the most assists in Premier League history?",
    options: ["Kevin De Bruyne", "Cesc Fàbregas", "Ryan Giggs", "Frank Lampard"],
    correctIndex: 2,
  },
  {
    id: 12,
    question: "What is the capacity of Wembley Stadium?",
    options: ["75,000", "90,000", "87,000", "80,000"],
    correctIndex: 1,
  },
]
