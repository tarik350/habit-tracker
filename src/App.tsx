import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./contexts/AppProvier";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
