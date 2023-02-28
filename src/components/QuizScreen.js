import React, { useEffect, useState } from 'react'
import { fetchQuestion } from './js/fetchQuestion'

function QuizScreen() {
    const [question, setQuestion]= useState({})
    const [chosenAnswer, setChosenAnswer]= useState("")
    // useEffect(,[])
    const startQuiz = ()=>{
            // setQuestionFormat   
            setInterval(setQuestionFormat, 10000)
        }
    const setQuestionFormat = async ()=>{
        let optionElements = document.getElementsByClassName('quiz__option')

        if(optionElements.length>0){
            for(let i=0; i<optionElements.length; i++){
                optionElements[i].classList.remove('quiz__option--incorrect')
                optionElements[i].classList.remove('quiz__option--correct')
                optionElements[i].classList.remove('quiz__option--selected')
            }
        }
        let question = await fetchQuestion()
        question = question[0];

        const arr = "abcdef".split("")
        let options=[]
        let correct_option
        arr.map((item, index)=>{
            const option = question.answers['answer_'+item]
            if(option){
                options.push(option)
            }
            const correct = question.correct_answers['answer_'+item+"_correct"]
            if(correct==='true'){
                correct_option = option
            }
        })
        const question_format = {
            question: question.question,
            options: options,
            correct: correct_option
        }
        // console.log(question_format)
        setQuestion(question_format)

        // setTimeout(checkAnswer, 8000, question_format.correct, question_format)
    }

    const checkAnswer = (correct, question)=>{
        const given = chosenAnswer
        console.log(given)
        console.log(correct)
        const correct_index = question.options.indexOf(correct)
        const chosen_index = question.options.indexOf(given)
        let optionsElements = document.getElementsByClassName('quiz__option')
        if(given===correct){
            console.log("correct")
            optionsElements[correct_index].classList.add('quiz__option--correct')
        }else{
            console.log("incorrect")
            optionsElements[correct_index].classList.add('quiz__option--correct')
            optionsElements[chosen_index].classList.add('quiz__option--incorrect')
        }
    }


    const setAnswer= (option)=>{
        setChosenAnswer(option)
    }
  return (
    <div>

        <button onClick={startQuiz}>get</button>
      {/* {JSON.stringify(question)} */}
      <div className="glass__screen ">
            <p className="glass glass__text quiz__question">{question.question}</p>
            {/* <p className="glass glass__text quiz__question">{chosenAnswer}</p> */}

            <div className="quiz__options">
                {question.options?.map(option=>{
                    return(
                        <button className="glass glass__btn quiz__option" onClick={setAnswer}>{option}</button>
                    )
                })}
                
            </div>
            <button onClick={()=>{checkAnswer(question.correct, question)}}>next</button>
      </div>
    </div>
  )
}

export default QuizScreen
