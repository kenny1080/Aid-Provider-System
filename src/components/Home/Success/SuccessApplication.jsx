import * as React from "react";
import ResponsiveAppBar from "../../AppBar/AppBar";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import "./Success.css";

const SuccessApplicationPage = () => {
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
          <h1>Success</h1>
          <p>
            We received your application request;
            <br /> we'll be reviewing it shortly!
          </p>
          <br />
          <Link href="/">Go Home</Link>
        </div>
      </Container>
    </>
  );
};

export default SuccessApplicationPage;
