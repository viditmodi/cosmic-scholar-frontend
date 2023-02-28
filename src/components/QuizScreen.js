import React, { useEffect, useRef, useState } from 'react'
import { fetchQuestion } from './js/fetchQuestion'
import { sleep } from './js/sleep'

function QuizScreen() {
    const [question, setQuestion]= useState({})
    const [chosenAnswer, setChosenAnswer]= useState("")
    const answerRef = useRef(chosenAnswer)
    answerRef.current = chosenAnswer;

    const startQuiz = async ()=>{
            // setQuestionFormat   
        await sleep(5000)
            setQuestionFormat()
        }


        // const test=async ()=>{
        //     await sleep(5000);
        //     console.log("object")
        // }
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

        await sleep(10000)
        // setTimeout(checkAnswer, 8000, question_format.correct, question_format)
        console.log(chosenAnswer)
        checkAnswer(question_format.correct, question_format)
        await sleep(2000)
        setQuestionFormat()
    }

    const checkAnswer = (correct, question)=>{
        const given = answerRef.current
        console.log(answerRef.current)
        console.log("given---", given)
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
            if(chosen_index>=0){
            optionsElements[chosen_index].classList.add('quiz__option--incorrect')
            }
        }
    }


    const setAnswer= (option)=>{
        let optionElements = document.getElementsByClassName('quiz__option')
        for(let i=0; i<question.options.length; i++){
            if(question.options[i]===option){
                console.log(i)
                optionElements[i].classList.add('quiz__option--selected')
                continue
            }
            
            optionElements[i].classList.remove('quiz__option--selected')
        }
        
        console.log(option)
        setChosenAnswer(option)
    }
  return (
    <div>

        <button onClick={startQuiz}>get</button>
      {/* {JSON.stringify(question)} */}
      <div className="glass__screen ">
            <p className="glass glass__text quiz__question">{question.question}</p>
            <p className="glass glass__text quiz__question">{chosenAnswer}</p>

            <div className="quiz__options">
                {question.options?.map(option=>{
                    return(
                        <button className="glass glass__btn quiz__option" onClick={()=>{setAnswer(option)}}>{option}</button>
                    )
                })}
                
            </div>
            <button onClick={()=>{checkAnswer(question.correct, question)}}>next</button>
      </div>
    </div>
  )
}

export default QuizScreen
