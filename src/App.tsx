import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";
import { LoginGateModal } from "./components/common/LoginGateModal";

// Public Pages
import { HomePage } from "./pages/HomePage";
import { InventoryPage } from "./pages/InventoryPage";
import { CarDetailPage } from "./pages/CarDetailPage";
import { SellCarPage } from "./pages/SellCarPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";

// Admin Pages
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminCarsPage } from "./pages/admin/AdminCarsPage";
import { AdminPurchasesPage } from "./pages/admin/AdminPurchasesPage";
import { AdminSalesPage } from "./pages/admin/AdminSalesPage";
import { AdminEnquiriesPage } from "./pages/admin/AdminEnquiriesPage";
import { AdminValuationsPage } from "./pages/admin/AdminValuationsPage";
import { AdminDocumentsPage } from "./pages/admin/AdminDocumentsPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-slate-950 font-sans selection:bg-rose-500 selection:text-white">
          <Navbar />
          <div className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/cars/:id" element={<CarDetailPage />} />
              <Route path="/sell" element={<SellCarPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/cars" element={<AdminCarsPage />} />
              <Route path="/admin/purchases" element={<AdminPurchasesPage />} />
              <Route path="/admin/sales" element={<AdminSalesPage />} />
              <Route path="/admin/enquiries" element={<AdminEnquiriesPage />} />
              <Route path="/admin/valuations" element={<AdminValuationsPage />} />
              <Route path="/admin/documents" element={<AdminDocumentsPage />} />

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />

          {/* Global Interactive Login Gate Modal */}
          <LoginGateModal />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
