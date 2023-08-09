import React from "react";
import PageLayout from "./Containers/PageLayout/PageLayout";
import { Route, Routes } from "react-router-dom";
import tabs from "./utils/tabs.json";
import ComingSoonPage from "./Components/ComingSoonPage/ComingSoonPage";
import HomePage from "./Components/HomePage/HomePage";

const App = () => {
  // temporary until pages created
  const routeAllPagesComingSoon = () => {
    return tabs.map((tab) => (
      <Route path={tab.tabLink} element={<ComingSoonPage />} />
    ));
  };

  return (
    <>
      <PageLayout />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {routeAllPagesComingSoon()}
      </Routes>
    </>
  );
};
export default App;
