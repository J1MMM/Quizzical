
export default function introPage(props){
    return(
        <div className="intro-page">
        <h1>Quizzical</h1>
        <p>Some description if needed</p>
        <button className="startquiz-btn" onClick={() => props.setGamestart(true)}>Start quiz</button>
      </div>
    )
}