import React from "react";
import PageLayout from "./Containers/PageLayout/PageLayout";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import tabs from "./utils/tabs.json";
import ComingSoonPage from "./Components/ComingSoonPage/ComingSoonPage";
import HomePage from "./Components/HomePage/HomePage";
import background from "./utils/background-pink-watercolor.png";

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
      <PageLayout>
        <div style={{ backgroundImage: `url(${background})` }}>
          <Routes>
            <Route key="/" path="/" element={<HomePage />} />
            {routeAllPagesComingSoon()}
          </Routes>
        </div>
      </PageLayout>
    </BrowserRouter>
  );
};
export default App;
