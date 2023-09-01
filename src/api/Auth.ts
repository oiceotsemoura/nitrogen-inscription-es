import axios, { AxiosResponse } from "axios";

export interface LoginReq {
  email: string;
}

export interface Input {
  checkstrip_dose?: number;
  completed?: boolean;
  dose_type?: string;
  enrollment_id?: number;
  field_status?: "completed" | "empty" | "started";
  nitrogen_dose?: number;
  nitrogen_source?: string;
  nitrogen_date?: string;
  planting_type?: string;
  choosen_dose_type?: string;
}

interface Field {
  enrollment_id: number;
  field_name: string;
  input: Input;
}

export interface LoginRes {
  email: string;
  fields: Field[];
  growing_season: string;
  name: string;
}

export const login = async (values: LoginReq) => {
  const url = `${window.location.href}`;
  const season = url.split("growing_season=")[1];
  const config = {
    headers: {
      "x-api-key": "test",
    },
  };
  const response: AxiosResponse<LoginRes> = await axios.get(
    `https://oox9hmqkb5.execute-api.us-east-1.amazonaws.com/dev/valGetFieldsInfo?email=${values.email}&growing_season=${season}`,
    config
  );
  return response;
};
