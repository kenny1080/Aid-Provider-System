import * as React from "react";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import ResponsiveAppBar from "../AppBar/AppBar";
import * as API from "../../services/api";
import { useSearchParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useSnackbar } from "notistack";

const DisbursementForm = () => {
  let profile = localStorage.getItem("profile");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  function Copyright(props) {
    return (
      <div style={{ bottom: 0 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          {...props}
        >
          {"Copyright © "}
          <Link color="inherit" href="https://mui.com/">
            Your Website
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </div>
    );
  }

  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    padding: theme.spacing(1),
    fontSize: 20,
  }));

  const FormPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(5),
  }));

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [selectedContributions, setSelectedContributions] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedContributions(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  let [searchParams, setSearchParams] = useSearchParams();
  const appealId = searchParams.get("appealId");
  const applicationId = searchParams.get("applicationId");

  const [applicant, setApplicant] = useState(null);
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    let mounted = true;
    API.getApplicant(applicationId).then((item) => {
      if (mounted) {
        setApplicant(item);
        console.log(item);
      }
    });

    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let mounted = true;
    API.getPendingContributions(appealId).then((item) => {
      if (mounted) {
        setContributions(item);
        console.log(item);
      }
    });

    return () => (mounted = false);
  }, []);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedContributions.length === 0) {
      enqueueSnackbar("Please select atleast one contribution for applicant.", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        action,
        autoHideDuration: 3000,
      });
    } else {
      const disbursementDetails = {
        disbursementItems: selectedContributions,
        applicationId: applicationId,
        organizationId: JSON.parse(profile).organizationId,
      };
      console.log(disbursementDetails);
      API.makeDisbursement(disbursementDetails)
        .then((res) => {
          window.location =
            "/disbursement/list?organizationId=" +
            JSON.parse(profile).organizationId;
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const downloadFile = () => {
    window.location =
      "http://localhost:8080/application/download?fileId=" +
      applicant.documentId;
  };

  return (
    <div>
      <ResponsiveAppBar />
      <br /> <br /> <br />
      <Container>
        {" "}
        <Div>{"Application Disbursement Form"}</Div>
        <br />
        <FormPaper>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="applicationId"
                  required
                  fullWidth
                  id="applicationId"
                  label="Application ID"
                  autoFocus
                  disabled
                  value={applicant != null ? applicant.applicationId : ""}
                />
              </Grid>{" "}
              <Grid item xs={12} sm={6}>
                <TextField
                  name="applicantName"
                  required
                  fullWidth
                  id="applicantName"
                  label="Applicant's Name"
                  autoFocus
                  disabled
                  value={applicant != null ? applicant.name : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Select Contributions
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={selectedContributions}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {contributions.map((item) => (
                      <MenuItem
                        key={item.contributionId}
                        value={item.contributionId}
                      >
                        <Checkbox
                          checked={
                            selectedContributions.indexOf(item.contributionId) >
                            -1
                          }
                        />

                        <ListItemText
                          primary={
                            item.item != null ? item.item : "RM " + item.value
                          }
                          secondary={"By " + item.name}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="warning"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => {
                    downloadFile();
                  }}
                >
                  Download & Review Supporting Document
                </Button>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Disburse
            </Button>
          </Box>
        </FormPaper>
      </Container>
      <Copyright sx={{ mt: 8, mb: 3 }} />
    </div>
  );
};

export default DisbursementForm;
