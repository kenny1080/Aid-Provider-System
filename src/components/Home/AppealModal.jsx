import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import * as API from "../../services/api";
import moment from "moment";
import { useSnackbar } from "notistack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 15,
  p: 4,
  borderRadius: "8px",
};

const BasicModal = (props) => {
  const [fromDate, setFromDate] = React.useState(new Date());
  const [toDate, setToDate] = React.useState(new Date());
  let profile = localStorage.getItem("profile");

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const action = (key) => (
    <>
      <Button
        onClick={() => {
          closeSnackbar(key);
        }}
      >
        Dismiss
      </Button>
    </>
  );

  const handleClose = () => {
    props.toggle();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const appealDetails = {
      appealName: data.get("appealName"),
      description: data.get("description"),
      fromDate: moment(fromDate).format("YYYY-MM-DDThh:mm:ss"),
      toDate: moment(toDate).format("YYYY-MM-DDThh:mm:ss"),
      status: "ACTIVE",
      organizationId: JSON.parse(profile).organizationId,
    };
    console.log(appealDetails);
    API.addAppeal(appealDetails)
      .then((res) => {
        if (!res.ok) {
          const error = res;
          return Promise.reject(error);
        }
        enqueueSnackbar("Appeal successfully created.", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          action,
          autoHideDuration: 3000,
        });
        handleClose();
      })
      .catch((error) => {
        enqueueSnackbar("Error processing appeal. Please try again later.", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          action,
          autoHideDuration: 3000,
        });
      });
  };

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.toggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 id="child-modal-title">Fill in Appeal Details</h2>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="appealName"
                  required
                  fullWidth
                  id="appealName"
                  label="Appeal Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    minDateTime={new Date()}
                    renderInput={(props) => <TextField {...props} />}
                    label="From Date"
                    value={fromDate}
                    onChange={(newValue) => {
                      setFromDate(newValue);
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    minDateTime={fromDate}
                    renderInput={(props) => <TextField {...props} />}
                    label="To Date"
                    value={toDate}
                    onChange={(newValue) => {
                      setToDate(newValue);
                    }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Appeal
            </Button>
          </Box>
          <br></br>
          <div style={{ float: "right" }}>
            <Button
              variant="contained"
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
