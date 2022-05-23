import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  let [students, setStudents] = useState([]);
  let [control, setControl] = useState(false);
  let [user, setUser] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then((response) => response.json())
      .then((data) => setStudents(data));
  }, [control]);

  const handleForm = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/students", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        user: user,
      }),
    }).then((response) => {
      setUser("");
      if (response.status === 201) {
        setControl(!control);
      }
    });
  };

  return (
    <div className="App">
      <h1>WCS students</h1>
      <form onSubmit={handleForm}>
        <input
          value={user}
          onChange={(event) => setUser(event.target.value)}
          placeholder="Student name..."
        />
        <button>Add student</button>
      </form>
      <h3>List of students</h3>
      <ul>
        {students.map((element) => (
          <li key={element.id}>{element.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
