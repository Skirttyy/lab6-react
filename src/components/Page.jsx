import "./Page.css"
import { letters } from "../constants/letters"
import { stages } from "../constants/stages"
import { words } from"../constants/words"

import Letter from "./Letter"
import { useState } from "react"
import Result from "./Result"

let randomWord = words[Math.floor(Math.random() * words.length)]

export default function Page () {

    const [stageNumber, setStageNumber] = useState(0)
    const [revealedWord, setRevealedWord] = useState(new Array(randomWord.length).fill("_"))
    const [clickedWords, setClickedWords] = useState([])
    const [finalResult, setFinalResult] = useState(null)

    function handleSelectLetter (index) {
        let tempWord = [...revealedWord]
        if (randomWord.includes(letters[index])) {
            for (let j = 0; j < randomWord.length; j++) {
                if (letters[index] === randomWord[j]) {
                    tempWord[j] = randomWord[j]
                    setRevealedWord(tempWord)
                }
            }
        } else {
            setClickedWords([...clickedWords, letters[index]])
            setStageNumber(stageNumber + 1)
        }

        if (!tempWord.includes("_")) {
            setFinalResult("Winner")
        } else if (tempWord.includes("_") && stageNumber + 1 === stages.length-1) {
            setFinalResult("Loser")
        }
    }

    function resetHandler () {
        randomWord = words[Math.floor(Math.random() * words.length)]
        setStageNumber(0)
        setFinalResult(null)
        setRevealedWord(new Array(randomWord.length).fill("_"))
        setClickedWords([])
    }

    return (
        <div className="page-container">
            <div className="image-container">
                <img className="image-style" src={stages[stageNumber]}></img>
            </div>
            <div>
                <Result result={finalResult != null ? finalResult : null} resetHandler={resetHandler}/>
            </div>
            <div className="revealed-word-container">
                {revealedWord.map((value) => {
                    return <p>{value}</p>
                })}
            </div>
            <div className="letters-container">
                {letters.map((value, index) => {
                    if (finalResult != null) {
                        return <></>
                    } else if (revealedWord.includes(value)) {
                        return <Letter letter={value} onClickHandler={() => handleSelectLetter(index)} isActive={false}/>
                    } else if (clickedWords.find((letter) => letter === value)) {
                        return <Letter letter={value} onClickHandler={() => handleSelectLetter(index)} isActive={false}/>
                    } else {
                        return <Letter letter={value} onClickHandler={() => handleSelectLetter(index)} isActive={true}/>
                    }
                })}
            </div>
        </div>
    )
}