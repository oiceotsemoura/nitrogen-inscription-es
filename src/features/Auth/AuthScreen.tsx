/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Typography, Button, CircularProgress, TextField } from "@mui/material";
import { Container, Input, Label, FormContainer, CardWrapper } from "./styles";
import { login } from "../../api/Auth";
import { BasicModal } from "../../components/Modal/Modal";
import { BaseText } from "../../components/BaseText/BaseText";
import { Colors } from "../../config/Colors";

export const AuthScreen = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [modalErrorIsVisible, setModalErrorIsVisible] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    const url = `${window.location.href}`;
    const season = url.split("growing_season=")[1];
    try {
      setIsLoading(true);
      const res = await login(data);
      if (res.status !== 200) return setModalErrorIsVisible(true);

      const values = JSON.stringify({ ...res.data, ...data });

      localStorage.setItem("userData", values);
      setIsLoading(false);
      navigate(`/inscription/growing_season=${season}`);
    } catch (err) {
      setModalErrorIsVisible(true);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BasicModal
        isVisible={modalErrorIsVisible}
        setIsVisible={(status) => setModalErrorIsVisible(status)}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Cuenta no encontrada
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Cuenta no registrada o no se han encontrado lotes VAlora para esta
          cuenta. Asegura colocar el mismo email utilizado para registrarte en
          VAlora Maíz 2023
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Button
            style={{ backgroundColor: "transparent" }}
            onClick={() => setModalErrorIsVisible(false)}
          >
            <BaseText size={17} bold color={Colors.purple}>
              Intentar nuevamente
            </BaseText>
          </Button>
        </div>
      </BasicModal>
      <Container>
        <div style={{ marginBottom: 30 }}>
          <Typography
            style={{
              fontWeight: 400,
              fontSize: 25,
              fontFamily: "Roboto",
              paddingBottom: 12,
            }}
          >
            Solicitud de prescripción de nitrógeno
          </Typography>

          <FormContainer>
            <Typography
              style={{ fontSize: 18, fontFamily: "Roboto", color: "#5C5C5C" }}
            >
              Bayer VALora te apoya para maximizar la productividad y
              rentabilidad de cada uno de tus lotes, ¡con tu inversión adicional
              protegida! Además de proporcionar prescripciones de densidad de
              siembra de semillas que mejoran tus lotes de maíz Dekalb, podemos
              ofrecer recomendaciones personalizadas de aplicación de nitrógeno.
            </Typography>
          </FormContainer>
        </div>
        <div>
          <Typography
            style={{
              fontWeight: 400,
              fontSize: 25,
              fontFamily: "Roboto",
              paddingBottom: 12,
            }}
          >
            Información personal e identificación.
          </Typography>
          <FormContainer>
            <div style={{ marginBottom: 10 }}>
              <Typography
                style={{
                  fontWeight: 500,
                  fontSize: 18,
                  fontFamily: "Roboto",
                  color: "#5C5C5C",
                }}
              >
                Datos del cliente
              </Typography>
              <Typography
                style={{
                  fontWeight: 300,
                  fontSize: 14,
                  fontFamily: "Roboto",
                  color: "#5C5C5C",
                }}
              >
                Recorda colocar el mismo email utilizado para registrarte en
                VAlora Maíz 2023
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                paddingTop: "10px",
              }}
            >
              {/* <TextField
                variant="filled"
                style={{
                  width: "100%",
                  marginBottom: "12px",
                  marginRight: "10px",
                }}
                disabled={isLoading}
                type="text"
                id="cpf"
                label="CUIT"
                {...register("cpf", { required: true })}
              /> */}

              <TextField
                variant="filled"
                style={{
                  width: "100%",
                  marginBottom: "12px",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
                disabled={isLoading}
                type="text"
                id="Email"
                label="Email"
                {...register("email", { required: true })}
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
                <Button type="submit" variant="contained">
                  Avance
                </Button>
              )}
            </div>
          </FormContainer>
        </div>
      </Container>
    </form>
  );
};
