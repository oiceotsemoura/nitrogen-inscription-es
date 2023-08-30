import axios, { AxiosResponse } from "axios";

interface InscriptionReq {
  email: string;
  cpf: string;
  values: Input;
}

interface Input {
  checkstrip_dose: number;
  completed: boolean;
  dose_type: string;
  enrollment_id: number;
  field_status: string;
  nitrogen_dose: number;
  nitrogen_source: string;
  nitrogen_date: string;
}

export const saveValue = async (req: InscriptionReq) => {
  const { cpf, email, values } = req;

  const valuesParsed = {
    ...values,
    enrollment_id: values.enrollment_id as number,
    nitrogen_dose: values.nitrogen_dose ? Number(values.nitrogen_dose) : null,
    checkstrip_dose: values.checkstrip_dose
      ? Number(values.checkstrip_dose)
      : null,
    completed: values.completed as boolean,
  };
  const response: AxiosResponse<any> = await axios.put(
    `https://oox9hmqkb5.execute-api.us-east-1.amazonaws.com/dev/valNitrogenForm?email=${email}&cpf=${cpf}`,
    valuesParsed
  );
  return response;
};
