import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import SongPage from "./pages/SongPage";
import ArtistPage from "./pages/ArtistPage";
import { useState } from "react";
import Header from "./Components/Header";
import Lyrics from "./components/Lyrics";
import "./App.css";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/song",
    element: <SongPage/>,
  },
  {
    path: "/Artist",
    element: <ArtistPage />,
  },
]);
function App() {
  const [showError, setShowError] = useState(false);
  if (showError) {
    setShowError(true);
    throw new Error("Oops! Something went wrong");
  }
  return (
    <div>
      <RouterProvider router={Router} />
      <Header/>
      <Lyrics/>
    </div>
  );
}
export default App;
