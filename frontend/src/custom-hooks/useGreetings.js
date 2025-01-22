import { useState, useEffect } from "react";

const useGreetings = (user) => {
  const [greetings, setGreetings] = useState([]);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGreetings = async () => {
      try {
        const response = await fetch("/api/greetings", {
          method: "GET",
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch greetings");
        }
        const data = await response.json();
        setGreetings(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGreetings();
  }, [user]);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (!result.trim()) {
      alert("Greeting cannot be empty!");
      return;
    }
    try {
      const response = await fetch("/api/greetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ message: result }),
      });

      if (!response.ok) {
        throw new Error("Failed to save input greetings");
      }
      const savedResult = await response.json();
      setGreetings((prevGreetings) => [...prevGreetings, savedResult]);
      setResult(" ");
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteGreeting = async (id) => {
    try {
      const response = await fetch(`/api/greetings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete greeting");
      }
      setGreetings((prevGreetings) =>
        prevGreetings.filter((greeting) => greeting.id !== id)
      );
    } catch (error) {
      alert(error.message);
    }
  };

  return {
    greetings,
    result,
    setResult,
    loading,
    error,
    handleOnSubmit,
    deleteGreeting,
  };
};

export default useGreetings;
