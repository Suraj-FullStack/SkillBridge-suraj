import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { privateApi } from "@/lib/axios";

export default function CreateJob() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    minimumSalary: "",
    maximumSalary: "",
    jobType: "FullTime",
    deadlineDate: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await privateApi.post("/Job/Create", {
        Title: form.title,
        Description: form.description,
        Company: form.company,
        Location: form.location,
        MinimumSalary: parseFloat(form.minimumSalary) || 0,
        MaximumSalary: parseFloat(form.maximumSalary) || 0,
        JobType: form.jobType,
        DeadlineDate: form.deadlineDate,
      });
      alert("Job created successfully");
      navigate("/");
    } catch (err: any) {
      alert(err.response?.data || "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-6 rounded shadow"
      >
        <h2 className="text-2xl font-semibold mb-4">Create Job</h2>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label>Title</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div>
            <Label>Company</Label>
            <Input
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              required
            />
          </div>

          <div>
            <Label>Location</Label>
            <Input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </div>

          <div>
            <Label>Job Type</Label>
            <Input
              value={form.jobType}
              onChange={(e) => setForm({ ...form, jobType: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Minimum Salary</Label>
              <Input
                type="number"
                value={form.minimumSalary}
                onChange={(e) =>
                  setForm({ ...form, minimumSalary: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Maximum Salary</Label>
              <Input
                type="number"
                value={form.maximumSalary}
                onChange={(e) =>
                  setForm({ ...form, maximumSalary: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <Label>Deadline</Label>
            <Input
              type="date"
              value={form.deadlineDate}
              onChange={(e) => setForm({ ...form, deadlineDate: e.target.value })}
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Job"}
          </Button>
        </div>
      </form>
    </div>
  );
}