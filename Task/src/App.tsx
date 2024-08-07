import { useEffect, useMemo } from "react";
import "./App.css";
import { store } from "../src/reducer";
import { Provider } from "react-redux";
import BookWidget from "./components/BookWidget";
import { initiateSocket } from "./websocket/socket";
function App() {
  const webWorker = useMemo(() => new Worker("./bookOrder.js"), []);
  useEffect(() => {
    initiateSocket(webWorker);
  }, [webWorker]);
  return (
    <Provider store={store}>
      <div className="wrapper">
        <BookWidget webWorker={webWorker} />
      </div>
    </Provider>
  );
}

export default App;
