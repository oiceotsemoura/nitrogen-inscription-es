import axios, { AxiosResponse } from "axios";

interface InscriptionReq {
  email: string;

  growing_season: string;

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

  choosen_dose_type: string;

  planting_type: string;
}

export const saveValue = async (req: InscriptionReq) => {
  const { email, growing_season, values } = req;

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
    `https://oox9hmqkb5.execute-api.us-east-1.amazonaws.com/dev/valNitrogenForm`,

    valuesParsed,

    {
      headers: {
        "x-api-key": "teste",
      },

      params: {
        email,

        growing_season,
      },
    }
  );

  return response;
};
