import { FiLoader } from "react-icons/fi";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./contexts/AppProvier";
import AppRoutes from "./routes/AppRoutes";
import "./i18n";

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center h-screen gap-4 text-(--color-text-primary)">
          <div className="animate-spin text-4xl">
            <FiLoader />
          </div>
          <p className="text-lg font-medium">Loading your habit tracker...</p>
        </div>
      }
    >
      <AppProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </Suspense>
  );
}

export default App;
