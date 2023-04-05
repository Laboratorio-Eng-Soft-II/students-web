import React, { Fragment, useEffect, useState } from "react";

import logoPoli from "../../../assets/LogoEPUSP.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { POSITIONS_BASE_URL } from "../../../core";
import { Container } from "../home/home-styles";
import { H1, H3, LinkButton, Spacing } from "../../../theme";
import { AppPath } from "../../routes";
import { Hbox, Separator, TextCard } from "../../../components";

export interface PositionModel {
  type: string;
  description: string;
  required_skills: string[];
  main_work: string;
  salary: number;
  id: string;
  cnpj: string;
  benefits: string;
}

export const PositionsPage: React.FC = () => {
  const navigate = useNavigate();

  const [positions, setPositions] = useState<PositionModel[]>();

  useEffect(() => {
    axios
      .get(`${POSITIONS_BASE_URL}positions`)
      .then((response) => setPositions(response.data));
  }, []);

  return (
    <Container>
      <img width="100px" height="100px" src={logoPoli} alt="logo da Poli"></img>
      <H1 textAlign="center">Internship 4.0 - Portal de estágios</H1>
      <Separator size={Spacing.XSmall} />

      <H3>Todas as vagas</H3>
      <Separator size={Spacing.XSmall} />

      {positions?.map((position, index) => (
        <Fragment key={`${position}-${index}`}>
          <TextCard
            title={position.type + " - " + position.description}
            onClick={() => navigate(`/students/positions/${position.id}`)}
          />
          <Separator size={Spacing.Small} />
        </Fragment>
      ))}
      <Hbox>
        <Hbox.Item>
          <LinkButton onClick={() => navigate(AppPath.home)}>Voltar</LinkButton>
        </Hbox.Item>
      </Hbox>
    </Container>
  );
};
