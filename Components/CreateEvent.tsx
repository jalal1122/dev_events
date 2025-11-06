"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const InputItem = ({
  label,
  type,
  id,
  name,
  placeholder,
  value,
  onChange,
  required = true,
}: {
  label: string;
  type: string;
  id: string;
  name: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) => (
  <div className="input-wrapper">
    <label htmlFor={id}>
      {label} {required && <span className="required">*</span>}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

const CreateEvent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [agendaInput, setAgendaInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    overview: "",
    time: "",
    location: "",
    venue: "",
    audience: "",
    organizer: "",
    description: "",
    mode: "Online" as "Online" | "Offline" | "Hybrid",
    image: null as File | null,
    tags: [] as string[],
    agenda: [] as string[],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please upload a valid image file");
        return;
      }

      setFormData({ ...formData, image: file });

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const tag = tagInput.trim().toLowerCase();
      if (tag && !formData.tags.includes(tag)) {
        setFormData({ ...formData, tags: [...formData.tags, tag] });
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleAddAgenda = () => {
    const item = agendaInput.trim();
    if (item && !formData.agenda.includes(item)) {
      setFormData({ ...formData, agenda: [...formData.agenda, item] });
      setAgendaInput("");
    }
  };

  const handleRemoveAgenda = (index: number) => {
    setFormData({
      ...formData,
      agenda: formData.agenda.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate required fields
      if (formData.tags.length === 0) {
        setError("Please add at least one tag");
        setLoading(false);
        return;
      }

      if (formData.agenda.length === 0) {
        setError("Please add at least one agenda item");
        setLoading(false);
        return;
      }

      if (!formData.image) {
        setError("Please upload an event image");
        setLoading(false);
        return;
      }

      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("date", formData.date);
      submitData.append("overview", formData.overview);
      submitData.append("time", formData.time);
      submitData.append("location", formData.location);
      submitData.append("venue", formData.venue);
      submitData.append("audience", formData.audience);
      submitData.append("organizer", formData.organizer);
      submitData.append("description", formData.description);
      submitData.append("mode", formData.mode.toLowerCase());
      submitData.append("image", formData.image);
      submitData.append("tags", JSON.stringify(formData.tags));
      submitData.append("agenda", JSON.stringify(formData.agenda));

      // Submit to API
      const response = await fetch("/api/events", {
        method: "POST",
        body: submitData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create event");
      }

      // Success!
      setSuccess(true);
      setError(null);

      // Reset form
      setFormData({
        title: "",
        date: "",
        overview: "",
        time: "",
        location: "",
        venue: "",
        audience: "",
        organizer: "",
        description: "",
        mode: "Online",
        image: null,
        tags: [],
        agenda: [],
      });
      setImagePreview(null);

      // Redirect to event page after 2 seconds
      setTimeout(() => {
        router.push(`/events/${data.event.slug}`);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="create-event-form">
      <div className="page-header">
        <h1>Create New Event</h1>
        <p>Fill in the details below to create an amazing event</p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="alert-success">
          <p className="title">✅ Event created successfully!</p>
          <p className="message">Redirecting to event page...</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="alert-error">
          <p className="title">❌ Error:</p>
          <p className="message">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Basic Information */}
        <div className="form-section">
          <h2 className="section-title">Basic Information</h2>
          <div className="form-grid">
            <div className="md:col-span-2">
              <InputItem
                label="Event Title"
                type="text"
                id="title"
                name="title"
                placeholder="e.g., React Summit 2025"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <InputItem
              label="Event Date"
              type="date"
              id="date"
              name="date"
              placeholder="Select event date"
              value={formData.date}
              onChange={handleChange}
            />
            <InputItem
              label="Event Time"
              type="text"
              id="time"
              name="time"
              placeholder="e.g., 09:00 AM - 6:00 PM"
              value={formData.time}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Location Details */}
        <div className="form-section">
          <h2 className="section-title">Location Details</h2>
          <div className="form-grid">
            <InputItem
              label="Venue"
              type="text"
              id="venue"
              name="venue"
              placeholder="e.g., Convention Center"
              value={formData.venue}
              onChange={handleChange}
            />
            <InputItem
              label="Location"
              type="text"
              id="location"
              name="location"
              placeholder="e.g., Amsterdam, Netherlands"
              value={formData.location}
              onChange={handleChange}
            />
            <div className="input-wrapper">
              <label htmlFor="mode">
                Event Mode <span className="required">*</span>
              </label>
              <select
                name="mode"
                id="mode"
                value={formData.mode}
                onChange={handleChange}
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="form-section">
          <h2 className="section-title">Event Details</h2>
          <div className="form-grid">
            <InputItem
              label="Target Audience"
              type="text"
              id="audience"
              name="audience"
              placeholder="e.g., React Developers"
              value={formData.audience}
              onChange={handleChange}
            />
            <InputItem
              label="Organizer"
              type="text"
              id="organizer"
              name="organizer"
              placeholder="e.g., React Community"
              value={formData.organizer}
              onChange={handleChange}
            />
            <div className="md:col-span-2">
              <div className="input-wrapper">
                <label htmlFor="overview">
                  Overview <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="overview"
                  name="overview"
                  placeholder="Brief overview of the event"
                  value={formData.overview}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="input-wrapper">
                <label htmlFor="description">
                  Description <span className="required">*</span>
                </label>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Detailed description of the event"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={5}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="form-section">
          <h2 className="section-title">Tags</h2>
          <div className="input-wrapper">
            <label htmlFor="tags">
              Event Tags <span className="required">*</span>
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="Type and press Enter or comma to add tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
            />
            <p className="helper-text">Press Enter or comma to add tags</p>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
                  <span key={tag} className="tag-chip">
                    {tag}
                    <button type="button" onClick={() => handleRemoveTag(tag)}>
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Agenda */}
        <div className="form-section">
          <h2 className="section-title">Agenda</h2>
          <div className="input-wrapper">
            <label htmlFor="agenda">
              Event Agenda <span className="required">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="agenda"
                name="agenda"
                placeholder="Add agenda item"
                value={agendaInput}
                onChange={(e) => setAgendaInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddAgenda();
                  }
                }}
                className="flex-1"
              />
              <button
                type="button"
                onClick={handleAddAgenda}
                className="add-button"
              >
                Add
              </button>
            </div>
            {formData.agenda.length > 0 && (
              <ul className="mt-2 space-y-2">
                {formData.agenda.map((item, index) => (
                  <li key={index} className="agenda-item">
                    <span className="flex items-center gap-2">
                      <span className="index">{index + 1}.</span>
                      {item}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAgenda(index)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Image Upload */}
        <div className="form-section">
          <h2 className="section-title">Event Image</h2>
          <div className="input-wrapper">
            <label htmlFor="image">
              Upload Image <span className="required">*</span>
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            <p className="helper-text">
              Max size: 5MB. Supported formats: JPG, PNG, GIF
            </p>
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm font-semibold mb-2">Preview:</p>
                <div className="image-preview">
                  <Image
                    src={imagePreview}
                    alt="Event preview"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Creating Event..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
