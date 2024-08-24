import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import '../styles/FinalScreen.css';

const FinalScreen = () => {
  const history = useHistory();
  const score = useSelector((state) => state.score);

  const handleBackToSettings = () => {
    history.push("/");
  };

  return (
    <Box className="quiz-container final-screen-container">
      <Typography variant="h3" className="final-score">
        Final Score: {score}
      </Typography>
      <Box mt={3}>
        <Button
          variant="contained"
          className="back-button"
          onClick={handleBackToSettings}
        >
          Back to Settings
        </Button>
      </Box>
    </Box>
  );
};

export default FinalScreen;
