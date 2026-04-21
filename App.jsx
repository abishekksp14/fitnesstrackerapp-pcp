import AppRouter from "./router/Approuter.jsx";
import { ActivityProvider } from "./context/ActivityContext.jsx";

function App() {
  return (
    <ActivityProvider>
      <AppRouter />
    </ActivityProvider>
  );
}

export default App;
