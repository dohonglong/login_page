import {
  Button,
  Grid2,
  Box,
  //Typography,
  //Card,
  //CardMedia,
  //CardContent,
  //Container,
  //Chip,
} from "@mui/material";
import useHotelBooking from "../../custom-hooks/useHotelBooking";
import BookingModal from "./BookingModal";
import RoomDetails from "./RoomDetails";

const HotelBooking = ({ user }) => {
  const {
    open,
    loading,
    error,
    roomTypes,
    selectedRoomTypes,
    handleOpenModal,
    handleCloseModal,
    handleRoomTypesChange,
  } = useHotelBooking(user);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {/* Booking Button */}
      <Grid2
        container
        spacing={{ xs: 1, md: 2 }}
        className="greeting-box"
        sx={{
          overflowY: "auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid2 xs={12} md={12} container justifyContent="center">
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

        <BookingModal
          roomTypes={roomTypes}
          open={open}
          selectedRoomTypes={selectedRoomTypes}
          handleCloseModal={handleCloseModal}
          handleRoomTypesChange={handleRoomTypesChange}
        />
      </Grid2>

      <RoomDetails roomTypes={roomTypes} />

      <Box
        component="footer"
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          backgroundColor: "#1F445A",
          color: "white",
          textAlign: "center",
          padding: 2,
        }}
      >
        © 2024 My Website | All Rights Reserved
      </Box>
    </div>
  );
};

export default HotelBooking;
