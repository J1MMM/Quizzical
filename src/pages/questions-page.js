
export default function QuestionsPage(props){

    const activeButton = {
        border: "2px solid #D6DBF5",
        backgroundColor: "#D6DBF5"
    }
    const wrongAns = {
        border: "2px solid #F8BCBC",
        backgroundColor: "#F8BCBC",
        opacity: ".5"
    }
    
    const RightAns = {
        border: "2px solid #94D7A2",
        backgroundColor: "#94D7A2"
    }
    
    const clickOff = {
        pointerEvents: "none"
    }

    function buttonClicked(e){
        const {value, id} = e.target;
            
            props.setQuestions(prev =>{
               return prev.map(data =>{
                   return data.id === id ? {...data, choosen_answer: value} : {...data}
               })
            })
    }
    
    const choices = [
        <button style={props.submit ? props.allData.choosen_answer === props.allData.choices.option_1 ? wrongAns : {opacity: .5} : props.allData.choosen_answer === props.allData.choices.option_1 ? activeButton : {}} id={props.allData.id} onClick={(e) => buttonClicked (e)} value={props.allData.choices.option_1} dangerouslySetInnerHTML={{ __html: `${props.allData.choices.option_1}` }}></button>,
        <button style={props.submit ? props.allData.choosen_answer === props.allData.choices.option_2 ? wrongAns : {opacity: .5} : props.allData.choosen_answer === props.allData.choices.option_2 ? activeButton : {}} id={props.allData.id} onClick={(e) => buttonClicked (e)} value={props.allData.choices.option_2} dangerouslySetInnerHTML={{ __html: `${props.allData.choices.option_2}` }}></button>,
        <button style={props.submit ? props.allData.choosen_answer === props.allData.choices.option_3 ? wrongAns : {opacity: .5} : props.allData.choosen_answer === props.allData.choices.option_3 ? activeButton : {}} id={props.allData.id} onClick={(e) => buttonClicked (e)} value={props.allData.choices.option_3} dangerouslySetInnerHTML={{ __html: `${props.allData.choices.option_3}` }}></button>,
        <button style={props.submit ? RightAns : props.allData.choosen_answer === props.allData.choices.option_4 ? activeButton : {}} id={props.allData.id} onClick={(e) => buttonClicked (e)} value={props.allData.choices.option_4} dangerouslySetInnerHTML={{ __html: `${props.allData.choices.option_4}` }}></button>
    ]

    return(
            <fieldset className="questions-container" style={props.score.total_score !== null ? clickOff : {}}>
                <h2 dangerouslySetInnerHTML={{ __html: `${props.allData.question}` }}></h2>
                <div className="choices-container">
                    <div>
                        {choices[props.allData.random_number[0]]}
                        {choices[props.allData.random_number[1]]}
                    </div>
                    <div>
                        {choices[props.allData.random_number[2]]}
                        {choices[props.allData.random_number[3]]}
                    </div>
                </div>
                <hr />
            </fieldset>
    )
}