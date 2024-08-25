import { Button, CircularProgress, Typography, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import { decode } from "html-entities";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import useAxios from "../hooks/useAxios";
import { handleScoreChange } from "../redux/actions";
import '../styles/Questions.css';

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const Questions = () => {
  const { question_category, question_difficulty, question_type, amount_of_question, score } = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();

  let apiUrl = `/api.php?amount=${amount_of_question}`;
  if (question_category) apiUrl = apiUrl.concat(`&category=${question_category}`);
  if (question_difficulty) apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`);
  if (question_type) apiUrl = apiUrl.concat(`&type=${question_type}`);

  const { response, loading } = useAxios({ url: apiUrl });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (response?.results.length) {
      const question = response.results[questionIndex];
      let answers = [...question.incorrect_answers];
      answers.splice(getRandomInt(question.incorrect_answers.length), 0, question.correct_answer);
      setOptions(answers);
    }
  }, [response, questionIndex]);

  if (loading) {
    return (
      <Box className="question-container">
        <CircularProgress className="circular-progress" />
      </Box>
    );
  }

  const handleClickAnswer = (e) => {
    const question = response.results[questionIndex];
    if (e.target.textContent === question.correct_answer) {
      dispatch(handleScoreChange(score + 1));
    }

    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      history.push("/score");
    }
  };

  const maxScore = amount_of_question; // Maximum score based on the number of questions

  return (
    <Box className="quiz-container">
      <Typography variant="h4" className="quiz-title">
        Question {questionIndex + 1}
      </Typography>
      <Typography className="question-text">
        {decode(response.results[questionIndex].question)}
      </Typography>
      {options.map((data, id) => (
        <Button
          className="answer-option"
          variant="contained"
          color="primary"
          onClick={handleClickAnswer}
          key={id}
        >
          {decode(data)}
        </Button>
      ))}
      <Box className="score-text">
        <Typography variant="h6">Score: {score}</Typography>
        <LinearProgress 
          variant="determinate" 
          value={(score / maxScore) * 100} 
          className="score-progress"
        />
      </Box>
    </Box>
  );
};

export default Questions;
