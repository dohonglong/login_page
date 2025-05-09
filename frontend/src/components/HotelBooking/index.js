import {
  Button,
  Grid2,
  Box,
  //TextField,
  FormControl,
  //InputLabel,
  Select,
  MenuItem,
  Typography,
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs from "dayjs";
import "dayjs/locale/en-gb"; // Ensures dd/mm/yyyy format
import { useState } from "react";
//import { useState } from "react";

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
  //const [selectedDate, setSelectedDate] = useState(null);
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState({ 1: 1 });
  const [open1, setOpen1] = useState(false);

  const handleRoomChange = (event) => {
    const numberRooms = parseInt(event.target.value, 10) || 1;
    setRooms(numberRooms);
    setGuests((prevGuests) => {
      const newGuests = { ...prevGuests };
      for (let i = 1; i <= numberRooms; i++) {
        if (!(i in newGuests)) newGuests[i] = 1;
      }
      return newGuests;
    });
  };
  const handleGuestChange = (room, event) => {
    const numberGuests = parseInt(event.target.value, 10) || 1;
    setGuests((prevGuests) => ({ ...prevGuests, [room]: numberGuests }));
  };
  const totalGuests = Object.values(guests).reduce((sum, num) => sum + num, 0);

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
          backgroundColor: "#00838e",
          color: "white",
          textAlign: "center",
          padding: 2,
        }}
      >
        <Grid2
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          {/* © 2024 My Website | All Rights Reserved */}
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="en-gb"
          >
            <DatePicker
              label="Arrival Date"
              defaultValue={dayjs()}
              slotProps={{
                textField: {
                  variant: "filled",
                  sx: {
                    backgroundColor: "white",
                    color: "black",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "black" },
                      "&:hover fieldset": { borderColor: "black" },
                      "&.Mui-focused fieldset": { borderColor: "black" },
                    },
                    input: { color: "black" },
                    label: { color: "black" },
                  },
                },
              }}
            />
            <DatePicker
              label="Departure Date"
              defaultValue={dayjs()}
              slotProps={{
                textField: {
                  variant: "filled",
                  sx: {
                    backgroundColor: "white",
                    color: "black",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "black" },
                      "&:hover fieldset": { borderColor: "black" },
                      "&.Mui-focused fieldset": { borderColor: "black" },
                    },
                    input: { color: "black" },
                    label: { color: "black" },
                  },
                },
              }}
            />
          </LocalizationProvider>

          {/* Rooms and Guests */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Rooms selector */}
            <FormControl
              variant="outlined"
              sx={{ minWidth: 200, backgroundColor: "white" }}
            >
              <Select
                displayEmpty
                value={`${rooms} Room${
                  rooms > 1 ? "s" : ""
                }, ${totalGuests} Guest${totalGuests > 1 ? "s" : ""}`}
                onOpen={() => setOpen1(true)}
                onClose={() => setOpen1(false)}
                open={open1}
                //onChange={handleRoomChange}
                renderValue={() =>
                  `${rooms} Room${rooms > 1 ? "s" : ""}, ${totalGuests} Guest${
                    totalGuests > 1 ? "s" : ""
                  }`
                }
                sx={{ backgroundColor: "white", textAlign: "left" }}
              >
                <MenuItem disabled>Choose Number of Rooms</MenuItem>
                <MenuItem>
                  <FormControl variant="outlined" sx={{ minWidth: 100 }}>
                    <Select
                      value={rooms}
                      onChange={handleRoomChange}
                      sx={{ backgroundColor: "white", textAlign: "left" }}
                    >
                      {[1, 2, 3, 4].map((num) => (
                        <MenuItem key={num} value={num}>
                          {num} Room{num > 1 ? "s" : ""}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </MenuItem>
                <MenuItem disabled>Choose Number of Guests</MenuItem>
                {Array.from({ length: rooms }, (_, i) => (
                  <MenuItem key={`room-${i + 1}`}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Typography>Room {i + 1}</Typography>
                      <FormControl variant="outlined" sx={{ minWidth: 100 }}>
                        <Select
                          value={guests[i + 1] || 1}
                          onChange={(event) => handleGuestChange(i + 1, event)}
                          sx={{ backgroundColor: "white", textAlign: "left" }}
                        >
                          {[1, 2, 3, 4, 5, 6].map((num) => (
                            <MenuItem key={num} value={num}>
                              {num} Guest{num > 1 ? "s" : ""}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* <Typography>Room Types</Typography>
          <FormControl
            variant="outlined"
            sx={{ minWidth: 200, backgroundColor: "white" }}
          >
            <Select
              value={selectedRoomTypes}
              onChange={handleRoomTypesChange}
              displayEmpty
              sx={{
                backgroundColor: "white",
                textAlign: "left",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "gray",
                },
              }}
            >
              {!selectedRoomTypes && (
                <MenuItem value="" disabled>
                  Select a Room
                </MenuItem>
              )}

              {roomTypes.map((roomtype) => (
                <MenuItem
                  key={roomtype.id}
                  value={roomtype.name}
                  sx={{ textAlign: "left" }}
                >
                  {roomtype.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
        </Grid2>
      </Box>
    </div>
  );
};

export default HotelBooking;
