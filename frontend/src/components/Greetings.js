import { useState, useEffect } from "react";
import React from "react";

const Greetings = ({ token }) => {
  const [greetings, setGreetings] = useState([]);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      console.error("No token found");
      return;
    }
    // Fetch
    const fetchGreetings = async () => {
      try {
        const response = await fetch("/api/greetings", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch");
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
  }, [token]);

  // Put greetings
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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: result }),
      });
      if (!response.ok) {
        throw new Error("Failed to save input");
      }
      const savedResult = await response.json();
      setGreetings((prevGreetings) => [...prevGreetings, savedResult]);
      setResult(" ");
    } catch (error) {
      alert(error.message);
    }
  };

  // Remove greetings
  const deleteGreeting = async (id) => {
    try {
      const response = await fetch(`/api/greetings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete greeting");
      }
      // Update the state to remove
      setGreetings((prevGreetings) =>
        prevGreetings.filter((greeting) => greeting.id !== id)
      );
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Greetings</h1>
      <form action="">
        <input
          type="text"
          placeholder="text here"
          value={result}
          onChange={(event) => setResult(event.target.value)}
        />
        <button type="submit" onClick={handleOnSubmit}>
          Send
        </button>
      </form>
      <ul>
        {greetings.map((greeting) => (
          <li key={greeting.id}>
            {greeting.message}
            {"   "}
            <button onClick={() => deleteGreeting(greeting.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Greetings;
