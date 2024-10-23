import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Issue, CreateIssuePayload, UpdateIssuePayload } from '../types';
import { getIssues, createIssue, updateIssue, deleteIssue, upvoteIssue } from '../utils/api';
import { CustomError } from '../utils/errorHandling';

interface IssuesState {
  issues: Issue[];
  isLoading: boolean;
  error: CustomError | null;
}

const initialState: IssuesState = {
  issues: [],
  isLoading: false,
  error: null,
};

export const fetchIssues = createAsyncThunk(
  'issues/fetchIssues',
  async (_, { rejectWithValue }) => {
    try {
      const issues = await getIssues();
      return issues;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createNewIssue = createAsyncThunk(
  'issues/createNewIssue',
  async (payload: CreateIssuePayload, { rejectWithValue }) => {
    try {
      const newIssue = await createIssue(payload);
      return newIssue;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateExistingIssue = createAsyncThunk(
  'issues/updateExistingIssue',
  async ({ id, payload }: { id: string; payload: UpdateIssuePayload }, { rejectWithValue }) => {
    try {
      const updatedIssue = await updateIssue(id, payload);
      return updatedIssue;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteExistingIssue = createAsyncThunk(
  'issues/deleteExistingIssue',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteIssue(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const upvoteExistingIssue = createAsyncThunk(
  'issues/upvoteExistingIssue',
  async (id: string, { rejectWithValue }) => {
    try {
      const updatedIssue = await upvoteIssue(id);
      return updatedIssue;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIssues.fulfilled, (state, action: PayloadAction<Issue[]>) => {
        state.isLoading = false;
        state.issues = action.payload;
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as CustomError;
      })
      .addCase(createNewIssue.fulfilled, (state, action: PayloadAction<Issue>) => {
        state.issues.push(action.payload);
      })
      .addCase(updateExistingIssue.fulfilled, (state, action: PayloadAction<Issue>) => {
        const index = state.issues.findIndex((issue) => issue.id === action.payload.id);
        if (index !== -1) {
          state.issues[index] = action.payload;
        }
      })
      .addCase(deleteExistingIssue.fulfilled, (state, action: PayloadAction<string>) => {
        state.issues = state.issues.filter((issue) => issue.id !== action.payload);
      })
      .addCase(upvoteExistingIssue.fulfilled, (state, action: PayloadAction<Issue>) => {
        const index = state.issues.findIndex((issue) => issue.id === action.payload.id);
        if (index !== -1) {
          state.issues[index] = action.payload;
        }
      });
  },
});

export const { clearError } = issuesSlice.actions;
export default issuesSlice.reducer;