import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Briefcase, Loader2, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { publicApi } from "@/lib/axios";
import JobDetailModal from "@/components/jobs/JobDetailsModal";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  jobType: string;
  minimumSalary: number;
  maximumSalary: number;
  deadline: string;
  description?: string;
};

type JobDto = {
  id?: number;
  Title?: string | null;
  Description?: string | null;
  Company?: string | null;
  Location?: string | null;
  JobType?: string | null;
  Minimumsalary?: number | null;
  Maximumsalary?: number | null;
  DeadLineDate?: string | null;
  PostedDate?: string | null;
  isActive?: boolean;
  title?: string | null;
  description?: string | null;
  company?: string | null;
  location?: string | null;
  jobType?: string | null;
  minimumSalary?: number | null;
  maximumSalary?: number | null;
  deadline?: string | null;
};


const dummyJobs: Job[] = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechVision Nepal",
    location: "Kathmandu",
    jobType: "FullTime",
    minimumSalary: 80000,
    maximumSalary: 120000,
    deadline: "2026-06-15",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Innovate Labs",
    location: "Pokhara",
    jobType: "FullTime",
    minimumSalary: 60000,
    maximumSalary: 90000,
    deadline: "2026-06-20",
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "CloudSys",
    location: "Biratnagar",
    jobType: "FullTime",
    minimumSalary: 70000,
    maximumSalary: 110000,
    deadline: "2026-06-10",
  },
];

export default function LandingPage() {
  const [jobs, setJobs] = useState<Job[]>(dummyJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [error, setError] = useState<string>("");

  const formatDate = (value: string) => {
    const t = new Date(value).getTime();
    return Number.isNaN(t) ? "—" : new Date(value).toLocaleDateString();
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");

        // backend controller is named `JobController` -> route is /Job
        const response = await publicApi.get<JobDto[]>("/Job");

        // map backend DTO to frontend shape for both camelCase and PascalCase payloads
        const mapped: Job[] = response.data.map((j) => ({
          id: j.id ?? 0,
          title: j.Title ?? j.title ?? "",
          company: j.Company ?? j.company ?? "",
          location: j.Location ?? j.location ?? "",
          jobType: j.JobType ?? j.jobType ?? "",
          minimumSalary: Number(j.Minimumsalary ?? j.minimumSalary ?? 0),
          maximumSalary: Number(j.Maximumsalary ?? j.maximumSalary ?? 0),
          deadline: j.DeadLineDate ?? j.deadline ?? new Date().toISOString(),
          description: j.Description ?? j.description ?? undefined,
        }));

        setJobs(mapped);
      } catch (e: any) {
        setError(e?.response?.data?.message || "Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return jobs;
    return jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q),
    );
  }, [jobs, searchTerm]);

  const openJobDetails = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-sky-700 via-indigo-700 to-violet-800 text-white py-24 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_35%)]" />
          <div className="relative max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm backdrop-blur">
                <Sparkles className="w-4 h-4" />
                Trusted by modern employers and talent
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Elevate Your Career with Elevate Workforce
              </h1>
              <p className="text-lg md:text-xl text-sky-100 max-w-xl">
                Discover curated opportunities, apply quickly, and grow your career with top employers.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a href="#jobs" className="inline-block">
                  <Button size="lg" className="shadow-lg">Browse Jobs</Button>
                </a>
                <Link to="/admin/jobs/create" className="inline-block">
                  <Button variant="outline" size="lg" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
                    Post a Job
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-sky-100">
                <div className="flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Fast-moving roles</div>
                <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Verified employers</div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md shadow-2xl">
              <div className="space-y-3 text-sky-50">
                <div className="text-sm uppercase tracking-[0.25em] text-sky-200">Featured</div>
                <h3 className="font-semibold text-2xl">Senior Software Engineer</h3>
                <div className="text-sm opacity-90">TechVision Nepal • Kathmandu</div>
                <div className="mt-3 text-sm opacity-95">NPR 80,000 - 120,000 • Apply by 2026-06-15</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="jobs" className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          {[
            { label: "Open roles", value: "120+" },
            { label: "Verified partners", value: "40+" },
            { label: "Fast response", value: "24h" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="text-2xl font-semibold text-sky-700">{item.value}</div>
              <div className="text-sm text-slate-600">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-semibold">Job Opportunities</h2>
            <p className="text-sm text-gray-600 mt-1">
              Explore roles from Elevate Workforce Solutions partners.
            </p>
          </div>

          <div className="w-full sm:w-80">
            <div className="flex items-center gap-2 bg-white rounded-xl border px-3 py-2 shadow-sm">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                className="w-full bg-transparent outline-none text-sm"
                placeholder='Search by title, company, or location...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {loading && <Loader2 className="animate-spin mx-auto mb-6" />}
        {!loading && error && (
          <div className="max-w-3xl mx-auto mb-6">
            <div className="p-4 rounded-xl border bg-red-50 text-red-700 text-sm">
              {error}
            </div>
          </div>
        )}

        {!loading && !error && filteredJobs.length === 0 && (
          <div className="max-w-3xl mx-auto mb-6">
            <div className="p-4 rounded-xl border bg-white text-gray-700 text-sm">
              No jobs found for "{searchTerm}".
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> {job.company}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" /> {job.location}
                  </div>

                  <div className="flex gap-2">
                    <Badge variant="secondary">{job.jobType}</Badge>
                    <Badge variant="outline">
                      NPR {job.minimumSalary.toLocaleString()} -{" "}
                      {job.maximumSalary.toLocaleString()}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-500">
                    Deadline: {formatDate(job.deadline)}
                  </p>

                  <Button className="w-full mt-4" onClick={()=> openJobDetails(job)}>
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <section className="mt-16 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <h3 className="text-2xl font-semibold">Why job seekers love Elevate Workforce</h3>
            <p className="mt-2 text-sm text-slate-600">
              From tailored search to quick applications and trusted employers, everything is built to help candidates move faster.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Remote friendly', 'Skill-based matching', 'Direct employer contact', 'Career growth'].map((chip) => (
              <span key={chip} className="rounded-full bg-sky-50 px-3 py-1 text-sm text-sky-700">{chip}</span>
            ))}
          </div>
        </div>
      </section>

      <footer className="mt-10 border-t border-slate-200 bg-white/70 py-6 text-center text-sm text-slate-600">
        Elevate Workforce Solutions • Discover roles that fit your ambition.
      </footer>

      <JobDetailModal 
      job ={selectedJob}
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}