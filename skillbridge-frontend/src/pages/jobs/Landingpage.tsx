import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Briefcase, Loader2 } from "lucide-react";
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

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        // backend controller is named `JobController` -> route is /Job
        const response = await publicApi.get<any[]>("/Job");
        // map backend DTO to frontend shape
        const mapped = response.data.map((j) => ({
          id: j.id ?? j.Id,
          title: j.title ?? j.Title,
          company: j.company ?? j.Company,
          location: j.location ?? j.Location,
          jobType: j.jobType ?? j.JobType,
          minimumSalary:
            j.minimumSalary ?? j.Minimumsalary ?? j.MinimumSalary ?? 0,
          maximumSalary:
            j.maximumSalary ?? j.Maximumsalary ?? j.MaximumSalary ?? 0,
          deadline:
            (j.deadline ?? j.DeadLineDate ?? j.DeadlineDate) ||
            j.deadline ||
            new Date().toISOString(),
          description: j.description ?? j.Description,
        } as Job));
        setJobs(mapped);
      }catch (error) {
        console.error("Error fetching jobs:", error);
      }finally {
        setLoading(false);  
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const openJobDetails = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-700 text-white py-24">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight animate__animated animate__fadeInLeft">
                Elevate Your Career with Elevate Workforce
              </h1>
              <p className="text-lg md:text-xl text-sky-100 max-w-xl animate__animated animate__fadeInUp">
                Discover curated opportunities, apply quickly, and grow your career with top employers.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a href="#jobs" className="inline-block">
                  <Button size="lg" className="shadow-lg">Browse Jobs</Button>
                </a>
                <Link to="/admin/jobs/create" className="inline-block">
                  <Button variant="outline" size="lg">Post a Job</Button>
                </Link>
              </div>

              <div className="mt-4 text-sm text-sky-100">
                <Search className="inline-block mr-2 align-middle" />
                Try: "Frontend", "Remote", "Kathmandu"
              </div>
            </div>

            <div className="hidden md:block">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-md animate__animated animate__zoomIn">
                <div className="space-y-3 text-sky-50">
                  <div className="text-sm">Featured</div>
                  <h3 className="font-semibold">Senior Software Engineer</h3>
                  <div className="text-sm opacity-90">TechVision Nepal • Kathmandu</div>
                  <div className="mt-3 text-xs opacity-95">NPR 80,000 - 120,000 • Apply by 2026-06-15</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Section */}
      <div id="jobs" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold mb-8">Featured Jobs</h2>
          {loading && <Loader2 className="animate-spin mx-auto mb-6" />}
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
                    Deadline: {new Date(job.deadline).toLocaleDateString()}
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
      <JobDetailModal 
      job ={selectedJob}
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}