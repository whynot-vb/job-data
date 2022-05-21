import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ButtonAppBar from "../src/components/AppBar";
import CardContainer from "./components/CardContainer";
import FilterFormData from "./components/FilterFormData";
import LogoImage from "./components/LogoImage";
import PaginationComponent from "./components/PaginationComponent";
import LoadingSpinner from "./components/LoadingSpinner";
import FormCreateJob from "./components/FormCreateJob";
import Job from "./components/Job";
import Error from "./pages/Error";
import { getJobs } from "./actionCreators/job";
import Register from "./pages/Register";
import SortData from "./components/SortData";
import Footer from "./components/Footer";

function App() {
  const isLoadingJobs = useSelector((state) => state.jobs.isLoading);
  const isLoadingUsers = useSelector((state) => state.users.isLoading);
  const jobName = useSelector((state) => state.jobs.jobName);
  const companyName = useSelector((state) => state.jobs.companyName);
  const jobLocation = useSelector((state) => state.jobs.jobLocation);
  const technologies = useSelector((state) => state.jobs.technologies);
  const page = useSelector((state) => state.jobs.page);
  const sort = useSelector((state) => state.jobs.sort);
  const isLoading = isLoadingJobs || isLoadingUsers;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch, jobName, companyName, jobLocation, technologies, page, sort]);
  return (
    <Router>
      <>
        <ButtonAppBar />
        <Switch>
          <Route exact path="/">
            {!isLoading && (
              <>
                <LogoImage />
                <FilterFormData />
                <SortData />
                <CardContainer />
                <PaginationComponent />
                <Footer />
              </>
            )}
            {isLoading && (
              <>
                <LoadingSpinner />
              </>
            )}
          </Route>
          <Route exact path="/auth">
            {!isLoading && <Register />}
            {isLoading && <LoadingSpinner />}
          </Route>
          <Route exact path="/addJob">
            {!isLoading && <FormCreateJob />}
            {isLoading && <LoadingSpinner />}
          </Route>
          <Route exact path="/job/:id">
            {!isLoading && <Job />}
            {isLoading && <LoadingSpinner />}
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
