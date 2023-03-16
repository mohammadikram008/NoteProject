import React, { useState, useEffect, Fragment } from "react";
import moment from "moment/moment";
import SnackbarShow from "./SnackbarShow";
import axios from "axios";
import Popup from "./Popup";
import Display from "./Display";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { uid } from "uid";
import {
  set,
  ref,
  remove,
  getDatabase,
  onValue,
  update,
} from "firebase/database";

import { Row, Col, Table, Button } from "reactstrap";
const Note = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [data, setData] = useState("");
  const [todos, setTodos] = useState([]);
  const [notes, setNotes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpendis, setIsOpendis] = useState(false);
  const [newdata, setNewdata] = useState([]),
    [message, setMessage] = useState(""),
    [open, setOpen] = useState(false);

  const [isEdit, setIsEdit] = useState(false),
    [temUuid, setTemUuid] = useState("");
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const firebaseConfig = {
    apiKey: "AIzaSyBLEoQ3inwhB-f8x43Ng6itV1qnqZgAZfA",
    authDomain: "testproject-2caf8.firebaseapp.com",
    databaseURL: "https://testproject-2caf8-default-rtdb.firebaseio.com",
    projectId: "testproject-2caf8",
    storageBucket: "testproject-2caf8.appspot.com",
    messagingSenderId: "479231542564",
    appId: "1:479231542564:web:ad5cbc084531f5226d5fb1",
    measurementId: "G-MLHQPSCPYK",
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  // const analytics = getAnalytics(app);
  // console.log("analytics", analytics);

  const handleupdate = (todo) => {
    console.log("todo", todo);
    setIsEdit(true);
    setTemUuid(todo.uuid);
    setIsOpen(true);
    setTitle(todo.title);
    setBody(todo.body);
    setIsOpendis(false);
  };
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const toggledisplayPopup = () => {
    setIsOpendis(!isOpendis);
  };
  const handleCloseDis = () => {
    setIsOpendis(false);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  ///write on firebase
  const handleSaveNote = async () => {
    const time = moment().format("MMMM Do YYYY, h:mm:ss a");
    console.log("Time", time);
    const uuid = uid();
    const value = set(ref(db, `/${uuid}`), {
      title,
      body,
      time,
      uuid,
    });

    if (value) {
      setOpen(true);
      setMessage({ text: "Note Save  SuccessFully", type: "success" });
    } else {
      setOpen(true);
      setMessage({ text: "Note Not Save  SuccessFully", type: "danger" });
    }
    // .catch((error) => {
    //   setOpen(true);
    //   setMessage({ text: `${error}`, type: "danger" });
    // });

    // const res = fetch(
    //   "https://testproject-2caf8-default-rtdb.firebaseio.com/notedata.json",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       title,
    //       body,
    //       time,
    //     }),
    //   }
    // );
    // if ((await res).ok) {
    //   setOpen(true);
    //   // setIsLoading(false);
    //   setMessage({ text: "Your Note is Save SuccessFully", type: "success" });
    // } else {
    //   setOpen(true);
    //   // setIsLoading(false);
    //   setMessage({
    //     text: "Your Note is Not  Save SuccessFully",
    //     type: "danger",
    //   });
    // }
    setTitle("");
    setBody("");
  };

  // if (response.ok) {
  //   setNotes(notes.filter((n) => n.id !== note.id));
  //   // TODO: Display success message to user
  // } else {
  //   // TODO: Display error message to user
  // }
  // };
  const handleDelete = (props) => {
    const removedata = remove(ref(db, `/${props}`));

    if (removedata) {
      setOpen(true);
      setMessage({ text: "Note Delete  SuccessFully", type: "success" });
    } else {
      setOpen(true);
      setMessage({ text: "Error Occurr", type: "danger" });
    }
  };
  const handleDisplayNote = () => {
    setTodos([]);
    const displaydata = onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((todo) => {
          setTodos((oldArray) => [...oldArray, todo]);
        });
      }
      if (displaydata) {
        setOpen(true);
        setMessage({ text: "App open  SuccessFully", type: "success" });
      } else {
        setOpen(true);
        setMessage({ text: "Error Occurr", type: "danger" });
      }
      // setNewdata(data);
    });

    // .catch((error) => {
    //   setOpen(true);
    //   setMessage({ text: `${error}`, type: "danger" });
    // });

    // axios
    //   .get(
    //     `https://testproject-2caf8-default-rtdb.firebaseio.com/notedata.json`
    //   )
    //   .then((res) => {
    //     console.log("res", res);
    //     // setData(res.data);
    //     // for (let [key, value] of Object.entries(res.data)) {
    //     //   setNewdata((c) =>
    //     //     c.concat({
    //     //       Body: value.body,
    //     //       Title: value.tsitle,
    //     //       Key: key,
    //     //       Time: value.time,
    //     //     })
    //     //   );
    //     // }
    //   })
    //   .catch((error) => {
    //     setOpen(true);
    //     // setIsLoading(false);
    //     setMessage({ text: `{error}`, type: "danger" });
    //   })

    //   .catch((error) => {
    //     console.log("error", error);
    //   });
    // console.log("Title/body", title, body);
  };
  const handlesubmit = () => {
    const time = moment().format("MMMM Do YYYY, h:mm:ss a");
    const updatedata = update(ref(db, `/${temUuid}`), {
      title,
      body,
      time,
      uuid: temUuid,
    });

    if (updatedata) {
      setOpen(true);
      setMessage({ text: "Note Updata SuccessFully", type: "success" });
      console.log("update", update);
      setTodos("");
      setOpen(true);
    } else {
      setOpen(true);
      setMessage({ text: "Error Occurr", type: "danger" });
    }
  };

  useEffect(() => {
    handleDisplayNote();
  }, []);

  return (
    <Fragment>
      <div className="main-note">
        <h1>Notes App</h1>

        <button onClick={toggledisplayPopup} className="btn-save">
          Display Note
        </button>
        <button onClick={togglePopup} className="btn-save">
          Write Note
        </button>

        {isOpen && (
          <Popup
            content={
              <>
                <h1>Write Your Note</h1>

                <div className="note">
                  <label>Title:</label>
                  <input
                    className="title"
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                  />
                  <label>Body:</label>
                  <textarea
                    className="txtarea"
                    value={body}
                    onChange={handleBodyChange}
                  />
                  {isEdit ? (
                    <>
                      <button onClick={handlesubmit} className="btn-save">
                        Update
                      </button>
                    </>
                  ) : (
                    <button onClick={handleSaveNote} className="btn-save">
                      Save
                    </button>
                  )}
                </div>
              </>
            }
            handleClose={togglePopup}
          />
        )}
        {isOpendis && (
          <Display
            content={
              <>
                <h1>Your Notes</h1>

                <div className="note">
                  <div>
                    {/* <Table>
                      <tbody>
                        {newdata.map((row, i) => (
                          <tr key={i}>
                            <p>{row.title}</p>
                            {row.map((cell, j) => (
                                <td key={j}>{cell}</td>
                              ))}
                          </tr>
                        ))}
                      </tbody>
                    </Table> */}
                    {todos.map((item, index) => (
                      <div className="note-block">
                        <div
                          className="display-table"
                          key={index}
                          onClick={() => handleupdate(item)}
                        >
                          <p>Title:{item.title}</p>
                          <p>Time:{item.time}</p>
                        </div>
                        <Button onClick={() => handleDelete(item.uuid)}>
                          Delete
                        </Button>
                      </div>
                    ))}
                  </div>
                  {/* {newdata.map((note, i) => (
                  ))} */}
                </div>
              </>
            }
            handleCloseDis={handleCloseDis}
          />
        )}
      </div>
      <SnackbarShow open={open} message={message} setOpen={setOpen} />
    </Fragment>
  );
};

export default Note;
