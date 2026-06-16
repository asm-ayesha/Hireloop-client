"use client";

import Link from 'next/link';
import { Chip, Table } from "@heroui/react";

// ── Icons ──────────────────────────────────────────────────────────
const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const PencilIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
  </svg>
);
const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
  </svg>
);

// ── Helpers ────────────────────────────────────────────────────────
function statusChip(status) {
  const map = {
    active: { color: "success", label: "Active" },
    closed: { color: "danger",  label: "Closed" },
    draft:  { color: "warning", label: "Draft"  },
    paused: { color: "default", label: "Paused" },
  };
  const { color, label } = map[status] ?? { color: "default", label: status };
  return <Chip color={color} size="sm" variant="soft">{label}</Chip>;
}

function formatSalary(min, max, currency) {
  if (!min && !max) return "—";
  const fmt = (n) => Number(n).toLocaleString();
  return `${currency} ${fmt(min)} – ${fmt(max)}`;
}

function formatDeadline(date) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

// ── Table Component ────────────────────────────────────────────────
export default function JobsTable({ jobs }) {
  return (
    <div className="bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden">
      <Table>
        <Table.ResizableContainer>
          <Table.Content
            aria-label="Company job listings"
            className="min-w-[700px] w-full"
          >
            <Table.Header>
              <Table.Column isRowHeader defaultWidth="2fr" id="job" minWidth={200}>
                Job Title
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="type" minWidth={120}>
                Type
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1.5fr" id="salary" minWidth={160}>
                Salary
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="deadline" minWidth={130}>
                Deadline
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="100px" id="status" minWidth={100}>
                Status
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="120px" id="actions" minWidth={120}>
                Actions
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {jobs.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={6}>
                    <div className="text-center py-16 text-white/30 text-sm">
                      No jobs posted yet.{" "}
                      <Link href="/dashboard/recruiter/jobs/new" className="text-[#3b82f6] hover:underline">
                        Post your first job →
                      </Link>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ) : (
                jobs.map((job) => {
                  const id = job._id?.$oid ?? job._id;
                  return (
                    <Table.Row key={id} id={id}>
                      <Table.Cell>
                        <div>
                          <p className="text-sm font-medium text-white leading-snug">{job.jobTitle}</p>
                          <p className="text-xs text-white/35 mt-0.5">
                            {job.jobCategory}
                            {job.isRemote
                              ? " · Remote"
                              : job.city ? ` · ${job.city}, ${job.country}` : ""}
                          </p>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-sm text-white/60">{job.jobType}</span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-sm text-white/60">
                          {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-sm text-white/60">{formatDeadline(job.deadline)}</span>
                      </Table.Cell>
                      <Table.Cell>
                        {statusChip(job.status)}
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center gap-1">
                          <Link
                            href={`/dashboard/recruiter/jobs/${id}`}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/8 transition-all"
                            title="View Details"
                          >
                            <EyeIcon />
                          </Link>
                          <Link
                            href={`/dashboard/recruiter/jobs/${id}/edit`}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-[#3b82f6] hover:bg-[#3b82f6]/10 transition-all"
                            title="Edit"
                          >
                            <PencilIcon />
                          </Link>
                          <button
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
                            title="Delete"
                            onClick={() => console.log("delete", id)}
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              )}
            </Table.Body>
          </Table.Content>
        </Table.ResizableContainer>
      </Table>
    </div>
  );
}