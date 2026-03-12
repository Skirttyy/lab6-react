import "./Letter.css"

export default function Letter ({letter, onClickHandler, isActive}) {
    return (
        <div className="letter-container" onClick={isActive ? onClickHandler : null} style={{backgroundColor : isActive === true ? "white" : "gray"}}>
            <p>{letter}</p>
        </div>
    )
}