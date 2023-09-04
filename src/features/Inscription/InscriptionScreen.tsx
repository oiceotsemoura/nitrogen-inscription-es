import React, { useEffect, useState } from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from "@mui/material";
import { LoginRes, login } from "../../api/Auth";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormComponent } from "./FormComponent/FormComponent";
import { Container } from "./styles";

const chipColor = (status: string) => {
  if (status === "started") return "warning";
  if (status === "empty") return "default";
  if (status === "completed") return "success";
  return "primary";
};

const statusObject = {
  completed: "Concluido",
  started: "En proceso",
  empty: "Sin Completar",
};

interface userData extends LoginRes {}

export const InscriptionScreen = () => {
  const userData: userData = JSON.parse(
    localStorage.getItem("userData") as string
  );

  useEffect(() => {
    (async () => {
      try {
        const res = await login({
          email: userData.email,
          growing_season: userData.growing_season,
        });
        const values = JSON.stringify({ ...res.data });

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
      setUserDataState({ ...newFields });
    }
    if (
      state === "completed" &&
      newFields.fields[index].input.field_status !== "completed"
    ) {
      newFields.fields[index].input.field_status = "completed";
      newFields.fields[index].input.completed = true;
      setUserDataState({ ...newFields });
    }
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
                  <Typography
                    style={{
                      fontWeight: 400,
                      fontSize: 24,
                      fontFamily: "Roboto",
                      color: "#000",
                      marginBottom: 10,
                    }}
                  >
                    {field.field_name}
                  </Typography>
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
                  userData={{
                    email: userData.email,
                    growing_season: userData.growing_season,
                  }}
                />
              </AccordionDetails>
            </Accordion>
          </div>
        );
      })}
    </Container>
  );
};
