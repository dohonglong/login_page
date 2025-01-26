import {
  Button,
  Grid2,
  List,
  Modal,
  Box,
  Typography,
  TextField,
  //   ListItem,
  //   ListItemText,
  //   IconButton,
} from "@mui/material";
import { useState } from "react";
//import DeleteIcon from "@mui/icons-material/Delete";
const HotelBooking = () => {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2, // Add rounded corners
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Grid2
        container
        spacing={{ xs: 1, md: 2 }}
        className="greeting-box"
        sx={{
          marginTop: "40px",
          overflowY: "auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid2 xs={3} md={2}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleOpenModal}
            sx={{ height: "100%" }}
          >
            Book Here
          </Button>
        </Grid2>

        <Modal
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography variant="h6" component="h2">
              HOTEL BOOKING
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Please choose your booking details below.
            </Typography>
            {/* Add content for inputs */}
            <TextField
              label="Check-in Date"
              type="date"
              fullWidth
              margin="normal"
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              label="Check-out Date"
              type="date"
              fullWidth
              margin="normal"
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              label="Number of Guests"
              type="number"
              fullWidth
              margin="normal"
            />

            <Button
              variant="contained"
              fullWidth
              onClick={() => console.log("Redirect to next page")}
              sx={{ mt: 2 }}
            >
              Continue to Booking
            </Button>
          </Box>
        </Modal>
        <Grid2 xs={12} sx={{ overflowY: "auto" }}>
          <List>
            {/* {greetings.map((greeting) => (
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
            ))} */}
          </List>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default HotelBooking;
