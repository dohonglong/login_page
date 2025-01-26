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
        sx={{ marginTop: "40px", overflowY: "auto" }}
      >
        <Grid2 size={{ xs: 9, md: 10 }} justifyContent="flex-start">
          <TextField
            label="Text here"
            fullWidth
            variant="outlined"
            value={result}
            onChange={(event) => setResult(event.target.value)}
            sx={{ height: "100%" }}
          />
        </Grid2>
        <Grid2 size={{ xs: 3, md: 2 }} justifyContent="flex-end">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleOnSubmit}
            sx={{ height: "100%" }}
          >
            Send
          </Button>
        </Grid2>
        <Grid2 xs={12} sx={{ overflowY: "auto" }}>
          <List>
            {greetings.map((greeting) => (
              <ListItem key={greeting.id} sx={{ alignItems: "flex-start" }}>
                <ListItemText
                  primary={greeting.message}
                  sx={{
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    overflowWrap: "anywhere",
                  }}
                />
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon onClick={() => deleteGreeting(greeting.id)} />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default Greetings;
