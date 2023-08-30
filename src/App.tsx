import React from "react";
import Router from "./config/router";
import { Header } from "../src/components/Header/Header";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

function App() {
  return (
    <RecoilRoot>
      <>
        <Header />
        <Router />
      </>
    </RecoilRoot>
  );
}
export default App;
