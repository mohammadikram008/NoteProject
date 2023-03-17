import React, { useState, useEffect, Fragment } from "react";
import moment from "moment/moment";
import SnackbarShow from "./SnackbarShow";
import axios from "axios";
import Popup from "./Popup";
import Display from "./Display";

//firebase
import { uid } from "uid";
import { initializeApp } from "firebase/app";
import {
  set,
  ref,
  remove,
  getDatabase,
  onValue,
  update,
} from "firebase/database";
import { Button } from "reactstrap";
const Note = () => {
  //state
  const [title, setTitle] = useState(""),
    [body, setBody] = useState(""),
    [todos, setTodos] = useState([]),
    [isOpen, setIsOpen] = useState(false),
    [isOpendis, setIsOpendis] = useState(false),
    [message, setMessage] = useState(""),
    [open, setOpen] = useState(false),
    [isEdit, setIsEdit] = useState(false),
    [temUuid, setTemUuid] = useState("");

  //firebase config
  const firebaseConfig = {
      apiKey: "AIzaSyBLEoQ3inwhB-f8x43Ng6itV1qnqZgAZfA",
      authDomain: "testproject-2caf8.firebaseapp.com",
      databaseURL: "https://testproject-2caf8-default-rtdb.firebaseio.com",
      projectId: "testproject-2caf8",
      storageBucket: "testproject-2caf8.appspot.com",
      messagingSenderId: "479231542564",
      appId: "1:479231542564:web:ad5cbc084531f5226d5fb1",
      measurementId: "G-MLHQPSCPYK",
    },
    app = initializeApp(firebaseConfig),
    db = getDatabase(app);

  //funcation
  const handleupdate = (todo) => {
      console.log("todo", todo);
      setIsEdit(true);
      setTemUuid(todo.uuid);
      setIsOpen(true);
      setTitle(todo.title);
      setBody(todo.body);
      setIsOpendis(false);
    },
    handleTitleChange = (event) => {
      setTitle(event.target.value);
    },
    togglePopup = () => {
      setIsOpen(!isOpen);
    },
    handleClose = () => {
      setIsOpen(false);
      setIsEdit(!isEdit);
      setTitle("");
      setBody("");
    },
    toggledisplayPopup = () => {
      setIsOpendis(!isOpendis);
    },
    handleCloseDis = () => {
      setIsOpendis(!isOpendis);
      setIsEdit(!isEdit);
    },
    handleBodyChange = (event) => {
      setBody(event.target.value);
    };

  ///write on firebase
  const handleSaveNote = async () => {
      const time = moment().format(" h:mm:ss a"),
        uuid = uid(),
        value = set(ref(db, `/${uuid}`), {
          title,
          body,
          time,
          uuid,
        });

      if (value) {
        setOpen(true);
        setMessage({ text: "Note Save  SuccessFully", type: "success" });
        setTitle("");
        setBody("");
      } else {
        setOpen(true);
        setMessage({ text: "Failed to Save Note", type: "danger" });
      }

      //use fetch to post data into firebase
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
    },
    //delete from firebase
    handleDelete = () => {
      console.log("temUUId", temUuid);
      const removedata = remove(ref(db, `/${temUuid}`));

      if (removedata) {
        setOpen(true);
        setMessage({ text: "Note Delete  SuccessFully", type: "success" });
        // setIsEdit(false);
        setIsOpen(false);
      } else {
        setOpen(true);
        setMessage({ text: "Failed to delete Note", type: "danger" });
      }
    },
    // display from firebase
    handleDisplayNote = () => {
      console.log("db", db);
      let arr = [];
      onValue(ref(db), (snapshot) => {
        const data = snapshot.val();
        for (let [key, value] of Object.entries(data)) {
          arr.push(value);
        }
        console.log("data", data);
      });
      console.log("arr", arr);
      setTodos(arr);

      // if (displayvalue) {
      //   setOpen(true);
      //   setMessage({ text: "App open  SuccessFully", type: "success" });
      // } else {
      //   setOpen(true);

      //   setMessage({ text: "Failed to open App ", type: "danger" });
      // }
      // get data from firebase useing axios

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
    },
    // update to firbase
    handlesubmit = () => {
      const time = moment().format(" h:mm:ss a");
      const updatedata = update(ref(db, `/${temUuid}`), {
        title,
        body,
        time,
        uuid: temUuid,
      });

      if (updatedata) {
        setOpen(true);
        setMessage({ text: "Note Update SuccessFully", type: "success" });
        setTodos([]);
        setTitle("");
        setBody("");
        setOpen(true);
        setIsOpen(false);
        // setIsEdit(false);
      } else {
        setOpen(true);
        setMessage({ text: "Failed to Update Note ", type: "danger" });
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
          New Note
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
                      <Button onClick={handlesubmit} className="btn-save">
                        Update
                      </Button>
                      <Button onClick={handleDelete} className="btn-save">
                        Delete
                      </Button>
                    </>
                  ) : (
                    <button onClick={handleSaveNote} className="btn-save">
                      Save
                    </button>
                  )}
                </div>
              </>
            }
            handleClose={handleClose}
          />
        )}
        {isOpendis && (
          <Display
            content={
              <>
                <h1>Your Notes</h1>

                <div className="note">
                  <div>
                    {todos.map((item, index) => (
                      <div className="note-block" key={index}>
                        <div
                          className="display-table"
                          onClick={() => handleupdate(item)}
                        >
                          <p className="title">Title:{item.title}</p>
                          <p className="time">Time:{item.time}</p>
                        </div>
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
