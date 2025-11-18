import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import CategoriesPage from "../pages/Categories";
import DashboardPage from "../pages/Dashboard";
import HabitPage from "../pages/Habits";

export default function AppRoutes() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/habits" element={<HabitPage />} />
        <Route path="/dashboard/categories" element={<CategoriesPage />} />
      </Routes>
    </DashboardLayout>
  );
}
