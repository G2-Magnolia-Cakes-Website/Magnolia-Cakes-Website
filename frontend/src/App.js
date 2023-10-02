import React, { useLayoutEffect, useState } from "react";
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
import UserProfilePage from "Components/UserProfile/ProfilePage"
import "./App.css";
import ContactUsPage from "Containers/ContactUsPage/ContactUsPage";
import WorkshopPage from "Containers/WorkshopPage/Workshop";
import { PAGELINKS } from "utils/constants";

/*
* axios instance
* Set base url in it
* interceptor logic 
*/
import api from './axios'; 

/*
* Authentication Context (to update everything after login and logout, not persistent)
Persistent authentication is handled using localstorage where we store
- access_token
- refresh_token
- email
- first_name
- last_name
*/
import { AuthProvider } from './AuthContext';

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

const App = () => {

  const [isAuth, setIsAuth] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuth(true);
  };

  const nonPlaceHolderPages = [
    "/location",
    "/terms-and-conditions",
    "/flavours-and-servings",
  ];

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
    <AuthProvider>
      <BrowserRouter>
        <Wrapper>
          <div className="watercolor-bg">
            <PageLayout api={api} isAuth={isAuth} setIsAuth={setIsAuth}>
              <Routes>
                <Route
                  key="/"
                  path="/"
                  element={<HomePage api={api} />}
                />
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
                <Route path="/gallery" element={<GalleryPage api ={api} />}>
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
                  element={<LoginPage api={api} handleLoginSuccess={handleLoginSuccess} />}
                />
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
                <Route
                  key="/faq"
                  path="/faq"
                  element={<FAQsPage api={api} />}
                />
                <Route
                  key={PAGELINKS.PROFILE_LINK}
                  path={PAGELINKS.PROFILE_LINK}
                  element={<UserProfilePage api={api} />}
                />
                <Route
                key="/workshop"
                path="/workshop"
                element={<WorkshopPage api={api} />}
              />
              {routeAllPagesComingSoon()}
              </Routes>
            </PageLayout>
          </div>
        </Wrapper>
      </BrowserRouter>
    </AuthProvider>
  );
};
export default App;

