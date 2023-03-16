import { createUniAppAxiosAdapter } from "@uni-helper/axios-adapter";
import axios from "axios";
import { ApiClient } from "./request";

if ("uni" in globalThis) {
  axios.defaults.adapter = createUniAppAxiosAdapter();
}

export const client = new ApiClient();
