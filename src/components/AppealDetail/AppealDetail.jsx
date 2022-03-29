import * as React from "react";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import ResponsiveAppBar from "../AppBar/AppBar";
import { useSearchParams } from "react-router-dom";
import * as API from "../../services/api";
import Moment from "react-moment";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ApplicantItemList from "./ApplicantList";
import ContributionList from "./ContributionList";
import Link from "@mui/material/Link";

const AppealDetail = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const appealId = searchParams.get("appealId");
  const [appeal, setAppeal] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [contributions, setContributions] = useState([]);
  let profile = localStorage.getItem("profile");

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

  useEffect(() => {
    let mounted = true;
    API.getApplicants(appealId).then((item) => {
      if (mounted) {
        setApplicants(item);
        console.log(item);
      }
    });

    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let mounted = true;
    API.getContributions(appealId).then((item) => {
      if (mounted) {
        setContributions(item);
        console.log(item);
      }
    });

    return () => (mounted = false);
  }, []);

  const goToApplication = () => {
    window.location = "application/apply?appealId=" + appealId;
  };

  const goToContribution = () => {
    window.location = "/appeal/contribution?appealId=" + appealId;
  };

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  }));

  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    padding: theme.spacing(1),
    fontSize: 20,
  }));

  const Div2 = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    padding: theme.spacing(1),
    fontSize: 16,
  }));

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

  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <ResponsiveAppBar />
      <br /> <br /> <br />
      <Container>
        <Div>{appeal != null ? appeal.organizationName : ""}</Div>
        <Div2>{appeal != null ? appeal.organizationAddress : ""}</Div2>
        <br />
        {appeal != null && (
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Appeal ID: {appealId}
              </Typography>
              <Typography sx={{ mb: 0.5 }} variant="h5" component="div">
                {appeal.appealName}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <Moment format="YYYY/MM/DD">{appeal.fromDate}</Moment>
                &nbsp; - &nbsp;
                <Moment format="YYYY/MM/DD">{appeal.toDate}</Moment>
              </Typography>
              <Typography variant="body2">{appeal.description}</Typography>
              <br />
              {profile == null && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    goToApplication();
                  }}
                >
                  Go to Apply
                </Button>
              )}{" "}
              &nbsp; &nbsp;
              <Button
                variant="contained"
                size="small"
                color="success"
                onClick={() => {
                  goToContribution();
                }}
              >
                Make Contribution
              </Button>
            </CardContent>
            <br />
          </Card>
        )}
        <br />
        <>
          {profile != null && (
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>Applicants</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {applicants.length ? (
                  applicants.map((row) => (
                    <ApplicantItemList detail={row} key={row.applicationId} />
                  ))
                ) : (
                  <Typography sx={{ fontSize: 15 }} color="text.secondary">
                    No Applicants yet.
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>
          )}

          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <Typography>Contributions</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {contributions.length ? (
                contributions.map((row) => (
                  <ContributionList detail={row} key={row.contributionId} />
                ))
              ) : (
                <Typography sx={{ fontSize: 15 }} color="text.secondary">
                  No Contributors yet.
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
        </>
      </Container>
      <Copyright sx={{ mt: 8, mb: 3 }} />
    </>
  );
};

export default AppealDetail;
