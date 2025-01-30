import { useState, useEffect } from "react";

const useHotelBooking = (user) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [roomTypes, setRoomTypes] = useState("");
  const [selectedRoomTypes, setSelectedRoomTypes] = useState("");

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await fetch("/api/room-types", {
          method: "GET",
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch greetings");
        }
        const data = await response.json();
        //console.log(data);
        setRoomTypes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRoomTypes();
  }, [user]);

  const handleRoomTypesChange = (event) => {
    setSelectedRoomTypes(event.target.value);
  };

  return {
    open,
    loading,
    error,
    roomTypes,
    setRoomTypes,
    selectedRoomTypes,
    handleOpenModal,
    handleCloseModal,
    handleRoomTypesChange,
  };
};

export default useHotelBooking;
