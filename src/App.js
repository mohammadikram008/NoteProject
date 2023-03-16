import logo from "./logo.svg";
import "./App.css";
import Note from "./components/Note";
import MainPage from "./components/MainPage";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Router,
  BrowserRouter,
  RouterProvider,
  Routes,
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      {/* <Note /> */}
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<MainPage />} /> */}
          <Route path="/" element={<Note />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
