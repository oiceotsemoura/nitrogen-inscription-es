import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { AuthScreen } from "../features/Auth/AuthScreen";
import { InscriptionScreen } from "../features/Inscription/InscriptionScreen";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthScreen />} path="/:growing_season" />
        <Route
          element={<InscriptionScreen />}
          path="/inscription/:growing_season"
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
