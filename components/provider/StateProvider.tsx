'use client';
import { store } from "@/app-state/app-store";
import { ReactElement } from "react";
import { Provider } from "react-redux";

export default function StateProvider({ children }:{children:ReactElement}) {
  return <Provider store={store}>{children}</Provider>;
}