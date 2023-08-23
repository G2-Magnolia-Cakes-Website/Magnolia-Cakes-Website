import React from "react";
import PageLayout from "./Containers/PageLayout/PageLayout";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import tabs from "./utils/tabs.json";
import ComingSoonPage from "./Components/ComingSoonPage/ComingSoonPage";
import HomePage from "./Containers/HomePage/HomePage";
import LoginPage from "./Components/LoginPage/LoginPage";

import "./App.css";

const App = () => {
  // temporary until pages created
  const routeAllPagesComingSoon = () => {
    return tabs.map((tab) => (
      <Route
        key={tab.tabLink}
        path={tab.tabLink}
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
            <Route key="/login" path="/login" element={<LoginPage />} />
            {routeAllPagesComingSoon()}
          </Routes>
        </PageLayout>
      </div>
    </BrowserRouter>
  );
};
export default App;
