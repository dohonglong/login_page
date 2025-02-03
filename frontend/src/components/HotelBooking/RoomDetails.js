import {
  Grid2,
  Box,
  Typography,
  //Card,
  CardMedia,
  //CardContent,
  Container,
  //Chip,
} from "@mui/material";
const RoomDetails = ({ roomTypes }) => {
  return (
    <Container
      maxWidth="false"
      sx={{ marginTop: 4, width: { sx: "90%", sm: "85%" } }}
    >
      <Grid2
        container
        spacing={2}
        sx={{ justifyContent: "center", alignItems: "stretch" }}
      >
        {roomTypes.map((room, id) => (
          <Grid2
            key={id}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              boxShadow: 3,
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
                  height: { xs: "auto", sm: 280 },
                  width: "100%",
                  transition: "transform 0.3s ease-in-out",
                  margin: "auto",
                  display: "block",
                  objectFit: "cover",
                }}
              />
            </Box>

            {/* Room Details */}
            <Box
              sx={{
                flex: 1,
                padding: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h4">{room.name}</Typography>
              <Typography
                variant="body1"
                align="justify"
                sx={{ marginTop: 2, paddingBottom: 2 }}
              >
                {room.description} <br />
                <b>
                  <span style={{ color: "blue", cursor: "pointer" }}>
                    Read more →
                  </span>
                </b>
              </Typography>
              {/* Price boxes */}
              <Grid2
                container
                spacing={1}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: { xs: "center", md: "flex-end" },
                  alignSelf: { xs: "center", md: "flex-end" },
                  marginTop: "auto",
                }}
              >
                <Box
                  sx={{
                    width: "250px",
                    borderRadius: 1,
                    backgroundColor: "#e9e8e7",
                    marginTop: "auto",
                    alignItems: "baseline",
                  }}
                >
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ color: "black" }}
                  >
                    <b>Best Price incl. breakfast</b>
                    <br />
                    Non-refundable
                  </Typography>

                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ color: "black" }}
                  >
                    <span style={{ fontSize: "2rem", fontWeight: "bold" }}>
                      {Math.floor(room.price_per_night)}
                    </span>
                    <span style={{ fontSize: "1rem", marginLeft: "4px" }}>
                      EUR/night
                    </span>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "250px",
                    borderRadius: 1,
                    backgroundColor: "#e9e8e7",
                    marginTop: "auto",
                    alignItems: "baseline",
                  }}
                >
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ color: "black" }}
                  >
                    <b>Full Flex incl. breakfast</b>
                    <br />
                    Free cancellation
                  </Typography>

                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ color: "black" }}
                  >
                    <span style={{ fontSize: "2rem", fontWeight: "bold" }}>
                      {Math.floor(room.price_per_night) + 10}
                    </span>
                    <span style={{ fontSize: "1rem", marginLeft: "4px" }}>
                      EUR/night
                    </span>
                  </Typography>
                </Box>
              </Grid2>
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default RoomDetails;
