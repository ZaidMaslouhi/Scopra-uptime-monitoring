import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Monitor, isMonitor } from "../../interfaces/monitor.interface";
import { addMonitor, getMonitors } from "../../services/monitor.service";
import { RootState } from "../store";
import { isServerError } from "../../utils/interfaces/Error.interface";

export const getAllMonitors = createAsyncThunk(
  "monitors/getAllMonitors",
  async (payload: { userId: string; projectId: string }) => {
    const { userId, projectId } = payload;
    const result = await getMonitors(userId, projectId);

    if (isServerError(result)) throw new Error(result.message);
    return result;
  }
);

export const addNewMonitor = createAsyncThunk(
  "monitors/addNewMonitor",
  async (payload: { userId: string; projectId: string; monitor: Monitor }) => {
    const { userId, projectId, monitor } = payload;
    const result = await addMonitor(userId, projectId, monitor);

    if (isServerError(result)) throw new Error(result.message);

    return result;
  }
);

interface MonitorsState {
  monitors: Monitor[];
  status: "Idle" | "Pending" | "Succeeded" | "Failed";
  error: string | null;
}

const initialState: MonitorsState = {
  monitors: [],
  status: "Idle",
  error: null,
};

const monitorsSlice = createSlice({
  name: "monitors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Projects
    builder.addCase(getAllMonitors.pending, (state: MonitorsState) => {
      state.status = "Pending";
    });
    builder.addCase(
      getAllMonitors.fulfilled,
      (state: MonitorsState, action) => {
        state.monitors = [];
        action.payload.monitors.forEach((monitor: any) => {
          state.monitors.push({
            id: monitor._id,
            name: monitor.name,
            task: monitor.monitor.taskId,
            endpoint: monitor.monitor.uri,
          } as Monitor);
        });
        state.status = "Succeeded";
      }
    );
    builder.addCase(getAllMonitors.rejected, (state: MonitorsState) => {
      state.error = "Unable to get monitors!";
      state.status = "Failed";
    });
    // Store Monitor
    builder.addCase(addNewMonitor.pending, (state: MonitorsState) => {
      state.status = "Pending";
    });
    builder.addCase(addNewMonitor.fulfilled, (state: MonitorsState, action) => {
      const monitor = action.payload?.monitor;
      state.monitors.push({
        id: monitor._id,
        name: monitor.name,
        task: monitor.taskId,
        endpoint: monitor.uri,
      } as Monitor);

      state.status = "Succeeded";
    });
    builder.addCase(addNewMonitor.rejected, (state: MonitorsState) => {
      state.error = "Failed to add new monitor!";
      state.status = "Failed";
    });
  },
});

export const selectMonitorsState = (state: RootState): MonitorsState =>
  state.monitors;

export default monitorsSlice.reducer;
