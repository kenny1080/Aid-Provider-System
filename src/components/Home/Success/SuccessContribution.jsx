import * as React from "react";
import ResponsiveAppBar from "../../AppBar/AppBar";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import "./Success.css";

const SuccessContributionPage = () => {
  return (
    <>
      <ResponsiveAppBar />
      <br /> <br /> <br />
      <Container>
        <div className="card">
          <div
            style={{
              borderRadius: "200px",
              height: "200px",
              width: "200px",
              background: " #F8FAF5",
              margin: "0 auto",
            }}
          >
            <i className="checkmark">✓</i>
          </div>
          <h1>Thank you</h1>
          <p>
            Thank you for your kind contribution!
            <br /> Have a nice day ahead!
          </p>
          <br />
          <Link href="/">Go Home</Link>
        </div>
      </Container>
    </>
  );
};

export default SuccessContributionPage;
