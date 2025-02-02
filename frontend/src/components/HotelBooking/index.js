import {
  Button,
  Grid2,
  Box,
  Typography,
  //Card,
  CardMedia,
  //CardContent,
  Container,
  //Chip,
} from "@mui/material";
import useHotelBooking from "../../custom-hooks/useHotelBooking";
import BookingModal from "./BookingModal";

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

      <Container maxWidth="false" sx={{ mt: 4, width: "90%" }}>
        <Grid2
          container
          spacing={1}
          sx={{ justifyContent: "center", alignItems: "stretch" }}
        >
          {roomTypes.map((room, id) => (
            <Grid2
              key={id}
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                boxShadow: 3,
                p: 2,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  "&:hover img": { opacity: 0.5, transform: "scale(1.1)" },
                  "&:hover button": {
                    backgroundColor: "transparent",
                    color: "black",
                    border: "2px solid black",
                  },
                  transition: "opacity 0.3s ease-in-out",
                }}
              >
                <CardMedia
                  component="img"
                  image={room.image_url}
                  alt={room.name}
                  sx={{
                    height: { xs: "auto", sm: 300 },
                    width: "100%",
                    transition: "transform 0.3s ease-in-out",
                    margin: "auto",
                    display: "block",
                    objectFit: "cover",
                  }}
                />
              </Box>

              {/* Room Details */}
              <Box sx={{ flex: 1, p: 2 }}>
                <Typography variant="h4" gutterBottom>
                  {room.name}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {room.price_per_night} EUR/night
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {room.description}
                </Typography>

                {/* <Grid2 container spacing={1} sx={{ mt: 2 }}>
                    {room.amenities.map((amenity, index) => (
                      <Grid2 key={index}>
                        <Chip
                          label={amenity}
                          color="primary"
                          variant="outlined"
                        />
                      </Grid2>
                    ))}
                  </Grid2> */}
              </Box>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </div>
  );
};

export default HotelBooking;
