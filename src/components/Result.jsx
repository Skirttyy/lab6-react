import "./Result.css"

export default function Result ({result, resetHandler}) {
    if (result != null) {
        return (
            <div className="result-container">
                <p>{result === "Winner" ? "You won!" : "You lose!"}</p>
                <button onClick={() => resetHandler()}>Reset</button>
            </div>
        )
    }
}