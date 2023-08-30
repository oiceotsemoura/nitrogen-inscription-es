import axios, { AxiosResponse } from "axios";

export interface LoginReq {
  email: string;
  cpf: string;
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
  const response: AxiosResponse<LoginRes> = await axios.get(
    `https://oox9hmqkb5.execute-api.us-east-1.amazonaws.com/dev/valGetFieldsInfo?email=${values.email}&cpf=${values.cpf}&growing_season=2023:corn:BR:2:SAF`
  );
  return response;
};
