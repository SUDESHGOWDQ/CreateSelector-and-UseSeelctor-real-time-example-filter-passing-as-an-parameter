import { createSlice,createAsyncThunk,createSelector} from "@reduxjs/toolkit";
import axios from 'axios'


export const fetchData = createAsyncThunk('data/fetchData',async ()=>{
    const response = await axios.get('http://localhost:3000/events')
    const data = response.data
    console.log(data);
    return data

})

export const deleteTask = createAsyncThunk('data/deleteTask', async (id) => {
  await axios.delete(`http://localhost:3000/events/${id}`);
  return id;
});



const initialState = {
    events:[],
}


const eventSlice = createSlice({
    name:'events',
    initialState,
   
    extraReducers:(builder)=>{
      builder.addCase(fetchData.fulfilled,(state,action)=>{state.events = action.payload})
      builder.addCase(deleteTask.fulfilled, (state, action) => { state.events = state.events.filter(event=> event.id !== action.payload)})
  }
})





export const selectFilteredEvents = createSelector(
  (state) => state.events.events, // Select the events array from the state
  (_, filter) => filter, // Select the filter value from the parameter
  (events, filter) => {
    if (filter === 'all') {
      return events;
    } else {
      return events.filter((event) => event.status === filter);
    }
  }
);




export default eventSlice.reducer