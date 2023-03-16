import React, { Fragment } from "react";
import { Alert, Snackbar } from "@mui/material";

const SnackbarShow = ({ open, message, setOpen, noClose }) => {
  return (
    <Fragment>
      {noClose ? (
        <Snackbar open={open} onClose={() => setOpen(false)}>
          <Alert
            onClose={() => setOpen(false)}
            severity={message.type ? message.type : "error"}
            action={
              message.action && message.type === "success" && message.action
            }
          >
            {message.text}
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity={message.type ? message.type : "error"}
            action={
              message.action && message.type === "success" && message.action
            }
          >
            {message.text}
          </Alert>
        </Snackbar>
      )}
    </Fragment>
  );
};

export default SnackbarShow;
