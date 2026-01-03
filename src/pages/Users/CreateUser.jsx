import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Phone,
  User,
  Mail,
  Lock,
  ChevronLeft,
  AlertCircle,
  Loader2,
} from "lucide-react";

import { useCreateAdminMutation } from "../../features/users/userApiSlice";

const CreateUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone_number: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [user, { isLoading }] = useCreateAdminMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await user(formData).unwrap();
      navigate("/users");
    } catch (err) {
      setError(
        err?.data?.message || "Failed to Create Service. Please try again."
      );
    }
  };
  return (
    <section className="p-4 min-h-screen bg-neutral-50 animate-fade-in">
      <div className="space-y-6">
        {/* Breadcrumb / Back Button */}
        <button
          onClick={() => navigate("/users")}
          className="flex items-center text-sm font-medium text-neutral-500 hover:text-primary-600 hover:cursor-pointer transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to Users
        </button>

        {/* Header Section */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-neutral-900">
            Create New Admin
          </h1>
          <p className="text-neutral-500 text-lg">
            Grant system-wide access by creating a new administrator account.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="card shadow-xl border-t-4 border-t-primary-600">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="flex items-center p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md">
                <AlertCircle className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 gap-y-6 gap-x-8 md:grid-cols-2">
              {/* Phone Number - Full Width for better emphasis */}
              <div className="md:col-span-2">
                <label
                  htmlFor="phone_number"
                  className="block text-sm font-semibold text-neutral-700 mb-1.5"
                >
                  Phone Number
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
                    <Phone className="h-5 w-5 text-neutral-400 group-focus-within:text-primary-500 transition-colors" />
                  </div>
                  <input
                    id="phone_number"
                    name="phone_number"
                    type="tel"
                    required
                    className="input pl-12 h-12 text-lg focus:ring-2 focus:ring-primary-500/20"
                    placeholder="98-xxx-xx-xxx"
                    value={formData.phone_number}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Names Row */}
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-sm font-semibold text-neutral-700 mb-1.5"
                >
                  First Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
                    <User className="h-5 w-5 text-neutral-400 group-focus-within:text-primary-500 transition-colors" />
                  </div>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    required
                    className="input pl-12 h-11"
                    placeholder="John"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="last_name"
                  className="block text-sm font-semibold text-neutral-700 mb-1.5"
                >
                  Last Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
                    <User className="h-5 w-5 text-neutral-400 group-focus-within:text-primary-500 transition-colors" />
                  </div>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    required
                    className="input pl-12 h-11"
                    placeholder="Doe"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Account Details Heading */}
              <div className="md:col-span-2 pt-4">
                <div className="h-px bg-neutral-200 w-full relative">
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 bg-white pr-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">
                    Account Credentials
                  </span>
                </div>
              </div>

              {/* Email & Password */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-neutral-700 mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
                    <Mail className="h-5 w-5 text-neutral-400 group-focus-within:text-primary-500 transition-colors" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="input pl-12 h-11"
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-neutral-700 mb-1.5"
                >
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
                    <Lock className="h-5 w-5 text-neutral-400 group-focus-within:text-primary-500 transition-colors" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="input pl-12 h-11"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/users")}
                className="btn-secondary px-6 hover:cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary flex-1 md:flex-none md:min-w-[160px] h-11 shadow-lg shadow-primary-500/30 transition-all hover:scale-[1.02] hover:cursor-pointer active:scale-95 disabled:opacity-70 disabled:hover:scale-100 disabled:active:scale-100"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Creating...
                  </span>
                ) : (
                  "Create Admin"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateUser;
