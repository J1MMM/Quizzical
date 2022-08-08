import axios from "axios";
import { nanoid } from "nanoid"
import { useEffect, useState } from "react";
import IntroPage from "./pages/intro-page";
import LoadingPage from "./pages/loading-page";
import QuestionsPage from "./pages/questions-page";
import blobs1 from './images/blobs1.png'
import blobs2 from './images/blobs2.png'

export default function App() {
  const [gamestart, setGamestart] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState({total_score: null, total_items: null});
  const [submit, setSubmit] = useState(false);
  const [apiHelper, setApiHelper] = useState(
    {Number_of_Questions: 5,
      category: 9,
      difficulty: "easy"
    });
    console.log(questions)
    
  // useEffect(() =>{
  //   axios.get('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple')
  //   .then(res => setQuestions(res.data.results))
  //   .then(() =>{
  //     setQuestions(prev =>{
  //       return prev.map(data =>{
  //           let randomNumbers = [0, 1, 2, 3];
  //           let currentIndex = randomNumbers.length;
        
  //           while(currentIndex !== 0){
  //             let randomIndex = Math.floor(Math.random() * currentIndex)
  //             currentIndex--;
        
  //             [randomNumbers[currentIndex], randomNumbers[randomIndex]] = [
  //               randomNumbers[randomIndex], randomNumbers[currentIndex]];
        
  //           }
  //           return {...data, 
  //             choosen_answer: "", 
  //             id: nanoid(),
  //             choices: {
  //               option_1: data.incorrect_answers[0], 
  //               option_2: data.incorrect_answers[1], 
  //               option_3: data.incorrect_answers[2], 
  //               option_4: data.correct_answer
  //             },
  //             random_number: randomNumbers
  //           }
  //         })
  //       })
  //     })
  // }, [gamestart])

  function handleSubmit(e){
    e.preventDefault()
    const ansNotEmpt = questions.every(data => data.choosen_answer !== "")
    const rightAnswer = questions.filter(q => q.choosen_answer === q.correct_answer)
    
    if(ansNotEmpt){
      setScore(() => ({total_score: rightAnswer.length, total_items: questions.length}) )
      setSubmit(true)
    }
  }

  
  function playAgain(){
    setGamestart(false)
    setQuestions([])
    setScore(() => ({total_score: null, total_items: null}))
    setSubmit(false)
  }

  const questionsElements = questions.map(data =>{
    return(
        <QuestionsPage submit={submit} score={score} setQuestions={setQuestions} allData={data} key={nanoid()}/>
    )
  })
    function introFormSubmited(){

      axios.get(`https://opentdb.com/api.php?amount=${apiHelper.Number_of_Questions}&category=${apiHelper.category}&difficulty=${apiHelper.difficulty}&type=multiple`)
    .then(res => setQuestions(res.data.results))
    .then(() =>{
      setQuestions(prev =>{
        return prev.map(data =>{
            let randomNumbers = [0, 1, 2, 3];
            let currentIndex = randomNumbers.length;
        
            while(currentIndex !== 0){
              let randomIndex = Math.floor(Math.random() * currentIndex)
              currentIndex--;
        
              [randomNumbers[currentIndex], randomNumbers[randomIndex]] = [
                randomNumbers[randomIndex], randomNumbers[currentIndex]];
        
            }
            return {...data, 
              choosen_answer: "", 
              id: nanoid(),
              choices: {
                option_1: data.incorrect_answers[0], 
                option_2: data.incorrect_answers[1], 
                option_3: data.incorrect_answers[2], 
                option_4: data.correct_answer
              },
              random_number: randomNumbers
            }
          })
        })
      })
    }
  return (
    <div className="App">
      <img src={blobs1} className='blobs blobs1'/>
      <img src={blobs2} className='blobs blobs2'/>
      {!gamestart ? 
        <IntroPage introFormSubmited={introFormSubmited} setApiHelper={setApiHelper} apiHelper={apiHelper} setGamestart={setGamestart}/> : 
        questions.length < 1  ?
        <LoadingPage /> :
        <form className="question-page" onSubmit={handleSubmit}>
          {questionsElements}
          <div className="submit-btn-container">
            {score.total_items && <span>You scored {score.total_score}/{score.total_items} correct answers</span>}
            {score.total_score !== null ?
            <button className="check-answer-btn" onClick={() => playAgain()}>Play again</button>:
            <button className="check-answer-btn">Check answers</button>}
          </div>
        </form>
        }
    </div>
    )
  }

