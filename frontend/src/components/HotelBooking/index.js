import {
  Button,
  Grid2,
  Box,
  //Typography,
  Card,
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

      <Container
        maxWidth="false"
        sx={{ mt: 4, width: "90%", border: "2px solid black" }}
      >
        <Grid2
          container
          spacing={1}
          sx={{ justifyContent: "center", alignItems: "stretch" }}
        >
          {roomTypes.map((room, id) => (
            //<Box key={room.name} sx={{ boxShadow: 3, width: "33%" }}>
            //{/* Room Images */}
            <Grid2 key={id} xs={12} sm={6} md={4} sx={{ display: "flex" }}>
              <Card sx={{ position: "relative", width: "100%" }}>
                <Box
                  sx={{
                    position: "relative",
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
                    //height="230"
                    image={room.image_url}
                    alt={room.name}
                    sx={{
                      height: { xs: "auto", sm: 230 },
                      width: "100%",
                      transition: "transform 0.3s ease-in-out",
                      margin: "auto",
                      display: "block",
                      objectFit: "cover",
                    }}
                  />
                  <Button
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      fontFamily: "monospace",
                      fontSize: 15,
                      fontWeight: 700,
                      backgroundColor: "white",
                      color: "#1F445A",
                      border: "none",
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    {room.name}
                  </Button>
                </Box>
              </Card>
            </Grid2>

            //</Container>{/* Room Details */}
            //   {/* <Grid2 xs={12} md={8}>
            //     <CardContent>
            //       <Typography variant="h4" gutterBottom>
            //         {room.name}
            //       </Typography>
            //       <Typography variant="h6" color="text.secondary">
            //         {room.price_per_night} EUR/night
            //       </Typography>
            //       <Typography variant="body1" sx={{ mt: 2 }}>
            //         {room.description}
            //       </Typography>

            //       <Grid2 container spacing={1} sx={{ mt: 2 }}>
            //         {room.amenities.map((amenity, index) => (
            //           <Grid2 key={index}>
            //             <Chip
            //               label={amenity}
            //               color="primary"
            //               variant="outlined"
            //             />
            //           </Grid2>
            //         ))}
            //       </Grid2>
            //     </CardContent>
            //   </Grid2>
            // </Box> */}
          ))}
        </Grid2>
      </Container>
    </div>
  );
};

export default HotelBooking;
