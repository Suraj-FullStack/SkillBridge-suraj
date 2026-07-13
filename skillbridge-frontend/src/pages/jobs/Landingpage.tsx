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
        const response = await publicApi.get<Job[]>("/jobs");
        setJobs(response.data);
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
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h1 className="text-5xl font-bold mb-4">Find Your Dream Job</h1>
          <p className="text-xl mb-8">
            Discover opportunities that match your skills
          </p>

          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-3.5 text-gray-400" />
            <Input
              placeholder="Search jobs, companies, or locations..."
              className="pl-12 py-6 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Jobs Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
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