import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
  TextField,
  CircularProgress,
} from "@mui/material";
import { Input } from "../../../api/Auth";
import { Card, Container, InputField, Label } from "./styles";
import { saveValue } from "../../../api/Inscription";
import { ErrorMessage } from "@hookform/error-message";

const fonteFertilizantes = [
  "Urea granulada (46 %N)",
  "UAN (32 %N)",
  "SolMix (30 %N)",
  "SolMix (28 %N)",
  "SolMix (26 %N)",
  "Nitrodoble (27 %N)",
  "Nitrocomplex (21 %N)",
  "Sulfan (26 %N)",
  "Last N (20 %N)",
  "FoliarSol U (20 %N)",
  "Nitramin (31 %N)",
];

interface FormData {
  nitrogen_dose?: number;
  nitrogen_source?: string;
  dose_type?: string;
  checkstrip_dose?: number;
  nitrogen_date?: string;
}

interface Props {
  fields: Input;
  userData: { cpf: string; email: string };
  changeState: (state: string, index: number) => void;
  index: number;
}

export const FormComponent = ({
  fields,
  userData,
  changeState,
  index,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const values = fields;

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nitrogen_dose: 0,
      checkstrip_dose: 0,
      dose_type: "",
      nitrogen_source: "",
      nitrogen_date: "",
    },
    values,
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const values: any = {
        ...data,
        completed: true,
        field_status: "completed",
      };
      await saveValue({
        cpf: userData.cpf,
        email: userData.email,
        values: {
          checkstrip_dose: values.checkstrip_dose as number,
          completed: values.completed as boolean,
          dose_type: values.dose_type as string,
          enrollment_id: values.enrollment_id as number,
          field_status: values.field_status as string,
          nitrogen_dose: values.nitrogen_dose as number,
          nitrogen_source: values.nitrogen_source as string,
          nitrogen_date: values.nitrogen_date as string,
        },
      });
      changeState("completed", index);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const saveEachInput = async (index: number) => {
    changeState("started", index);
    const data = getValues();
    const values: any = {
      completed: false,
      field_status: "started",
      ...data,
    };

    const res = saveValue({
      cpf: userData.cpf,
      email: userData.email,
      values: {
        checkstrip_dose: values.checkstrip_dose as number,
        completed: false,
        dose_type: values.dose_type as string,
        enrollment_id: values.enrollment_id as number,
        field_status: "started",
        nitrogen_dose: values.nitrogen_dose as number,
        nitrogen_source: values.nitrogen_source as string,
        nitrogen_date: values.nitrogen_date as string,
      },
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Typography
          style={{
            fontWeight: 500,
            fontSize: 18,
            fontFamily: "Roboto",
            color: "#5C5C5C",
            marginBottom: 10,
          }}
        >
          Dose de Nitrogênio (kg N/ha) utilizada em estágios iniciais
          (pré-plantio, emergência). Atenção: refere-se ao nitrogênio como
          elemento, não à fonte do fertilizante.
        </Typography>
        <InputField
          disabled={fields.completed}
          min={0}
          max={250}
          type="number"
          placeholder="Número entre 0 y 250"
          {...register("nitrogen_dose", {
            required: "Introduzca un valor entre 0 y 250",
            min: 0,
            max: 250,
          })}
          onBlur={() => saveEachInput(index)}
        />
        <ErrorMessage errors={errors} name="nitrogen_dose" />
      </div>
      <div style={{ marginBottom: 25 }}>
        <Typography
          style={{
            fontWeight: 500,
            fontSize: 18,
            fontFamily: "Roboto",
            color: "#5C5C5C",
            marginBottom: 10,
          }}
        >
          Fuente de fertilizante a utilizar en la refertilización (Urea,
          18-18-18, Sulfato de Amonio...)
        </Typography>
        <Autocomplete
          disabled={fields.completed}
          disablePortal
          id="combo-box-demo"
          options={fonteFertilizantes}
          sx={{ width: 300 }}
          defaultValue={fonteFertilizantes.find(
            (fonte) => fonte === getValues().nitrogen_source
          )}
          onChange={(e, data) => {
            console.log(data);
            setValue("nitrogen_source", data as string);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Elige una de las fuentes" />
          )}
          onBlur={() => saveEachInput(index)}
          value={getValues().nitrogen_source}
        />
      </div>
      <div style={{ marginBottom: 25 }}>
        <Typography
          style={{
            fontWeight: 500,
            fontSize: 18,
            fontFamily: "Roboto",
            color: "#5C5C5C",
          }}
        >
          Sólo a título informativo: Indica si hasta el momento ya has utiliza
          aplicación de dosis fija o variable en sus lotes.
        </Typography>

        {/* <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={getValues().dose_type}
        >
          <FormControlLabel
            value="Fixa"
            checked={getValues().dose_type === "Fixa"}
            control={<Radio />}
            label="Fixa"
          />
          <FormControlLabel
            defaultChecked={getValues().dose_type === "Variavel"}
            value="Variavel"
            {...register("dose_type")}
            control={<Radio />}
            label="Variável"
          />
          <FormControlLabel
            defaultChecked={getValues().dose_type === "Ambos"}
            value="Ambos"
            {...register("dose_type")}
            control={<Radio />}
            label="Ambos"
          />
        </RadioGroup> */}
        <Controller
          rules={{ required: true }}
          control={control}
          name="dose_type"
          defaultValue={getValues().dose_type}
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel
                disabled={fields.completed}
                checked={getValues().dose_type === "Fijado"}
                value="Fijado"
                control={<Radio />}
                label="Fijado"
                onBlur={() => saveEachInput(index)}
              />
              <FormControlLabel
                disabled={fields.completed}
                checked={getValues().dose_type === "Variable"}
                value="Variable"
                control={<Radio />}
                label="Variable"
                onBlur={() => saveEachInput(index)}
              />
              <FormControlLabel
                disabled={fields.completed}
                checked={getValues().dose_type === "Ambos"}
                value="Ambos"
                control={<Radio />}
                label="Ambos"
                onBlur={() => saveEachInput(index)}
              />
            </RadioGroup>
          )}
        />
      </div>
      <div>
        <Typography
          style={{
            fontWeight: 500,
            fontSize: 18,
            fontFamily: "Roboto",
            color: "#5C5C5C",
            marginBottom: 10,
          }}
        >
          Si desea utilizar su dosis de nitrógeno en el rango de prueba, indique
          la dosis a utilizar.
        </Typography>
        <InputField
          disabled={fields.completed}
          type="number"
          id="Concentração"
          placeholder="El valor debe ser un número."
          {...register("checkstrip_dose")}
          onBlur={() => saveEachInput(index)}
        />
      </div>
      <div>
        <Typography
          style={{
            fontWeight: 500,
            fontSize: 18,
            fontFamily: "Roboto",
            color: "#5C5C5C",
            marginBottom: 10,
          }}
        >
          Indique la fecha estimada de refertilización.
        </Typography>
        <InputField
          disabled={fields.completed}
          color="#5C5C5C"
          type="date"
          id="date"
          {...register("nitrogen_date")}
          onBlur={() => saveEachInput(index)}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingTop: 20,
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Button disabled={fields.completed} type="submit" variant="outlined">
            Mandar
          </Button>
        )}
      </div>
    </form>
  );
};
