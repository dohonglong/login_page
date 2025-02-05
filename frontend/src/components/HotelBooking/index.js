import {
  Button,
  Grid2,
  Box,
  TextField,
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
          <TextField
            label="Number of Guests"
            type="number"
            variant="filled"
            sx={{
              backgroundColor: "white",
              "& .MuiInputBase-root": {
                backgroundColor: "white",
              },
              "& .MuiFilledInput-root": {
                backgroundColor: "white",
                "&:hover": { backgroundColor: "#f0f0f0" },
                "&.Mui-focused": { backgroundColor: "white" },
              },
              input: { color: "black" },
              label: { color: "black" },
            }}
          />
          <Box display="flex" flexDirection="column" gap={2}>
            <Select
              label="Number of Rooms"
              variant="filled"
              value={rooms}
              onChange={(e) =>
                setRooms(Math.max(1, parseInt(e.target.value) || 1))
              }
              sx={{ backgroundColor: "white" }}
            >
              {[1, 2, 3, 4].map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
            <TextField
              select
              label="Number of Rooms"
              variant="filled"
              value={rooms}
              onChange={(e) =>
                setRooms(Math.max(1, parseInt(e.target.value) || 1))
              }
              sx={{ backgroundColor: "white" }}
            >
              {[1, 2, 3, 4].map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </TextField>
            {Array.from({ length: rooms }, (_, i) => (
              <TextField
                key={i + 1}
                label={`Guests in Room ${i + 1}`}
                type="number"
                variant="filled"
                sx={{ backgroundColor: "white" }}
              />
            ))}
          </Box>
          <Typography>Room Types</Typography>
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
          </FormControl>
        </Grid2>
      </Box>
    </div>
  );
};

export default HotelBooking;
