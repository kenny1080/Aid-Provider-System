import * as React from "react";
import ResponsiveAppBar from "../AppBar/AppBar";
import CustomizedTables from "./AppealTable";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default function HomePage() {
  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    padding: theme.spacing(1),
    fontSize: 20,
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

  return (
    <div>
      <ResponsiveAppBar />
      <br /> <br /> <br />
      <Container>
        <Div>Appeal List</Div>
        <br />
        <CustomizedTables />
      </Container>
      <Copyright sx={{ mt: 10 }} />
    </div>
  );
}
