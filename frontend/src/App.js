import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import Home from "./components/Home";
import EditPage from "./components/EditPage";

const App = () => {
  return (
    <div className="container-fluid">
      {/* used hashrouter to fix the window refresh 404 error on the edtpage  related to react router */}
      <HashRouter>
        {/* <Router> */}
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/recipe/:id/update" element={<EditPage />} />
        </Routes>
        {/* </Router> */}
      </HashRouter>
    </div>
  );
};

export default App;
