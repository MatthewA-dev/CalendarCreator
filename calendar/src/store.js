import { configureStore } from "@reduxjs/toolkit";
import input from "./input";

export default configureStore({
  reducer: { input: input },
});
