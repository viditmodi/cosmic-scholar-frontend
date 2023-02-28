import axios from "axios"

export const fetchQuestion = async ()=>{
    const url = `${process.env.REACT_APP_QUIZ_API_URL}?apiKey=${process.env.REACT_APP_QUIZ_API_KEY}&limit=1`

    const quizRes = await axios.get(url)

    return quizRes.data
}