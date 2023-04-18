import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Monitor } from "../../interfaces/monitor.interface";
import { addMonitor, getMonitors } from "../../services/monitor.service";
import { RootState } from "../store";

export const getAllMonitors = createAsyncThunk(
  "monitors/getAllMonitors",
  async (payload: { userId: string; projectId: string }) => {
    const { userId, projectId } = payload;
    const doc = await getMonitors(userId, projectId);
    const monitors: Monitor[] = [];
    if (doc.docs.length > 0) {
      doc.docs.map((monitor) => {
        const monitorData = monitor.data();
        if (monitorData) {
          monitors.push({ ...monitorData, id: monitor.id } as Monitor);
        }
      });
    }
    return monitors;
  }
);

export const addNewMonitor = createAsyncThunk(
  "monitors/addNewMonitor",
  async (payload: { userId: string; projectId: string; monitor: Monitor }) => {
    const { userId, projectId, monitor } = payload;
    const newMonitor = await addMonitor(userId, projectId, monitor);
    return { ...monitor, id: newMonitor.id };
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
        state.monitors = action.payload;
        state.status = "Succeeded";
      }
    );
    builder.addCase(getAllMonitors.rejected, (state: MonitorsState) => {
      state.error = "Unable to get monitors!";
      state.status = "Failed";
    });
    // Store Project
    builder.addCase(addNewMonitor.pending, (state: MonitorsState) => {
      state.status = "Pending";
    });
    builder.addCase(addNewMonitor.fulfilled, (state: MonitorsState, action) => {
      state.monitors.push(action.payload);
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
