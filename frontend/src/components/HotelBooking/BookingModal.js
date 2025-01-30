import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const BookingModal = ({
  roomTypes,
  open,
  selectedRoomTypes,
  handleCloseModal,
  handleRoomTypesChange,
}) => {
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
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2">
          HOTELS
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Please choose your booking details below.
        </Typography>
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
        <FormControl fullWidth>
          <InputLabel>Room Types</InputLabel>
          <Select
            label="Types"
            value={selectedRoomTypes}
            onChange={handleRoomTypesChange}
          >
            {roomTypes.map((roomtype) => (
              <MenuItem key={roomtype.id} value={roomtype.name}>
                {roomtype.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
  );
};

export default BookingModal;
