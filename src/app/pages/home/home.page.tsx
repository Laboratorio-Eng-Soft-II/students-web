import React from "react";
import logoPoli from "../../../assets/LogoEPUSP.png";
import { CardsContainer, Container } from "./home-styles";
import {
  faFaceLaugh,
  faListAlt,
  faFileLines,
} from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { Space, ConfigProvider } from "antd";
import { AppPath } from "../../routes";
import { Body, H1, Spacing } from "../../../theme";
import { CardItem, Separator } from "../../../components";

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <ConfigProvider theme={{ token: { colorText: "#EBEBD3" } }}>
        <img
          width="100px"
          height="100px"
          src={logoPoli}
          alt="logo da Poli"
        ></img>
        <Space direction="vertical" align="center" style={{ width: "100%" }}>
          <H1 textAlign="center">Internship 4.0 - Portal de estágios</H1>
          <Separator size={Spacing.XSmall}/>

          <Body textAlign="center">
              O Portal de Estágios é o Ecossistema de Talentos da Escola
              Politécnica da Universidade de São Paulo. Aqui a Escola, as
              Empresas e os Alunos transformam sonhos em realidades
          </Body>
          <Separator size={Spacing.XSmall}/>

          <CardsContainer>
            <CardItem
              icon={faFaceLaugh}
              title="Perfil"
              onClick={() => navigate("")}
            />
            <CardItem
              icon={faListAlt}
              title="Vagas"
              onClick={() => navigate(AppPath.positions)}
            />
            <CardItem
              icon={faFileLines}
              title="Currículo"
              onClick={() => navigate("")}
            />
          </CardsContainer>
        </Space>
      </ConfigProvider>
    </Container>
  );
};
