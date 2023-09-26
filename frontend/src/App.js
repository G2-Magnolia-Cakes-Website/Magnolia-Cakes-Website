import React, { useLayoutEffect } from "react";
import PageLayout from "./Containers/PageLayout/PageLayout";
import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import pages from "./utils/all_pages.json";
import ComingSoonPage from "./Components/ComingSoonPage/ComingSoonPage";
import HomePage from "./Containers/HomePage/HomePage";
import LoginPage from "./Components/LoginPage/LoginPage";
import PasswordPage from "./Components/ForgotPassword/ForgotPasswordPage";
import PasswordResetPage from "./Components/ForgotPassword/ResetPasswordPage";
import LocationPage from "./Containers/LocationPage/LocationPage";
import TermsAndConditionsPage from "./Containers/TermsAndConditionsPage/TermsAndConditionsPage";
import GalleryPage from "./Containers/GalleryPage/GalleryPage"
import SignupPage from "./Components/SignupPage/SignupPage";
import FAQsPage from "./Components/FAQs/FAQsPage";
import OnlineStorePage from "./Containers/OnlineStorePage/OnlineStorePage";
import GetAQuote from "Containers/GetAQuote/GetAQuote";
import FlavoursAndServings from "Containers/FlavoursAndServings/FlavoursAndServings";
import AboutUsPage from "Containers/AboutUsPage/AboutUsPage";
import axios from "axios";
import "./App.css";
import ContactUsPage from "Containers/ContactUsPage/ContactUsPage";

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
    "/flavours-and-servings",
  ];
  // Define the base URL based on the environment, only one of them should be used at a time
  //const baseURL = "https://backend-dot-alpine-avatar-399423.ts.r.appspot.com/"; // Uncomment this before deploying
  const baseURL = "http://127.0.0.1:8000/"; // Uncomment this when you run it locally
  const api = axios.create({
    baseURL,
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
          <PageLayout api={api}>
            <Routes>
              <Route key="/" path="/" element={<HomePage api={api} />} />
              <Route
                key="/location"
                path="/location"
                element={<LocationPage api={api} />}
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
                key="/flavours-and-servings"
                path="/flavours-and-servings"
                element={<FlavoursAndServings api={api} />}
              />
              <Route
                key="about-us"
                path="about-us"
                element={<AboutUsPage api={api} />}
              />
              <Route 
                path="/gallery"
                key ="/gallery"
                element={<GalleryPage api ={api} />}>
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
              <Route
                key="/contact-us"
                path="/contact-us"
                element={<ContactUsPage api={api} />}
              />
              <Route key="/faq" path="/faq" element={<FAQsPage api={api} />} />
              <Route
                key="/forgot-password"
                path="/forgot-password"
                element={<PasswordPage api={api} />}
              />
              <Route
                key="/reset-password"
                path="/reset-password"
                element={<PasswordResetPage api={api} />}
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
