import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignInSide from "./components/SignIn/SignInSide";
import HomePage from "./components/Home/Home";
import AppealDetail from "./components/AppealDetail/AppealDetail";
import ApplicationForm from "./components/Application/ApplicationForm";
import DisbursementForm from "./components/Disbursement/DisbursementForm";
import ContributionForm from "./components/Contribution/ContributionForm";
import DisbursementTable from "./components/Disbursement/DisbursementTable";
import SuccessApplicationPage from "./components/Home/Success/SuccessApplication";
import SuccessContributionPage from "./components/Home/Success/SuccessContribution";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            exact
            path="/organization/signIn"
            element={<SignInSide />}
          ></Route>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route exact path="/appeal/detail" element={<AppealDetail />}></Route>
          <Route
            exact
            path="/appeal/application/apply"
            element={<ApplicationForm />}
          ></Route>
          <Route
            exact
            path="/appeal/application/disbursement"
            element={<DisbursementForm />}
          ></Route>
          <Route
            exact
            path="/appeal/contribution"
            element={<ContributionForm />}
          ></Route>
          <Route
            exact
            path="/disbursement/list"
            element={<DisbursementTable />}
          ></Route>
          <Route
            exact
            path="/application/success"
            element={<SuccessApplicationPage />}
          ></Route>
          <Route
            exact
            path="/contribution/success"
            element={<SuccessContributionPage />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
