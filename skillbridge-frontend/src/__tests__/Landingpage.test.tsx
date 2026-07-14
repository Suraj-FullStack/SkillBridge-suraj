import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LandingPage from '../pages/jobs/Landingpage';
import { publicApi } from '@/lib/axios';
import { AuthProvider } from '@/context/AuthContext';

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

function renderWithRouter(ui: React.ReactElement) {
  return render(
    <AuthProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </AuthProvider>
  );
}

describe('LandingPage', () => {
  it('renders the hero content', () => {
    const { getByText } = renderWithRouter(<LandingPage />);
    expect(getByText(/Elevate Your Career/i)).toBeTruthy();
  });

  it('renders the job card when data is returned', async () => {
    const { findByText } = renderWithRouter(<LandingPage />);
    expect(await findByText(/Test Engineer/i)).toBeTruthy();
  });
});
