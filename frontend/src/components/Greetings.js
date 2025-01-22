import {
  Button,
  TextField,
  Grid2,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useGreetings from "../custom-hooks/useGreetings";

const Greetings = ({ user }) => {
  const {
    greetings,
    result,
    loading,
    error,
    handleOnSubmit,
    setResult,
    deleteGreeting,
  } = useGreetings(user);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Grid2
        container
        spacing={{ xs: 1, md: 2 }}
        className="greeting-box"
        style={{ marginTop: "40px" }}
      >
        <Grid2 size={{ xs: 9, md: 10 }} justifyContent="flex-start">
          <TextField
            label="Text here"
            fullWidth
            variant="outlined"
            value={result}
            onChange={(event) => setResult(event.target.value)}
            style={{ height: "100%" }}
          />
        </Grid2>
        <Grid2 size={{ xs: 3, md: 2 }} justifyContent="flex-end">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleOnSubmit}
            style={{ height: "100%" }}
          >
            Send
          </Button>
        </Grid2>
        <List>
          {greetings.map((greeting) => (
            <ListItem key={greeting.id}>
              <ListItemText primary={greeting.message} />
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon onClick={() => deleteGreeting(greeting.id)} />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Grid2>
    </div>
  );
};

export default Greetings;
