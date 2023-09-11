import React, { useLayoutEffect } from "react";
import PageLayout from "./Containers/PageLayout/PageLayout";
import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import pages from "./utils/all_pages.json";
import ComingSoonPage from "./Components/ComingSoonPage/ComingSoonPage";
import HomePage from "./Containers/HomePage/HomePage";
import LoginPage from "./Components/LoginPage/LoginPage";
import LocationPage from "./Containers/LocationPage/LocationPage";
import TermsAndConditionsPage from "./Containers/TermsAndConditionsPage/TermsAndConditionsPage";
import axios from "axios";
import "./App.css";
import GetAQuote from "Containers/GetAQuote/GetAQuote";
import SignupPage from "./Components/SignupPage/SignupPage";

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

const App = () => {
  const nonPlaceHolderPages = [
    "/location",
    "/terms-and-conditions",
    "/get-a-quote",
    "login",
  ];
  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/", // Replace with your backend server URL
  });

  // temporary until pages created
  const routeAllPagesComingSoon = () => {
    return pages
      .filter((page) => {
        return !nonPlaceHolderPages.includes(page.pageLink);
      })
      .map((page) => (
        <Route
          key={page.pageLink}
          path={page.pageLink}
          element={<ComingSoonPage />}
        />
      ));
  };

  return (
    <BrowserRouter>
      <Wrapper>
        <div className="watercolor-bg">
          <PageLayout>
            <Routes>
              <Route key="/" path="/" element={<HomePage />} />
              <Route
                key="/location"
                path="/location"
                element={<LocationPage />}
              />
              <Route
                key="/terms-and-conditions"
                path="/terms-and-conditions"
                element={<TermsAndConditionsPage api={api} />}
              />
              <Route path="/gallery" element={<ComingSoonPage />}>
                <Route
                  path="/gallery/wedding-and-anniversary"
                  element={<ComingSoonPage />}
                />
                <Route path="/gallery/birthday" element={<ComingSoonPage />} />
                <Route
                  path="/gallery/christening-and-communion"
                  element={<ComingSoonPage />}
                />
                <Route path="/gallery/cupcakes" element={<ComingSoonPage />} />
              </Route>
              <Route
                key="/signup"
                path="/signup"
                element={<SignupPage api={api} />}
              />
              <Route
                key="/login"
                path="/login"
                element={<LoginPage api={api} />}
              />
              <Route
                key="/get-a-quote"
                path="/get-a-quote"
                element={<GetAQuote api={api} />}
              />
              {routeAllPagesComingSoon()}
            </Routes>
          </PageLayout>
        </div>
      </Wrapper>
    </BrowserRouter>
  );
};
export default App;
