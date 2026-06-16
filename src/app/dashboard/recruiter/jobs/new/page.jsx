"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Form,
  Fieldset,
  FieldError,
  TextField,
  TextArea,
  Select,
  Label,
  Input,
  Description,
  Button,
  Switch,
  ListBox,
  toast,

} from "@heroui/react";

import { createJob } from "@/lib/actions/jobs";

// ── Inline SVG Icons ──────────────────────────────────────────────
const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
  </svg>
);
const BriefcaseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="12.01" />
  </svg>
);
const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const DollarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const BuildingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18M3 7h18M3 14h18M5 21V7l7-4 7 4v14" />
  </svg>
);
const LoaderIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const AlertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

// ── Mock company data (would come from session/db) ─────────────────
const mockCompany = {
  name: "Acme Technologies Ltd.",
  plan: "Growth",       // Free | Growth | Enterprise
  activeJobs: 4,
  jobLimit: 10,
  approved: true,
};

const planLimits = { Free: 3, Growth: 10, Enterprise: 50 };

// ── Options ───────────────────────────────────────────────────────
const JOB_CATEGORIES = [
  "Engineering", "Design", "Product", "Marketing",
  "Sales", "Finance", "Operations", "Customer Support",
  "Human Resources", "Legal", "Data & Analytics", "Other",
];
const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];
const CURRENCIES = ["USD", "BDT", "EUR", "GBP", "INR", "CAD", "AUD", "SGD"];

export default function PostJobPage() {
  const [isRemote, setIsRemote] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");





  const canPost =
    mockCompany.approved &&
    mockCompany.activeJobs < planLimits[mockCompany.plan];

  const remaining = planLimits[mockCompany.plan] - mockCompany.activeJobs;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canPost) return;

    const data = Object.fromEntries(new FormData(e.currentTarget));
    const jobData = {
      ...data,
      isRemote,
      companyId: "company_123",
      status: "active",
      isPubliclyVisible:true,
    };
    setLoading(true);
    setError("");

    try {
      // TODO: replace with real API call
      await new Promise((r) => setTimeout(r, 1500));
      console.log("Job posted:", { ...data, isRemote });
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }

    const res = await createJob(jobData);
    if (res.insertedId) {
      toast.success("Job posted Successfully!");
      e.target.reset();
      setIsRemote(false);
    }
  };

  // ── Success state ────────────────────────────────────────────────
  if (success) {
    return (
      <main className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
            <span className="text-emerald-400"><CheckIcon /></span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Job Posted!</h2>
          <p className="text-white/40 text-sm mb-8">Your listing is now live and publicly visible to job seekers.</p>
          <div className="flex gap-3 justify-center">
            <Link href="/dashboard/recruiter/jobs" className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm hover:bg-white/8 transition-colors">
              View All Jobs
            </Link>
            <button onClick={() => setSuccess(false)} className="px-5 py-2.5 rounded-xl bg-[#3b82f6] text-white text-sm font-semibold hover:bg-[#2563eb] transition-colors">
              Post Another
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] px-4 py-12">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-150 h-150 bg-[#3b82f6]/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-100 h-100 bg-[#f97316]/6 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-3xl mx-auto">

        {/* Back link */}
        <Link href="/dashboard/recruiter/jobs" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-8 group">
          <span className="group-hover:-translate-x-0.5 transition-transform"><ArrowLeftIcon /></span>
          Back to Jobs
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-[#3b82f6]/15 border border-[#3b82f6]/25 flex items-center justify-center text-[#3b82f6]">
              <BriefcaseIcon />
            </div>
            <h1 className="text-2xl font-bold text-white">Post a New Job</h1>
          </div>
          <p className="text-white/40 text-sm ml-12">Fill in the details below to publish your listing.</p>
        </div>

        {/* Plan quota banner */}
        <div className={`flex items-center gap-3 rounded-2xl border px-5 py-3.5 mb-8 text-sm ${canPost
            ? "bg-emerald-500/8 border-emerald-500/20 text-emerald-400"
            : "bg-red-500/8 border-red-500/20 text-red-400"
          }`}>
          <BuildingIcon />
          <span className="font-medium">{mockCompany.name}</span>
          <span className="text-white/30">·</span>
          <span className="opacity-70">
            {canPost
              ? `${remaining} of ${planLimits[mockCompany.plan]} job slots remaining (${mockCompany.plan} plan)`
              : `Job limit reached on ${mockCompany.plan} plan. Upgrade to post more.`}
          </span>
        </div>

        {/* Global error */}
        {error && (
          <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3 mb-6">
            <AlertIcon /><span>{error}</span>
          </div>
        )}

        <Form onSubmit={handleSubmit} className="flex flex-col gap-6" validationBehavior="aria">

          {/* ── Section 1: Job Info ──────────────────────────────── */}
          <Fieldset className="bg-white/3 border border-white/8 rounded-3xl p-6 backdrop-blur-sm">
            <div className="text-base font-semibold text-white  ">
              Job Information
            </div>
            <p className="text-white/40 text-xs mb-5">Basic details about the position.</p>

            <Fieldset.Group className="flex flex-col gap-4">

              {/* Job Title */}
              <TextField name="jobTitle" isRequired className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium text-white/50 uppercase tracking-widest">Job Title</Label>
                <Input
                  placeholder="e.g. Senior Frontend Engineer"
                  className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#3b82f6]/60 focus:bg-white/6 transition-all"
                />
                <FieldError className="text-xs text-red-400 mt-0.5" />
              </TextField>

              {/* Category + Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select name="jobCategory" isRequired className="flex flex-col gap-1.5" placeholder="Select category">
                  <Label className="text-xs font-medium text-white/50 uppercase tracking-widest">Job Category</Label>
                  <Select.Trigger className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#3b82f6]/60 transition-all flex items-center justify-between">
                    <Select.Value className="data-[placeholder=true]:text-white/20" />
                    <Select.Indicator className="text-white/30" />
                  </Select.Trigger>
                  <Select.Popover className="bg-[#141418] border border-white/10 rounded-2xl shadow-2xl p-1.5 z-50">
                    <ListBox className="outline-none max-h-60 overflow-y-auto">
                      {JOB_CATEGORIES.map((cat) => (
                        <ListBox.Item
                          key={cat} id={cat} textValue={cat}
                          className="px-3 py-2 text-sm text-white/70 rounded-lg hover:bg-white/6 hover:text-white cursor-pointer outline-none selected:text-[#3b82f6] selected:bg-[#3b82f6]/10 transition-colors"
                        >
                          {cat}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                  <FieldError className="text-xs text-red-400 mt-0.5" />
                </Select>

                <Select name="jobType" isRequired className="flex flex-col gap-1.5" placeholder="Select type">
                  <Label className="text-xs font-medium text-white/50 uppercase tracking-widest">Job Type</Label>
                  <Select.Trigger className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#3b82f6]/60 transition-all flex items-center justify-between">
                    <Select.Value className="data-[placeholder=true]:text-white/20" />
                    <Select.Indicator className="text-white/30" />
                  </Select.Trigger>
                  <Select.Popover className="bg-[#141418] border border-white/10 rounded-2xl shadow-2xl p-1.5 z-50">
                    <ListBox className="outline-none">
                      {JOB_TYPES.map((t) => (
                        <ListBox.Item
                          key={t} id={t} textValue={t}
                          className="px-3 py-2 text-sm text-white/70 rounded-lg hover:bg-white/6 hover:text-white cursor-pointer outline-none selected:text-[#3b82f6] selected:bg-[#3b82f6]/10 transition-colors"
                        >
                          {t}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                  <FieldError className="text-xs text-red-400 mt-0.5" />
                </Select>
              </div>

              {/* Salary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <TextField name="salaryMin" className="flex flex-col gap-1.5">
                  <Label className="text-xs font-medium text-white/50 uppercase tracking-widest">Min Salary</Label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"><DollarIcon /></span>
                    <Input type="number" placeholder="50,000" className="w-full bg-white/4 border border-white/8 rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#3b82f6]/60 transition-all" />
                  </div>
                </TextField>

                <TextField name="salaryMax" className="flex flex-col gap-1.5">
                  <Label className="text-xs font-medium text-white/50 uppercase tracking-widest">Max Salary</Label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"><DollarIcon /></span>
                    <Input type="number" placeholder="80,000" className="w-full bg-white/4 border border-white/8 rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#3b82f6]/60 transition-all" />
                  </div>
                </TextField>

                <Select name="currency" className="flex flex-col gap-1.5" defaultValue="USD" placeholder="Currency">
                  <Label className="text-xs font-medium text-white/50 uppercase tracking-widest">Currency</Label>
                  <Select.Trigger className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#3b82f6]/60 transition-all flex items-center justify-between">
                    <Select.Value className="data-[placeholder=true]:text-white/20" />
                    <Select.Indicator className="text-white/30" />
                  </Select.Trigger>
                  <Select.Popover className="bg-[#141418] border border-white/10 rounded-2xl shadow-2xl p-1.5 z-50">
                    <ListBox className="outline-none">
                      {CURRENCIES.map((c) => (
                        <ListBox.Item key={c} id={c} textValue={c}
                          className="px-3 py-2 text-sm text-white/70 rounded-lg hover:bg-white/6 hover:text-white cursor-pointer outline-none selected:text-[#3b82f6] selected:bg-[#3b82f6]/10 transition-colors">
                          {c}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Location + Remote toggle */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-white/50 uppercase tracking-widest">Location</span>
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <span className="text-xs text-white/40 flex items-center gap-1.5"><GlobeIcon />Remote</span>
                    <Switch
                      isSelected={isRemote}
                      onChange={setIsRemote}
                      className="data-[selected=true]:bg-[#3b82f6] bg-white/10 rounded-full w-10 h-5 transition-colors outline-none"
                    />
                  </label>
                </div>
                {!isRemote ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <TextField name="city" className="flex flex-col gap-1.5">
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"><MapPinIcon /></span>
                        <Input placeholder="City" className="w-full bg-white/4 border border-white/8 rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#3b82f6]/60 transition-all" />
                      </div>
                    </TextField>
                    <TextField name="country" className="flex flex-col gap-1.5">
                      <Input placeholder="Country" className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#3b82f6]/60 transition-all" />
                    </TextField>
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5 bg-[#3b82f6]/8 border border-[#3b82f6]/20 rounded-xl px-4 py-3">
                    <span className="text-[#3b82f6]"><GlobeIcon /></span>
                    <span className="text-sm text-[#3b82f6]/80">This is a fully remote position</span>
                  </div>
                )}
              </div>

              {/* Application Deadline */}
              <TextField name="deadline" className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium text-white/50 uppercase tracking-widest">Application Deadline</Label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"><CalendarIcon /></span>
                  <Input
                    type="date"
                    className="w-full bg-white/4 border border-white/8 rounded-xl pl-9 pr-4 py-3 text-sm text-white/70 outline-none focus:border-[#3b82f6]/60 transition-all [scheme-dark]"
                  />
                </div>
              </TextField>

            </Fieldset.Group>
          </Fieldset>

          {/* ── Section 2: Job Description ───────────────────────── */}
          <Fieldset className="bg-white/3 border border-white/8 rounded-3xl p-6 backdrop-blur-sm">
            <div className="text-base font-semibold text-white ">
              Job Description
            </div>
            <p className="text-white/40 text-xs mb-5">Describe what the role involves and what you`re looking for.</p>

            <Fieldset.Group className="flex flex-col gap-4">

              {/* Responsibilities */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-white/50 uppercase tracking-widest">Responsibilities <span className="text-red-400">*</span></label>
                <TextArea
                  name="responsibilities"
                  required
                  placeholder="• Lead the frontend architecture&#10;• Collaborate with designers and PMs&#10;• Mentor junior engineers..."
                  rows={5}
                  className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#3b82f6]/60 focus:bg-white/6 transition-all resize-none leading-relaxed"
                />
              </div>

              {/* Requirements */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-white/50 uppercase tracking-widest">Requirements <span className="text-red-400">*</span></label>
                <TextArea
                  name="requirements"
                  required
                  placeholder="• 3+ years of React experience&#10;• Strong TypeScript skills&#10;• Experience with REST APIs..."
                  rows={5}
                  className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#3b82f6]/60 focus:bg-white/6 transition-all resize-none leading-relaxed"
                />
              </div>

              {/* Benefits (optional) */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-white/50 uppercase tracking-widest flex items-center gap-2">
                  Benefits
                  <span className="normal-case tracking-normal text-white/25 font-normal">— optional</span>
                </label>
                <TextArea
                  name="benefits"
                  placeholder="• Competitive salary & equity&#10;• Remote-first culture&#10;• Health insurance..."
                  rows={4}
                  className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#3b82f6]/60 focus:bg-white/6 transition-all resize-none leading-relaxed"
                />
              </div>

            </Fieldset.Group>
          </Fieldset>

          {/* ── Section 3: Company (auto-filled) ─────────────────── */}
          <Fieldset className="bg-white/3 border border-white/8 rounded-3xl p-6 backdrop-blur-sm">
            <div className="text-base font-semibold text-white ">
              Company
            </div>
            <p className="text-white/40 text-xs mb-5">Auto-filled from your registered company profile.</p>

            <Fieldset.Group>
              <div className="flex items-center justify-between bg-white/3 border border-white/6 rounded-2xl px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f97316]/15 border border-[#f97316]/20 flex items-center justify-center text-[#f97316]">
                    <BuildingIcon />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{mockCompany.name}</p>
                    <p className="text-xs text-white/35 mt-0.5">{mockCompany.plan} Plan · {mockCompany.activeJobs}/{planLimits[mockCompany.plan]} active jobs</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${mockCompany.approved
                    ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400"
                    : "bg-yellow-500/10 border-yellow-500/25 text-yellow-400"
                  }`}>
                  {mockCompany.approved ? "Approved" : "Pending"}
                </span>
              </div>

              {!mockCompany.approved && (
                <p className="text-xs text-yellow-400/80 flex items-center gap-1.5 mt-3">
                  <AlertIcon /> Your company is pending approval. You cannot post jobs until it is approved.
                </p>
              )}
              {!canPost && mockCompany.approved && (
                <p className="text-xs text-red-400/80 flex items-center gap-1.5 mt-3">
                  <AlertIcon /> You`ve reached the {planLimits[mockCompany.plan]}-job limit on the {mockCompany.plan} plan. Upgrade to post more.
                </p>
              )}
            </Fieldset.Group>
          </Fieldset>

          {/* ── Actions ──────────────────────────────────────────── */}
          <div className="flex items-center justify-between pt-2 pb-8">
            <Link
              href="/dashboard/recruiter/jobs"
              className="px-6 py-3 rounded-xl bg-white/4 border border-white/8 text-white/60 text-sm hover:bg-white/7 hover:text-white/80 transition-all"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading || !canPost}
              className="flex items-center gap-2 px-7 py-3 rounded-xl bg-[#3b82f6] hover:bg-[#2563eb] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm shadow-lg shadow-[#3b82f6]/20 transition-all"
            >
              {loading ? <><LoaderIcon /> Publishing...</> : "Publish Job"}
            </button>
          </div>

        </Form>
      </div>
    </main>
  );
}