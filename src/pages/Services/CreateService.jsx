import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Wrench,
  CircleDollarSign,
  Loader2,
  AlertCircle,
  X,
  Plus,
  Upload,
  Clock,
} from "lucide-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import { useCreateServiceMutation } from "../../features/services/serviceApiSlice";

const isValidSlot = (slot) =>
  slot.start_time && slot.end_time && slot.start_time < slot.end_time;

const hasOverlap = (slots) => {
  if (slots.length <= 1) return false;

  const sorted = [...slots].sort((a, b) =>
    (a.start_time || "").localeCompare(b.start_time || "")
  );

  console.log("Checking overlaps for sorted slots:", sorted);

  for (let i = 0; i < sorted.length - 1; i++) {
    const current = sorted[i];
    const next = sorted[i + 1];

    // Using string comparison for HH:mm format
    if (current.end_time > next.start_time) {
      console.warn(
        `Overlap detected: [${current.start_time} - ${current.end_time}] conflicts with [${next.start_time} - ${next.end_time}]`
      );
      return true;
    }
  }
  return false;
};

const CreateService = () => {
  const [error, setError] = useState("");
  const [service, { isLoading }] = useCreateServiceMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    service_name: "",
    description: "",
    base_price: "",
    duration_minutes: 60,
    is_active: true,
    is_featured: false,
    featured_image: null,
    service_gallery: [],
    availability: [
      {
        start_time: "",
        end_time: "",
      },
    ],
  });

  const [featuredPreview, setFeaturedPreview] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  const addSlot = () => {
    setFormData((prev) => ({
      ...prev,
      availability: [...prev.availability, { start_time: "", end_time: "" }],
    }));
  };

  const removeSlot = (index) => {
    const availability = formData.availability.filter((_, i) => i !== index);
    setFormData({ ...formData, availability });
  };

  const updateSlot = (index, field, value) => {
    const availability = formData.availability.map((slot, i) =>
      i === index ? { ...slot, [field]: value } : slot
    );
    setFormData({ ...formData, availability });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  };

  const handleDescriptionChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      description: content,
    }));
    setError("");
  };

  const handleFeaturedImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        featured_image: file,
      }));
      setFeaturedPreview(URL.createObjectURL(file));
    }
  };

  const removeFeaturedImage = () => {
    setFormData((prev) => ({
      ...prev,
      featured_image: null,
    }));
    setFeaturedPreview(null);
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        service_gallery: [...prev.service_gallery, ...files],
      }));
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setGalleryPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeGalleryImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      service_gallery: prev.service_gallery.filter((_, i) => i !== index),
    }));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("Starting form submission...");
      if (formData.availability.length === 0) {
        throw new Error("At least one availability slot is required");
      }

      for (const slot of formData.availability) {
        if (!isValidSlot(slot)) {
          throw new Error(
            `Invalid time slot: ${slot.start_time || "empty"} to ${
              slot.end_time || "empty"
            }. End time must be after start time.`
          );
        }
      }

      if (hasOverlap(formData.availability)) {
        throw new Error("Some time slots overlap. Please adjust them.");
      }

      console.log("Validation passed. Creating FormData...");
      const data = new FormData();

      data.append("service_name", formData.service_name);
      data.append("description", formData.description);
      data.append("base_price", formData.base_price);
      data.append("duration_minutes", formData.duration_minutes);
      data.append("is_active", formData.is_active);
      data.append("is_featured", formData.is_featured);

      // Append availability as indexed fields so the backend parses it as an array
      formData.availability.forEach((slot, index) => {
        data.append(`availability[${index}][start_time]`, slot.start_time);
        data.append(`availability[${index}][end_time]`, slot.end_time);
      });

      if (formData.featured_image) {
        data.append("featured_image", formData.featured_image);
      }

      formData.service_gallery.forEach((file) => {
        data.append("service_gallery", file);
      });

      console.log("FormData ready. Calling API...");
      const result = await service(data).unwrap();
      console.log("API Success:", result);
      navigate("/service");
    } catch (err) {
      console.error("Submission error:", err);
      setError(err?.data?.message || err.message || "Failed to Create Service");
    }
  };

  return (
    <section className="p-4 md:p-8 min-h-screen bg-neutral-50 animate-fade-in">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Breadcrumb / Back Button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/service")}
            className="flex items-center text-sm font-medium text-neutral-500 hover:text-primary-600 hover:cursor-pointer transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </button>
        </div>

        {/* Header Section */}
        <div className="flex flex-col space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 leading-tight">
            Create New Service
          </h1>
          <p className="text-neutral-500 text-sm md:text-base">
            Configure your new service offering with images and details.
          </p>
        </div>

        <div className="card shadow-xl border-t-4 border-t-primary-600">
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="flex items-center p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md">
                <AlertCircle className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
              <div className="space-y-1.5">
                <label
                  htmlFor="service_name"
                  className="block text-sm font-semibold text-neutral-700"
                >
                  Service Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
                    <Wrench className="h-5 w-5 text-neutral-400 group-focus-within:text-primary-500 transition-colors" />
                  </div>
                  <input
                    id="service_name"
                    name="service_name"
                    type="text"
                    required
                    className="input pl-12 h-11"
                    placeholder="Water Tank Cleaning"
                    value={formData.service_name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="base_price"
                  className="block text-sm font-semibold text-neutral-700"
                >
                  Base Price
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
                    <CircleDollarSign className="h-5 w-5 text-neutral-400 group-focus-within:text-primary-500 transition-colors" />
                  </div>
                  <input
                    id="base_price"
                    name="base_price"
                    type="number"
                    required
                    className="input pl-12 h-11"
                    placeholder="0.00"
                    value={formData.base_price}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="duration_minutes"
                  className="block text-sm font-semibold text-neutral-700"
                >
                  Duration (Minutes)
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
                    <Clock className="h-5 w-5 text-neutral-400 group-focus-within:text-primary-500 transition-colors" />
                  </div>
                  <input
                    id="duration_minutes"
                    name="duration_minutes"
                    type="number"
                    required
                    className="input pl-12 h-11"
                    placeholder="60"
                    value={formData.duration_minutes}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="pb-6">
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-neutral-700 mb-1.5"
              >
                Description
              </label>
              <div className="quill-wrapper">
                <ReactQuill
                  theme="snow"
                  value={formData.description}
                  onChange={handleDescriptionChange}
                  placeholder="Provide a detailed description of the service..."
                  className="bg-white rounded-lg"
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, 3, false] }],
                      ["bold", "italic", "underline", "strike"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["link", "clean"],
                    ],
                  }}
                />
              </div>
            </div>

            <div className="pb-4">
              <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                Featured Image
              </label>
              {!featuredPreview ? (
                <label
                  htmlFor="featured_image"
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-neutral-300 rounded-xl cursor-pointer bg-neutral-50 hover:bg-neutral-100 hover:border-primary-400 transition-all group"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className="p-3 bg-white rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6 text-neutral-400 group-hover:text-primary-500" />
                    </div>
                    <p className="mb-2 text-sm text-neutral-700">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-xs text-neutral-500">
                      High quality images recommended (PNG, JPG, WEBP)
                    </p>
                  </div>
                  <input
                    id="featured_image"
                    name="featured_image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFeaturedImageChange}
                  />
                </label>
              ) : (
                <div className="relative w-full max-w-sm rounded-xl overflow-hidden border-2 border-primary-100 shadow-md group">
                  <img
                    src={featuredPreview}
                    alt="Featured Preview"
                    className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <button
                      type="button"
                      onClick={removeFeaturedImage}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                      title="Remove Image"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <label
                      htmlFor="featured_image_update"
                      className="p-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors shadow-lg cursor-pointer"
                      title="Change Image"
                    >
                      <Upload className="w-5 h-5" />
                    </label>
                    <input
                      id="featured_image_update"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFeaturedImageChange}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="pb-6">
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Service Gallery
              </label>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {galleryPreviews.map((preview, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden border border-neutral-200 group shadow-sm bg-white"
                  >
                    <img
                      src={preview}
                      alt={`Gallery ${index}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                <label className="relative aspect-square rounded-lg border-2 border-dashed border-neutral-300 hover:border-primary-500 hover:bg-primary-50 transition-all cursor-pointer flex flex-col items-center justify-center text-neutral-500 hover:text-primary-600 group">
                  <Plus className="w-8 h-8 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium">Add Image</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleGalleryChange}
                  />
                </label>
              </div>
              {galleryPreviews.length === 0 && (
                <p className="mt-2 text-sm text-neutral-400 italic">
                  No images added yet. Click the "Add Image" button to start
                  building your gallery.
                </p>
              )}
            </div>

            <div className="pb-6 space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-neutral-700">
                  Business Hours / Availability
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {formData.availability.map((slot, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200 shadow-sm relative group"
                  >
                    <div className="flex-1 flex items-center gap-2">
                      <div className="flex flex-col flex-1 gap-1">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                          From
                        </span>
                        <input
                          type="time"
                          className="bg-neutral-50 border border-neutral-200 rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                          value={slot.start_time}
                          onChange={(e) =>
                            updateSlot(index, "start_time", e.target.value)
                          }
                          required
                        />
                      </div>
                      <span className="text-neutral-300 mt-4">-</span>
                      <div className="flex flex-col flex-1 gap-1">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                          To
                        </span>
                        <input
                          type="time"
                          className="bg-neutral-50 border border-neutral-200 rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                          value={slot.end_time}
                          onChange={(e) =>
                            updateSlot(index, "end_time", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                    {formData.availability.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSlot(index)}
                        className="mt-4 p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Remove Slot"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSlot}
                  className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-neutral-200 rounded-xl text-neutral-500 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50 transition-all group"
                >
                  <Plus className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Add Time Slot</span>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-8 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 border-t border-neutral-100 mt-4">
              <button
                type="button"
                onClick={() => navigate("/service")}
                className="btn-secondary w-full sm:w-auto px-8 h-11 hover:cursor-pointer justify-center flex items-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full sm:w-auto min-w-[160px] h-11 shadow-lg shadow-primary-500/30 transition-all hover:scale-[1.02] hover:cursor-pointer active:scale-95 disabled:opacity-70 disabled:hover:scale-100 disabled:active:scale-100"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Creating...
                  </span>
                ) : (
                  "Create Service"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateService;
