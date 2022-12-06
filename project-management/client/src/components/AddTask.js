import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function AddTask(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); 

    const { projectId } = props;
    const requestBody = { title, description, projectId };

    // Get token from localStorage
    const storedToken = localStorage.getItem('authToken');

    // Send token through request "Authorization" Headers   
    axios
    .post(`${API_URL}/api/tasks`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then((response) => {
      setTitle("");
      setDescription("");
      props.refreshProject();
    })
    .catch((error) => console.log(error));
  };

  return (
    <div className="AddTask">
      <h3>Add New Task</h3>
      
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>

        <label>Description:</label>
        <textarea type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;