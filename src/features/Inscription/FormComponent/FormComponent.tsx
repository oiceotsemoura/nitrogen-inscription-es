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
  Alert,
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
  choosen_dose_type?: string;
  planting_type?: string;
}

interface Props {
  fields: Input;
  userData: { email: string };
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
      nitrogen_dose: undefined,
      checkstrip_dose: undefined,
      dose_type: undefined,
      nitrogen_source: undefined,
      nitrogen_date: undefined,
      choosen_dose_type: undefined,
      planting_type: undefined,
    },
    criteriaMode: "all",
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
          planting_type: values.planting_type as string,
          choosen_dose_type: values.planting_type as string,
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
        planting_type: values.planting_type as string,
        choosen_dose_type: values.choosen_dose_type as string,
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
          Dosis de Nitrógeno (kg N/ha) utilizado en etapas tempranas
          (presiembra, emergencia). Atención: se refiere a Nitrogeno elemento,
          no a la fuente del fertilizante. *
        </Typography>
        <InputField
          disabled={fields.completed}
          min={0}
          max={250}
          type="number"
          placeholder="Número entre 0 y 250"
          {...register("nitrogen_dose", {
            required: true,
            min: 0,
            max: 250,
          })}
          onBlur={() => saveEachInput(index)}
        />
        {/* <ErrorMessage errors={errors} name="nitrogen_dose" /> */}
        {errors.nitrogen_dose && (
          <Alert style={{ marginTop: -12, marginBottom: 12 }} severity="error">
            Introduzca un valor entre 0 y 250
          </Alert>
        )}
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
          Fuente de fertilizante a utilizar (UAN; SolMix, UAN; Sulfan, etc...) *
        </Typography>
        <Controller
          rules={{ required: true }}
          name="nitrogen_source"
          render={({ field }) => (
            <Autocomplete
              {...field}
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
          )}
          control={control}
        />
        {errors.nitrogen_source && (
          <Alert style={{ marginTop: 12, marginBottom: 12 }} severity="error">
            Campo obligatolio
          </Alert>
        )}
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
          Solo a modo informativo: Indica si hasta el momento ya utilizaste
          aplicación de dosis fija o variable en este lote *
        </Typography>

        <Controller
          rules={{ required: true }}
          control={control}
          name="dose_type"
          defaultValue={getValues().dose_type}
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel
                disabled={fields.completed}
                checked={getValues().dose_type === "Fija"}
                value="Fija"
                control={<Radio />}
                label="Fija"
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
                checked={getValues().dose_type === "Ambas"}
                value="Ambas"
                control={<Radio />}
                label="Ambas"
                onBlur={() => saveEachInput(index)}
              />
            </RadioGroup>
          )}
        />
        {errors.dose_type && (
          <Alert style={{ marginTop: 12, marginBottom: 12 }} severity="error">
            Campo obligatolio
          </Alert>
        )}
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
          Indique si requiere la recomendación de Fertilización para aplicación
          Pre-Siembra/Siembra ó N-Smart(V6) *
        </Typography>

        <Controller
          rules={{ required: "Campo obligatorio" }}
          control={control}
          name="planting_type"
          defaultValue={getValues().planting_type}
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel
                disabled={fields.completed}
                checked={getValues().planting_type === "Pre Siembra/Siembra"}
                value="Pre Siembra/Siembra "
                control={<Radio />}
                label="Pre Siembra/Siembra"
                onBlur={() => saveEachInput(index)}
              />
              <FormControlLabel
                disabled={fields.completed}
                checked={getValues().planting_type === "N-smart (V6)"}
                value="N-smart (V6)"
                control={<Radio />}
                label="N-smart (V6)"
                onBlur={() => saveEachInput(index)}
              />
            </RadioGroup>
          )}
        />
        {errors.planting_type && (
          <Alert style={{ marginBottom: 12 }} severity="error">
            Campo obligatolio
          </Alert>
        )}
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
          Si fertilizas/refertilizas en la franja testigo, indica dosis a
          utilizar, si no ingresa el valor 0 (cero) *
        </Typography>
        <InputField
          disabled={fields.completed}
          type="number"
          id="Concentração"
          placeholder="El valor debe ser un número."
          {...register("checkstrip_dose", {
            required: "Campo obligatolio",
          })}
          onBlur={() => saveEachInput(index)}
        />
        {errors.checkstrip_dose && (
          <Alert style={{ marginTop: -5, marginBottom: 12 }} severity="error">
            Campo obligatolio
          </Alert>
        )}
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
          Indica si realizarás fertilización/refertilización fija o variable:
        </Typography>

        <Controller
          rules={{ required: "Campo obligatorio" }}
          control={control}
          name="choosen_dose_type"
          defaultValue={getValues().choosen_dose_type}
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel
                disabled={fields.completed}
                checked={getValues().choosen_dose_type === "Fija"}
                value="Fija"
                control={<Radio />}
                label="Fija"
                onBlur={() => saveEachInput(index)}
              />
              <FormControlLabel
                disabled={fields.completed}
                checked={getValues().choosen_dose_type === "Variable"}
                value="Variable"
                control={<Radio />}
                label="Variable"
                onBlur={() => saveEachInput(index)}
              />
            </RadioGroup>
          )}
        />
        {errors.choosen_dose_type && (
          <Alert style={{ marginTop: 10, marginBottom: 12 }} severity="error">
            Campo obligatolio
          </Alert>
        )}
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
          Indique la fecha estimada de refertilización. *
        </Typography>
        <InputField
          disabled={fields.completed}
          style={{ color: "#5C5C5C" }}
          type="date"
          id="date"
          {...register("nitrogen_date", {
            required: "Campo obligatolio",
          })}
          onBlur={() => saveEachInput(index)}
        />
        {errors.nitrogen_date && (
          <Alert style={{ marginBottom: 12 }} severity="error">
            Campo obligatolio
          </Alert>
        )}
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
