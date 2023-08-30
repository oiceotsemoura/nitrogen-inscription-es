import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { LoginRes, login } from "../../api/Auth";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormComponent } from "./FormComponent/FormComponent";
import { Card, Container, Input, Label } from "./styles";

const chipColor = (status: string) => {
  if (status === "started") return "warning";
  if (status === "empty") return "default";
  if (status === "completed") return "success";
  return "primary";
};

const statusObject = {
  completed: "Concluido",
  started: "En proceso",
  empty: "No llenado",
};

interface userData extends LoginRes {
  cpf: string;
}

export const InscriptionScreen = () => {
  const userData: userData = JSON.parse(
    localStorage.getItem("userData") as string
  );

  useEffect(() => {
    (async () => {
      try {
        const res = await login({ cpf: userData.cpf, email: userData.email });
        const values = JSON.stringify({ cpf: userData.cpf, ...res.data });

        localStorage.setItem("userData", values);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [userData]);

  const [userDataState, setUserDataState] = useState<userData>(userData);

  const changeStateOfField = (state: string, index: number) => {
    const newFields = userDataState;
    console.log("starts", index);

    if (
      state === "started" &&
      newFields.fields[index].input.field_status !== "started"
    ) {
      newFields.fields[index].input.field_status = "started";
    }
    if (
      state === "completed" &&
      newFields.fields[index].input.field_status !== "completed"
    ) {
      newFields.fields[index].input.field_status = "completed";
      newFields.fields[index].input.completed = true;
    }
    setUserDataState({ ...newFields });
    // if (userDataState.fields[index].input.field_status === "empty") {
    //   const newFields = userDataState;
    //   console.log("starts", index);
    //   newFields.fields[index].input.field_status = "started";
    // }
  };

  return (
    <Container>
      {userDataState.fields.map((field, index) => {
        console.log(field.input);
        return (
          <div style={{ marginBottom: 10 }}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginRight: 10,
                  }}
                >
                  <Typography>{field.field_name}</Typography>
                  <Chip
                    color={chipColor(field.input.field_status as string)}
                    label={
                      statusObject[
                        field.input?.field_status as keyof typeof statusObject
                      ]
                    }
                  />
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <FormComponent
                  index={index}
                  changeState={(state: string, index: number) =>
                    changeStateOfField(state, index)
                  }
                  fields={field.input}
                  userData={{ cpf: userData.cpf, email: userData.email }}
                />
              </AccordionDetails>
            </Accordion>
          </div>
        );
      })}
    </Container>
  );
};
