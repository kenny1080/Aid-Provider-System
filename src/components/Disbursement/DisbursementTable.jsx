import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import * as API from "../../services/api";
import ResponsiveAppBar from "../AppBar/AppBar";
import { Container, Typography } from "@mui/material";
import Link from "@mui/material/Link";

const DisbursementTable = () => {
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

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
    ":hover": {
      cursor: "pointer",
      backgroundColor: theme.palette.primary.light,
    },
  }));

  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    padding: theme.spacing(1),
    fontSize: 20,
  }));

  const [list, setList] = useState([]);
  let profile = localStorage.getItem("profile");

  useEffect(() => {
    let mounted = true;
    API.getDisbursements(JSON.parse(profile).organizationId).then((items) => {
      if (mounted) {
        setList(items);
        console.log(items);
      }
    });

    return () => (mounted = false);
  }, []);

  return (
    <>
      <ResponsiveAppBar />
      <br /> <br /> <br />
      <Container>
        <Div>Disbursement List</Div>
        <br />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Disbursement ID</StyledTableCell>
                <StyledTableCell align="center">Appeal Name</StyledTableCell>
                <StyledTableCell align="center">
                  Appeal's Organization
                </StyledTableCell>
                <StyledTableCell align="center">
                  Applicant's Name
                </StyledTableCell>
                <StyledTableCell align="center">
                  Received Contributions
                </StyledTableCell>
                <StyledTableCell align="center">
                  Estimated Value
                </StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.length ? (
                list.map((row) => (
                  <StyledTableRow key={row.disbursementId} onClick={() => {}}>
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.disbursementId}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.appealName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.organizationName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <b>{row.name}</b>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.receivedContributions.map((item) => (
                        <Typography
                          key={item}
                          sx={{ fontSize: 15 }}
                          color="text.primary"
                        >
                          {item}
                        </Typography>
                      ))}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      RM {row.estimatedValues}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.status}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell colSpan={7} align="center">
                    No Disbursement from you yet.
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Copyright sx={{ mt: 10, mb: 3 }} />
    </>
  );
};

export default DisbursementTable;
