import React, { useState } from "react";


function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });
  const [isExpanded, setIsExpanded] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function showAlert() {
    const div = document.createElement("div");
    div.className = "alert error";
    div.appendChild(document.createTextNode("Please add all fields."));
    const createArea = document.querySelector(".create-area");
    const form = document.querySelector(".create-note");
    createArea.insertBefore(div, form);

    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  function submitNote(event) {
    
    if (note.title === "" || note.content === "") {

      showAlert();
    } else {
      props.onAdd(note);

      setNote({
        title: "",
        content: ""
      });
    }

    event.preventDefault();
  }

  function expand() {
    
    setIsExpanded(true);
 
  }

  return (
    <div className="create-area">
      <form className="create-note">
        {isExpanded && (
          <input
            className="title"
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          className="textarea"
          name="content"
          onChange={handleChange}
          onClick={expand}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <button onClick={submitNote}>ADD</button>
      </form>
    </div>
  );
}

export default CreateArea;
