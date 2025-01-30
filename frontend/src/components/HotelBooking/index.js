import {
  Button,
  Grid2,
  //Box,
  Card,
  Paper,
  CardContent,
  Typography,
  //   IconButton,
} from "@mui/material";
//import DeleteIcon from "@mui/icons-material/Delete";
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

  const cardStyle = {
    width: "100%",
    // height: "250px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  };
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
        sx={{
          marginTop: "40px",
          overflowY: "auto",
          justifyContent: "center",
          alignItems: "center",
          // flexDirection: "column",
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
      <Paper
        elevation={3}
        sx={{
          marginTop: "20px",
          padding: 2,
          borderRadius: 2,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Grid2 container spacing={2} justifyContent="center">
          {roomTypes.map((roomtype) => (
            <Grid2 key={roomtype.id} xs={12}>
              <Card value={roomtype.name} sx={cardStyle}>
                <CardContent>
                  <img
                    src={roomtype.image_url}
                    alt={roomtype.name}
                    width={275}
                  />
                  <Typography variant="h6">{roomtype.name}</Typography>
                  {/* <Typography
                    variant="body1"
                    component="div"
                    textAlign="justify"
                  >
                    {roomtype.description}
                  </Typography> */}
                  <Typography variant="body1" component="div">
                    <b>{roomtype.price_per_night}</b> EUR/night
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Paper>
    </div>
  );
};

export default HotelBooking;
