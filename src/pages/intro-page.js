
export default function introPage(props){
  function handleChange(e){
    const {value, name} = e.target
    props.setApiHelper(prev => ({...prev, [name]: value}))
  }

  function handleClick(e){
    props.setApiHelper(prev => (prev.Number_of_Questions === 1 || prev.Number_of_Questions === 50 ? {...prev, Number_of_Questions: 5} : e.target.className === "btn-up" ? {...prev, Number_of_Questions: prev.Number_of_Questions + 1}:{...prev, Number_of_Questions: prev.Number_of_Questions - 1}))
    }
    return(
        <div className="intro-page">
        <h1>Quizzical</h1>
        <p>A fun way to test your Knowledge</p>
        <form className="intro-form">
          <label htmlFor="number-of-question">Number of Questions:</label>
          <div className="number-of-question">
            {props.apiHelper.Number_of_Questions}
            <div className="up-down-btn-container">
              <div className="btn-up" onClick={(e) => handleClick(e)}>
              </div>
              <div className="btn-down" onClick={(e) => handleClick(e)}>
              </div>
            </div>
          </div>
          <label htmlFor='category'>Select Category:</label>
          <select id='category' name='category' value={props.apiHelper.category} onChange={handleChange}>
            <option value='9'>General Knowledge</option>
            <option value='10'>Entertainment: Books</option>
            <option value='11'>Entertainment: Film</option>
            <option value='12'>Entertainment: Music</option>
            <option value='13'>Entertainment: Musicals & Theatres</option>
            <option value='14'>Entertainment: Television</option>
            <option value='15'>Entertainment: Video Games</option>
            <option value='16'>Entertainment: Board Games</option>
            <option value='17'>Science & Nature</option>
            <option value='18'>Science: Computers</option>
            <option value='19'>Science: Mathematics</option>
            <option value='20'>Mythology</option>
            <option value='21'>Sports</option>
            <option value='22'>Geography</option>
            <option value='23'>History</option>
            <option value='24'>Politics</option>
            <option value='25'>Arts</option>
            <option value='26'>Celebrities</option>
            <option value='27'>Animals</option>
          </select>

          <label htmlFor='difficulty'>Select Difficulty:</label>
          <select id='difficulty' name='difficulty' value={props.apiHelper.difficulty} onChange={handleChange}>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
        </form>
        <button className="startquiz-btn" onClick={() => {props.setGamestart(true); props.introFormSubmited()}}>Start quiz</button>
      </div>
    )
}