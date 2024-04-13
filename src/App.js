import React, { Component, Suspense } from "react";
import { BrowserRouter, Route, Switch, Routes } from "react-router-dom";
import PreviousAddress from "./pages/PreviousAddress";
const PersonalDetail = React.lazy(() => import("./pages/PersonalDetail"));
function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<PersonalDetail />}></Route>
        <Route path="/previous-address/:id" element={<PreviousAddress />} />
      </Routes>
    </Suspense>
  );
}

export default App;
