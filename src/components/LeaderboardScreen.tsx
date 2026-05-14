import { useQuiz } from "../context/QuizContext"

export default function LeaderboardScreen() {
  const { state, dispatch } = useQuiz()
  const { leaderboard } = state

  return (
    <div className="screen leaderboard-screen">
      <div className="leaderboard-card">
        <div className="leaderboard-header">
          <span className="trophy-icon">&#127942;</span>
          <h1>Leaderboard</h1>
        </div>

        {leaderboard.length === 0 ? (
          <p className="leaderboard-empty">
            No scores yet. Play a game to get on the board!
          </p>
        ) : (
          <div className="leaderboard-list">
            <div className="leaderboard-headers">
              <span className="col-rank">#</span>
              <span className="col-name">Name</span>
              <span className="col-score">Score</span>
              <span className="col-date">Date</span>
            </div>
            {leaderboard.map((entry, index) => {
              let rankClass = ""
              let medal = ""
              if (index === 0) {
                rankClass = "rank-gold"
                medal = "\u{1F947}"
              } else if (index === 1) {
                rankClass = "rank-silver"
                medal = "\u{1F948}"
              } else if (index === 2) {
                rankClass = "rank-bronze"
                medal = "\u{1F949}"
              }

              return (
                <div
                  key={`${entry.name}-${entry.date}-${index}`}
                  className={`leaderboard-row ${rankClass}`}
                >
                  <span className="col-rank">
                    {medal || index + 1}
                  </span>
                  <span className="col-name">{entry.name}</span>
                  <span className="col-score">{entry.score}</span>
                  <span className="col-date">{entry.date}</span>
                </div>
              )
            })}
          </div>
        )}

        <button
          className="btn btn-primary"
          onClick={() => dispatch({ type: "GO_HOME" })}
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}
