import { GET } from '../../app/api/summary/route';
import { getSummary, getSessionFromCookies } from '../../lib/db';

// Mock the db functions
jest.mock('../../lib/db', () => ({
  getSummary: jest.fn(),
  getSessionFromCookies: jest.fn(),
}));

describe('/api/summary', () => {
  it('should return summary data when authenticated', async () => {
    const mockSummary = { customerCount: 10, totalLiters: 100, totalRevenue: 1000 };
    (getSessionFromCookies as jest.Mock).mockResolvedValue({ userId: 1 });
    (getSummary as jest.Mock).mockReturnValue(mockSummary);

    const request = new Request('http://localhost:3000/api/summary');
    const response = await GET(request as any);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual(mockSummary);
  });

  it('should return 401 when not authenticated', async () => {
    (getSessionFromCookies as jest.Mock).mockResolvedValue(null);

    const request = new Request('http://localhost:3000/api/summary');
    const response = await GET(request as any);

    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data).toEqual({ error: 'Unauthorized' });
  });
});