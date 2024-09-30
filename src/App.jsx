import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import AddParticipants from "./pages/AddParticipants";
import AddMatch from "./pages/AddMatch";
import Rankings from "./pages/Rankings";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-participants" element={<AddParticipants />} />
            <Route path="/add-match" element={<AddMatch />} />
            <Route path="/rankings" element={<Rankings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
