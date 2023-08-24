import React from "react";
import PageLayout from "./Containers/PageLayout/PageLayout";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import pages from "./utils/all_pages.json";
import ComingSoonPage from "./Components/ComingSoonPage/ComingSoonPage";
import HomePage from "./Containers/HomePage/HomePage";
import LocationPage from "./Containers/LocationPage/LocationPage";

import "./App.css";

const App = () => {
  const nonPlaceHolderPages = ["/location"];

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
      <div className="watercolor-bg">
        <PageLayout>
          <Routes>
            <Route key="/" path="/" element={<HomePage />} />
            {routeAllPagesComingSoon()}
            <Route
              key="/location"
              path="/location"
              element={<LocationPage />}
            />
          </Routes>
        </PageLayout>
      </div>
    </BrowserRouter>
  );
};
export default App;
