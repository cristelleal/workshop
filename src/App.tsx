import "./App.css";
import Timer from "./components/timer/timer";

function App() {
  const { content } = Timer();
  return (
    <>
    {content}
    </>
  );
}

export default App;
