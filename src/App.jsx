import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import ContactLayout from "./layouts/ContactLayout";
import FAQLayout from "./layouts/FAQLayout";
import ServiceLayout from "./layouts/ServiceLayout";
import UserLayout from "./layouts/UserLayout";
import BookingLayout from "./layouts/BookingLayout";
import SubscribersLayout from "./layouts/SubscribersLayout";

// Pages
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Contact from "./pages/Contact/Contact";
import FAQ from "./pages/FAQ/FAQ";

import User from "./pages/Users/User";
import CreateUser from "./pages/Users/CreateUser";

import Service from "./pages/Services/Services";
import CreateService from "./pages/Services/CreateService";

import Subscribers from "./pages/Subscribers/Subscribers";

import Booking from "./pages/Booking/Booking";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          {/* Protected Routes */}
          <Route
            path="/"
            // element={<AdminLayout />}
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />

            {/* Contact Section with Nested Routes */}
            <Route path="contact" element={<ContactLayout />}>
              <Route index element={<Contact />} />
              <Route path="new" element={<Contact />} />
              <Route path="in-progress" element={<Contact />} />
              <Route path="resolved" element={<Contact />} />
              <Route path="archived" element={<Contact />} />
            </Route>

            {/* FAQ Section with Nested Routes */}
            <Route path="faq" element={<FAQLayout />}>
              <Route index element={<FAQ />} />
            </Route>

            <Route path="service" element={<ServiceLayout />}>
              <Route index element={<Service />} />
              <Route path="create" element={<CreateService />} />
            </Route>

            <Route path="users" element={<UserLayout />}>
              <Route index element={<User />} />
              <Route path="create" element={<CreateUser />} />
            </Route>

            <Route path="booking" element={<BookingLayout />}>
              <Route index element={<Booking />} />
            </Route>

            <Route path="subscribers" element={<SubscribersLayout />}>
              <Route index element={<Subscribers />} />
            </Route>
          </Route>

          {/* Catch all - redirect to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
