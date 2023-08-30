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
    try {
      setIsLoading(true);
      const res = await login(data);
      if (res.status !== 200) return setModalErrorIsVisible(true);

      const values = JSON.stringify({ ...res.data, ...data });

      localStorage.setItem("userData", values);
      setIsLoading(false);
      navigate("/inscription");
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
          El correo electrónico o CUIT ingresado no se encontró en nuestra base
          de datos. clientes suscritos a VAlora 2023. Asegúrate de estar usando
          el mismo datos registrados o si el registro se realizó correctamente.
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
              Bayer VAlora corn le ayuda a explorar la rentabilidad con su
              inversión adicional protegida! Enciende tus campos Maíz Bayer con
              prescripciones de densidad de siembra y recomendaciones
              personalizadas de aplicación de nitrógeno. Asegúrese de haber
              introducido y plantado correctamente el campos que desea
              solicitar. Esta recomendación es una cortesía Bayer para clientes
              de Cosecha Verano 2023.
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
                Recuerda utilizar los mismos datos ingresados ​​en el programa
                VALora Maíz 2023
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                paddingTop: "10px",
              }}
            >
              <TextField
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
              />

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
