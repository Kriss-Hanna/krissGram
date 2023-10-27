import { Routes, Route } from "react-router-dom";

import "./globals.css";
const App = () => {
  return (
    <main className=" flex h-screen">
      <Routes>
        <Route path="/" />
      </Routes>
      <h2 className="text-3xl underline">salut</h2>
    </main>
  )
}

export default App