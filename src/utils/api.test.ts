import axios from 'axios';
import { getIssues, createIssue, updateIssue, deleteIssue } from './api';
import { mockIssues } from './mockData';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getIssues fetches issues correctly', async () => {
    mockedAxios.get.mockResolvedValue({ data: { data: mockIssues } });
    const result = await getIssues();
    expect(result).toEqual(mockIssues);
    expect(mockedAxios.get).toHaveBeenCalledWith('/issues', expect.any(Object));
  });

  it('createIssue creates an issue correctly', async () => {
    const newIssue = { title: 'New Issue', description: 'Description' };
    mockedAxios.post.mockResolvedValue({ data: { data: newIssue } });
    const result = await createIssue(newIssue);
    expect(result).toEqual(newIssue);
    expect(mockedAxios.post).toHaveBeenCalledWith('/issues', newIssue);
  });

  it('updateIssue updates an issue correctly', async () => {
    const updatedIssue = { id: '1', title: 'Updated Issue' };
    mockedAxios.put.mockResolvedValue({ data: { data: updatedIssue } });
    const result = await updateIssue('1', updatedIssue);
    expect(result).toEqual(updatedIssue);
    expect(mockedAxios.put).toHaveBeenCalledWith('/issues/1', updatedIssue);
  });

  it('deleteIssue deletes an issue correctly', async () => {
    mockedAxios.delete.mockResolvedValue({ data: {} });
    await deleteIssue('1');
    expect(mockedAxios.delete).toHaveBeenCalledWith('/issues/1');
  });
});