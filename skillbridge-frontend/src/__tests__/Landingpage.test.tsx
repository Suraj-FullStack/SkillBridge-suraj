import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LandingPage from '../pages/jobs/Landingpage';
import { publicApi } from '@/lib/axios';

vi.mock('@/lib/axios', () => ({
  publicApi: {
    get: vi.fn(),
  },
}));

const mockJobs = [
  {
    id: 1,
    title: 'Test Engineer',
    company: 'Acme',
    location: 'Kathmandu',
    jobType: 'FullTime',
    minimumSalary: 50000,
    maximumSalary: 80000,
    deadline: '2026-06-30',
    description: 'Test job',
  },
];

beforeEach(() => {
  (publicApi.get as any).mockResolvedValue({ data: mockJobs });
});

describe('LandingPage', () => {
  it('renders hero and job cards', async () => {
    render(<LandingPage />);
    // hero text
    expect(screen.getByText(/Elevate Your Career/i)).toBeTruthy();

    // wait for jobs to load
    await waitFor(() => expect(publicApi.get).toHaveBeenCalled());
    expect(screen.getByText(/Test Engineer/i)).toBeTruthy();
  });

  it('matches snapshot', async () => {
    const { container } = render(<LandingPage />);
    await waitFor(() => expect(publicApi.get).toHaveBeenCalled());
    expect(container).toMatchSnapshot();
  });
});
