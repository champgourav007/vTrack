import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import './dialogBox.css';
const DialogBox = ({ setShowDialogBox, setDialogDeleteButtonClicked }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setShowDialogBox(false);
  };

  const handleDelete = () => {
    setShowDialogBox(false);
    setDialogDeleteButtonClicked(true);
  };

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
         min-maxWidth={400}
      >
      <div className="wrapper">
        <div id="responsive-dialog-title" className="title">
          {"Are you sure you want to Delete?"}
        </div>
        <div className="dialogActions">
          <Button autoFocus onClick={handleClose}  variant="outlined"  size="large">
            Cancel
          </Button>
          <Button onClick={handleDelete} autoFocus  variant="contained"  size="large" >
            Ok
          </Button>
        </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DialogBox;
