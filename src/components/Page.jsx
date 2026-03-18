import "./Page.css"
import { letters } from "../constants/letters"
import { stages } from "../constants/stages"
import { words } from "../constants/words"

import Letter from "./Letter"
import { useState } from "react"
import Result from "./Result"

let randomWord = words[Math.floor(Math.random() * words.length)]

export default function Page () {

    const [stageNumber, setStageNumber] = useState(0)
    const [revealedWord, setRevealedWord] = useState(new Array(randomWord.length).fill("_"))
    const [clickedLetters, setClickedLetters] = useState([])
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
            setClickedLetters([...clickedLetters, letters[index]])
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
        setClickedLetters([])
    }

    return (
        <div className="page-container">
            <div className="image-container">
                <img className="image-style" src={stages[stageNumber]} alt="hangman stage" />
            </div>
            <div>
                <Result result={finalResult != null ? finalResult : null} resetHandler={resetHandler}/>
            </div>
            <div className="revealed-word-container">
                {revealedWord.map((value, index) => {
                    return <p key={index}>{value}</p>
                })}
            </div>
            <div className="letters-container">
                {letters.map((value, index) => {
                    if (finalResult != null) {
                        return null
                    } else if (revealedWord.includes(value)) {
                        return <Letter key={value} letter={value} onClickHandler={() => handleSelectLetter(index)} isActive={false}/>
                    } else if (clickedLetters.find((letter) => letter === value)) {  // ✅ Bug 2
                        return <Letter key={value} letter={value} onClickHandler={() => handleSelectLetter(index)} isActive={false}/>
                    } else {
                        return <Letter key={value} letter={value} onClickHandler={() => handleSelectLetter(index)} isActive={true}/>
                    }
                })}
            </div>
        </div>
    )
}