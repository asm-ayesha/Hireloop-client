import { getCompanyJobs } from '@/lib/api/jobs';
import JobsTable from './jobsTable';

const RecruiterJobs = async () => {
  const companyId = 'company_123';
  const jobs = await getCompanyJobs(companyId);
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Job Listings</h2>
          <p className="text-white/40 text-sm mt-0.5">{jobs?.length ?? 0} jobs posted</p>
        </div>
        <a
          href="/dashboard/recruiter/jobs/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#3b82f6] hover:bg-[#2563eb] text-white text-sm font-semibold transition-colors shadow-lg shadow-[#3b82f6]/20"
        >
          + Post New Job
        </a>
      </div>
      <JobsTable jobs={jobs ?? []} />
    </div>
  );
};

export default RecruiterJobs;