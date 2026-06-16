"use client";

import { useState, useRef } from "react";
import { Form, TextField, TextArea, Select, Label, Input, FieldError, ListBox, ListBoxItem, toast } from "@heroui/react";
import Image from "next/image";
import { createCompany } from "@/lib/actions/companies";

// ── Icons ──────────────────────────────────────────────────────────
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const UploadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);
const LoaderIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

const INDUSTRIES = ["Technology","Finance","Healthcare","Education","E-commerce","Marketing","Design","Legal","Real Estate","Manufacturing","Logistics","Media","Consulting","Other"];
const EMPLOYEE_RANGES = ["1-10 employees","11-50 employees","51-200 employees","201-500 employees","501-1000 employees","1000+ employees"];

// ── Register Modal ────────────────────────────────────────────────
function RegisterModal({ onClose, onSave }) {
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError("Logo must be under 5MB."); return; }
    setLogo(file);
    setLogoPreview(URL.createObjectURL(file));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    
    const payload = {
    ...data,
    logo: logoPreview ?? "",   
    status: "Pending",  
  };
console.log("companies",payload)
    const result =  await createCompany(payload);
    if(result.insertedId){ 
      toast.success("company profile created successfully")
    }



    setLoading(true);
    setError("");
    try {
      await new Promise((r) => setTimeout(r, 1200)); // TODO: real API
      onSave({ ...data, logo: logoPreview, status: "pending" });
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#1a1a20] border border-white/8 rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-5 border-b border-white/6">
          <div>
            <h2 className="text-lg font-bold text-white">Register New Company</h2>
            <p className="text-white/40 text-xs mt-1">Enter your business details to start hiring on HireLoop.</p>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white/70 transition-colors mt-0.5"><XIcon /></button>
        </div>

        {error && (
          <div className="mx-6 mt-4 flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl px-4 py-3">
            <span>{error}</span>
          </div>
        )}

        <Form onSubmit={handleSubmit} validationBehavior="aria">
          <div className="px-6 py-5 flex flex-col gap-4 max-h-[65vh] overflow-y-auto">

            {/* Row 1: Company Name + Industry */}
            <div className="grid grid-cols-2 gap-4">
              <TextField name="companyName" isRequired className="flex flex-col gap-1.5">
                <Label className="text-xs text-white/50 font-medium text-left">Company Name</Label>
                <Input placeholder="e.g. Acme Corp"
                  className="w-full bg-white/4 border border-white/8 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#3b82f6]/50 transition-all" />
                <FieldError className="text-xs text-red-400" />
              </TextField>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-white/50 font-medium text-left">Industry / Category</label>
                <select name="industry" required
                  className="w-full bg-[#1a1a20] border border-white/8 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[#3b82f6]/50 transition-all appearance-none cursor-pointer">
                  <option value="">Technology</option>
                  {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
            </div>

            {/* Row 2: Website + Location */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-white/50 font-medium text-left">Website URL</label>
                <div className="flex items-center bg-white/4 border border-white/8 rounded-xl overflow-hidden focus-within:border-[#3b82f6]/50 transition-all">
                  <span className="px-3 py-2.5 text-xs text-white/30 border-r border-white/8 whitespace-nowrap shrink-0">https://</span>
                  <input name="website" placeholder="www.company.com"
                    className="flex-1 min-w-0 bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-white/20 outline-none" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-white/50 font-medium text-left">Location</label>
                <div className="flex items-center gap-2 bg-white/4 border border-white/8 rounded-xl px-3 focus-within:border-[#3b82f6]/50 transition-all">
                  <span className="text-white/30 shrink-0"><MapPinIcon /></span>
                  <input name="location" placeholder="City, Country"
                    className="flex-1 min-w-0 bg-transparent py-2.5 text-sm text-white placeholder:text-white/20 outline-none" />
                </div>
              </div>
            </div>

            {/* Row 3: Employee Count + Logo */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-white/50 font-medium text-left">Employee Count Range</label>
                <select name="employeeCount"
                  className="w-full bg-[#1a1a20] border border-white/8 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[#3b82f6]/50 transition-all appearance-none cursor-pointer">
                  {EMPLOYEE_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-white/50 font-medium text-left">Company Logo</span>
                <button type="button" onClick={() => fileRef.current?.click()}
                  className="flex items-center gap-3 bg-white/4 border border-dashed border-white/8 rounded-xl px-3 py-2 hover:bg-white/6 hover:border-white/15 transition-all text-left">
                  {logoPreview
                    ? <Image src={logoPreview} alt="Logo" 
                    width={36}
  height={36} className="w-9 h-9 rounded-lg object-cover border border-white/10 shrink-0" />
                    : <div className="w-9 h-9 rounded-lg bg-white/6 border border-white/10 flex items-center justify-center text-white/30 shrink-0"><UploadIcon /></div>
                  }
                  <div>
                    <p className="text-sm text-white/70">{logo ? logo.name.slice(0, 14) + "…" : "Upload image"}</p>
                    <p className="text-xs text-white/25 mt-0.5">PNG, JPG up to 5MB</p>
                  </div>
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-white/50 font-medium text-left">Brief Description</label>
              <textarea name="description" rows={4}
                placeholder="Tell us about your company's mission and culture..."
                className="w-full bg-white/4 border border-white/8 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#3b82f6]/50 transition-all resize-none leading-relaxed" />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/6 bg-white/2">
            <button type="button" onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm text-white/50 hover:text-white/80 hover:bg-white/5 transition-all">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#0f0f13] text-sm font-bold hover:bg-white/90 disabled:opacity-50 transition-all">
              {loading ? <><LoaderIcon />Registering...</> : "Register Company"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────
const RecruiterCompany = () => {
  const [company, setCompany] = useState(null); // null = no company
  const [showModal, setShowModal] = useState(false);

  const handleSave = (data) => {
    setCompany(data);
    setShowModal(false);
  };

  // ── No company — empty state ──────────────────────────────────
  if (!company) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center px-4 text-center">

        {/* Illustration */}
        <div className="relative mb-8">
          {/* Card illustration */}
          <div className="w-44 h-36 bg-[#1c1c24] border border-white/8 rounded-2xl flex flex-col gap-2 p-4 rotate-[-4deg] shadow-2xl">
            <div className="w-8 h-8 bg-white/8 rounded-lg mb-1" />
            <div className="h-2 bg-white/10 rounded-full w-3/4" />
            <div className="h-2 bg-white/6 rounded-full w-full" />
            <div className="h-2 bg-white/6 rounded-full w-5/6" />
            <div className="h-2 bg-white/6 rounded-full w-2/3 mt-1" />
          </div>
          {/* Badge */}
          <div className="absolute -top-3 -right-3 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0a0a0f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          {/* Confetti dot */}
          <div className="absolute bottom-2 -right-5 text-white/20">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l1.5 4.5H18l-3.75 2.7 1.5 4.5L12 11.1l-3.75 2.6 1.5-4.5L6 6.5h4.5z" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-3">Company not registered yet</h2>
        <p className="text-white/40 text-sm max-w-xs mb-8 leading-relaxed">
          Set up your business profile to start posting high-performance job listings and manage your talent loop.
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 rounded-xl bg-white text-[#0a0a0f] text-sm font-bold hover:bg-white/90 transition-all shadow-lg"
          >
            Register your company
          </button>
          <button className="px-6 py-3 rounded-xl bg-white/6 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/10 transition-all">
            View FAQ
          </button>
        </div>

        <p className="text-white/20 text-xs mt-10">
          Need specialized assistance?{" "}
          <a href="mailto:support@hireloop.com" className="text-white/40 hover:text-white/60 underline underline-offset-2 transition-colors">
            Contact our enterprise support team.
          </a>
        </p>

        {showModal && <RegisterModal onClose={() => setShowModal(false)} onSave={handleSave} />}
      </div>
    );
  }

  // ── Company registered — show details ─────────────────────────
  // (implement company details view here)
  return (
  <div className="min-h-screen bg-[#0a0a0f] px-4 py-10">
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">My Company</h1>
        <p className="text-white/40 text-sm mt-1">Manage your company profile.</p>
      </div>

      {company.status === "pending" && (
        <div className="flex items-center gap-3 bg-yellow-500/8 border border-yellow-500/20 rounded-2xl px-5 py-3.5 text-sm text-yellow-400 mb-4">
          ⏳ Your company is under review.
        </div>
      )}

      <div className="bg-white/[0.03] border border-white/8 rounded-3xl overflow-hidden">
        <div className="flex items-start justify-between px-6 pt-6 pb-5 border-b border-white/6">
          <div className="flex items-center gap-4">
            {company.logo
              ? <img src={company.logo} alt="Logo" className="w-14 h-14 rounded-2xl object-cover border border-white/10" />
              : <div className="w-14 h-14 rounded-2xl bg-[#f97316]/10 border border-[#f97316]/20 flex items-center justify-center text-[#f97316] text-2xl">🏢</div>
            }
            <div>
              <h2 className="text-lg font-bold text-white">{company.companyName}</h2>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border mt-1.5 bg-yellow-500/10 border-yellow-500/25 text-yellow-400">
                Pending Review
              </span>
            </div>
          </div>
          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-white/60 text-sm hover:bg-white/8 hover:text-white transition-all">
            ✏️ Edit
          </button>
        </div>

        <div className="grid grid-cols-2 divide-x divide-y divide-white/6">
          <div className="px-6 py-4"><p className="text-xs text-white/35 mb-1">Industry</p><p className="text-sm text-white/80">{company.industry}</p></div>
          <div className="px-6 py-4"><p className="text-xs text-white/35 mb-1">Location</p><p className="text-sm text-white/80">{company.location}</p></div>
          <div className="px-6 py-4"><p className="text-xs text-white/35 mb-1">Team Size</p><p className="text-sm text-white/80">{company.employeeCount}</p></div>
          <div className="px-6 py-4"><p className="text-xs text-white/35 mb-1">Website</p>
            <a href={`https://${company.website}`} target="_blank" rel="noreferrer" className="text-sm text-[#3b82f6] hover:underline">{company.website}</a>
          </div>
        </div>

        {company.description && (
          <div className="px-6 py-5 border-t border-white/6">
            <p className="text-xs text-white/40 uppercase tracking-widest mb-2">About</p>
            <p className="text-sm text-white/60 leading-relaxed">{company.description}</p>
          </div>
        )}
      </div>
    </div>

    {showModal && <RegisterModal onClose={() => setShowModal(false)} onSave={handleSave} />}
  </div>
);
};

export default RecruiterCompany;