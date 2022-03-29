import * as React from "react";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useSearchParams } from "react-router-dom";
import * as API from "../../services/api";
import { styled } from "@mui/material/styles";
import ResponsiveAppBar from "../AppBar/AppBar";
import Paper from "@mui/material/Paper";
import { useSnackbar } from "notistack";
import Typography from "@mui/material/Typography";
import * as Helper from "../../util/helper";

const ApplicationForm = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const appealId = searchParams.get("appealId");
  const [appeal, setAppeal] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    padding: theme.spacing(1),
    fontSize: 20,
  }));

  const FormPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(5),
  }));

  const Input = styled("input")({
    display: "none",
  });

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const action = (key) => (
    <>
      <Button
        onClick={() => {
          closeSnackbar(key);
          console.log(key);
        }}
      >
        <Typography color="white" sx={{ fontSize: 12 }}>
          Dismiss
        </Typography>
      </Button>
    </>
  );

  useEffect(() => {
    let mounted = true;
    API.getAppealDetails(appealId).then((item) => {
      if (mounted) {
        setAppeal(item);
        console.log(item);
      }
    });

    return () => (mounted = false);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (
      Helper.isNull(selectedFile) ||
      Helper.isNull(data.get("name")) ||
      Helper.isNull(data.get("address")) ||
      Helper.isNull(data.get("income"))
    ) {
      enqueueSnackbar("Some details are missing in application form.", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        action,
        autoHideDuration: 3000,
      });
    } else {
      var formdata = new FormData();
      formdata.append("document", selectedFile);
      formdata.append("name", data.get("name"));
      formdata.append("address", data.get("address"));
      formdata.append("income", data.get("income"));
      formdata.append("appealId", appealId);

      API.applyAppeal(formdata)
        .then((res) => {
          console.log(res);
          if (!res.ok) {
            const error = res;
            return Promise.reject(error);
          }
          window.location = "/application/success";
        })
        .catch((error) => {
          enqueueSnackbar(
            "Error when processing your application. Try again later.",
            {
              variant: "error",
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
              action,
              autoHideDuration: 3000,
            }
          );
        });
    }
  };

  const onFileChange = (event) => {
    // Update the state
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div>
      <ResponsiveAppBar />
      <br /> <br /> <br />
      <Container>
        <Div>{"Appeal Application Form"}</Div>
        <br />
        <FormPaper>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="appealId"
                  required
                  fullWidth
                  id="appealId"
                  label="Appeal ID"
                  autoFocus
                  disabled
                  value={appeal != null ? appeal.appealId : ""}
                />
              </Grid>{" "}
              <Grid item xs={12} sm={6}>
                <TextField
                  name="appealName"
                  required
                  fullWidth
                  id="appealName"
                  label="Appeal Name"
                  autoFocus
                  disabled
                  value={appeal != null ? appeal.appealName : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label
                  htmlFor="contained-button-file"
                  style={{ float: "left" }}
                >
                  <Input
                    id="contained-button-file"
                    type="file"
                    onChange={(e) => {
                      onFileChange(e);
                    }}
                  />
                  <Button variant="contained" component="span" color="warning">
                    Upload Supporting Document
                  </Button>
                  &nbsp; &nbsp; &nbsp;
                  {selectedFile?.name}
                </label>
              </Grid>
              <Grid item xs={12} sm={6}></Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name per Identity Card"
                  name="name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  id="income"
                  label="Income"
                  name="income"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Apply
            </Button>
          </Box>
        </FormPaper>
      </Container>
    </div>
  );
};

export default ApplicationForm;
