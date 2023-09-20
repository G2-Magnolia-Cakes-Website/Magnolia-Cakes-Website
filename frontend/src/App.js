import React, { useLayoutEffect } from "react";
import PageLayout from "./Containers/PageLayout/PageLayout";
import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import pages from "./utils/all_pages.json";
import ComingSoonPage from "./Components/ComingSoonPage/ComingSoonPage";
import HomePage from "./Containers/HomePage/HomePage";
import LoginPage from "./Components/LoginPage/LoginPage";
import LocationPage from "./Containers/LocationPage/LocationPage";
import TermsAndConditionsPage from "./Containers/TermsAndConditionsPage/TermsAndConditionsPage";
import SignupPage from "./Components/SignupPage/SignupPage";
import FAQsPage from "./Components/FAQs/FAQsPage";
import OnlineStorePage from "./Containers/OnlineStorePage/OnlineStorePage";
import AboutUsPage from "Containers/AboutUsPage/AboutUsPage";
import "./App.css";

import api from './axios'; // Import the axios instance

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

const App = () => {

  const nonPlaceHolderPages = ["/location", "/terms-and-conditions"];
  // Define the base URL based on the environment, only one of them should be used at a time
  
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
          <PageLayout api={api}>
            <Routes>
              <Route key="/" path="/" element={<HomePage />} />
              <Route
                key="/location"
                path="/location"
                element={<LocationPage />}
              />
              <Route
                key="/online-store"
                path="/online-store"
                element={<OnlineStorePage api={api} />}
              />
              <Route
                key="/terms-and-conditions"
                path="/terms-and-conditions"
                element={<TermsAndConditionsPage api={api} />}
              />
              <Route
                key="about-us"
                path="about-us"
                element={<AboutUsPage api={api} />}
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
              <Route key="/faq" path="/faq" element={<FAQsPage api={api} />} />
              {routeAllPagesComingSoon()}
            </Routes>
          </PageLayout>
        </div>
      </Wrapper>
    </BrowserRouter>
  );
};
export default App;
