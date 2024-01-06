/* import logo from "./logo.svg"; */
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";
import { Button, ButtonGroup } from "@chakra-ui/react";
import Homepage from "./Pages/Homepage";
import Chatpage from "./Pages/Chatpage";

function App() {
  return (
    <div className="App">
      <Route path="/" component={Homepage} exact />
      <Route path="/chats" component={Chatpage} />
    </div>
  );
}

export default App;
