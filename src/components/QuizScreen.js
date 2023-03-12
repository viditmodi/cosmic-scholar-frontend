import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import UserDataContext from "../context/UserDataContext";
// import { fetchQuestion } from "./js/fetchQuestion";
import { sleep } from "./js/sleep";
import Timer from "./Timer";

function QuizScreen(props) {
  // const [questionArray, setQuestionArray]= useState([])
  // const navigate = useNavigate()
  const UserContext = useContext(UserDataContext)
  const { category, difficulty } = useParams();

  
  const [chosenAnswer, setChosenAnswer] = useState("");
  const answerRef = useRef(chosenAnswer);
  answerRef.current = chosenAnswer;

  const [exp, setExp] = useState(0)
  const expRef = useRef(exp);
  expRef.current = exp;


  const [question, setQuestion] = useState({});
  const [showQuizScreen, setShowQuizScreen] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [time, setTime] = useState(0);


  const startQuiz = async () => {
    const q = await getQuestions();
    const t = 5;
    setTime(t)
    setShowTimer(true)
    await sleep(5000);
    setShowTimer(false)
    await sleep(500)
    setShowQuizScreen(true)
    handleQuiz(q, 0);
  };
  

  const resetOptions = () => {
    let optionElements = document.getElementsByClassName("quiz__option");

    if (optionElements.length > 0) {
      for (let i = 0; i < optionElements.length; i++) {
        optionElements[i].classList.remove("quiz__option--incorrect");
        optionElements[i].classList.remove("quiz__option--correct");
        optionElements[i].classList.remove("quiz__option--selected");
      }
    }
  };
  const getQuestions = async () => {
    let question_format = await axios.get(
      process.env.REACT_APP_SIS_API_URL +
        `/question/quiz-api?category=${category}&difficulty=${difficulty}&limit=2`
    );
    question_format = question_format.data;
    return question_format;
  };

  const handleQuiz = async (questionArray, questionIndex) => {
    const t = props.questionTime;
    setTime(t)
    setShowTimer(true)
    resetOptions();
    if (questionIndex >= questionArray.length) {
      console.log("end");
      setShowTimer(false)
      try {
        const response = await axios.put(process.env.REACT_APP_SIS_API_URL+`/account/exp/${UserContext.userData.username}`, {gainedExp: expRef.current})

        // if(response.data.status){
          UserContext.setUserData(response.data.data)
          localStorage.setItem("sis_user_data", JSON.stringify(response.data.data))
          console.log(response)
          console.log("response")
          // navigate('/dashboard')

        // }
        
      } catch (error) {
        console.log(error)
      }
    //   console.log(exp)
    setShowQuizScreen(false)
      console.log(expRef.current)
      return;
    }
    setQuestion(questionArray[questionIndex]);
    await sleep(props.questionTime*1000);
    checkAnswer(questionArray[questionIndex]);
    setShowTimer(false)
    await sleep(2000);

    handleQuiz(questionArray, questionIndex + 1);
  };

  const checkAnswer = (question) => {
    const given = answerRef.current;
    // console.log(answerRef.current);
    // console.log("exp---", exp);
    // console.log(correct);
    const correct_index = question.correct_answer.index;
    const chosen_index = question.options.indexOf(given);
    let optionsElements = document.getElementsByClassName("quiz__option");
    if (given === question.correct_answer.value) {
      console.log("correct");
    //   console.log(question.exp);
      setExp(prevState => prevState  + question.exp)
      optionsElements[correct_index].classList.add("quiz__option--correct");

    } else {
      console.log("incorrect");
      optionsElements[correct_index].classList.add("quiz__option--correct");
      if (chosen_index >= 0) {
        optionsElements[chosen_index].classList.add("quiz__option--incorrect");
      }
    }
  };

  const setAnswer = (option) => {
    let optionElements = document.getElementsByClassName("quiz__option");
    for (let i = 0; i < question.options.length; i++) {
      if (question.options[i] === option) {
        // console.log(i)
        optionElements[i].classList.add("quiz__option--selected");
        continue;
      }

      optionElements[i].classList.remove("quiz__option--selected");
    }

    // console.log(option);
    setChosenAnswer(option);
  };



  return (
    <div className="popup__child">
      {/* {console.log(UserContext.userData.username)} */}
      {!showQuizScreen && <button className="btn btn--3d ui__btn ui__btn--blue" onClick={startQuiz}>start quiz</button>}
        {showTimer && <Timer time={time}></Timer>}
      {/* {JSON.stringify(question)} */}
      {showQuizScreen && <div className="glass glass--white quiz">
        <p className="glass__text quiz__question">{question.question}</p>
        {/* <p className="glass glass__text quiz__question">{chosenAnswer}</p> */}

        <div className="quiz__options">
          {question.options?.map((option) => {
            return (
              <button
                className=" quiz__option"
                onClick={() => {
                  setAnswer(option);
                }}
              >
                {option}
              </button>
            );
          })}
        </div>
        {/* {exp} */}
      </div>}
    </div>
  );
}

export default QuizScreen;
