import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchData } from '../api';
import { BASE_URL } from '../constants';

describe('fetchData', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    global.fetch = mockFetch;
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch and return JSON data successfully', async () => {
    const mockResponse = { data: 'test' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse), // Removed 'async' keyword
    });

    const params = { action: 'test', page: 'Test_Page' };
    const data = await fetchData<{ data: string }>(params);

    expect(mockFetch).toHaveBeenCalledWith(
      `${BASE_URL}?action=test&page=Test_Page`
    );
    expect(data).toEqual(mockResponse);
  });

  it('should throw an error if response is not ok', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const params = { action: 'test', page: 'Test_Page' };

    await expect(fetchData(params)).rejects.toThrow('HTTP error! status: 404');
  });
});
