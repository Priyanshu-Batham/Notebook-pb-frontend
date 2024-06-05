import { Route, Routes, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { Container } from "@radix-ui/themes";
import OneNote from "./pages/OneNote";

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/about" element={<About />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/getThisOne/:noteId" element={<OneNote />}></Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;
