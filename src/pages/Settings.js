import { Button, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
import SelectField from "../components/SelectField";
import TextFieldComp from "../components/TextFieldComp";
import useAxios from "../hooks/useAxios";
import '../styles/Settings.css';

const Settings = () => {
  const { response, error, loading } = useAxios({ url: "/api_category.php" });
  const history = useHistory();

  if (loading) {
    return (
      <Box className="settings-form">
        <CircularProgress className="circular-progress" />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" className="error-message">
        Something Went Wrong!
      </Typography>
    );
  }

  const difficultyOptions = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];

  const typeOptions = [
    { id: "multiple", name: "Multiple Choice" },
    { id: "boolean", name: "True/False" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/questions");
  };

  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      <SelectField options={response.trivia_categories} label="Category" className="select-field" />
      <SelectField options={difficultyOptions} label="Difficulty" className="select-field" />
      <SelectField options={typeOptions} label="Type" className="select-field" />
      <TextFieldComp className="text-field" />
      <Box mt={3} width="100%">
        <Button fullWidth variant="contained" type="submit" className="start-button">
          Get Started
        </Button>
      </Box>
    </form>
  );
};

export default Settings;
