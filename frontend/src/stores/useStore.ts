import { useContext } from "react";
import {  StoresTaskContext } from "./taskStoreContext";

export const useStores = () => useContext(StoresTaskContext);