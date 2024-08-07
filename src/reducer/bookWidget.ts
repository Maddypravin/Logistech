import { createSlice } from "@reduxjs/toolkit";
const initialList: Array<any> = [];
const todosSlice = createSlice({
  name: "bookWidgetList",
  initialState: initialList,
  reducers: {
    todoAdded(state, action) {
      state.unshift(action?.payload);
    },
    todoEmpty(state, action) {
      state = [];
    },
  },
});

export const { todoAdded, todoEmpty } = todosSlice.actions;
export default todosSlice.reducer;
