import { Card, Space, Typography, Select } from "antd";
import React, { useEffect, useState } from "react";
import { CenterView } from "../../../components/center-view/center-view.styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { STUDENTS_BASE_URL } from "../../../core";
import { Input } from "../../../components";
import { Colors, LinkButton } from "../../../theme";
import { InputLabel } from "../../../components/input/input-styles";

const { Title } = Typography;

interface studentModel {
  name: string;
  usp_email: string;
  nusp: string;
  engineering: string;
  skills: string[];
  phone: string;
  address: string;
  current_quarter: string;
}

const SKILLS_OPTIONS = [
  {
    label: "Javascript",
    value: "javascript",
  },
  {
    label: "HTML",
    value: "html",
  },
  {
    label: "Inglês",
    value: "english",
  },
  {
    label: "Python",
    value: "python",
  },
  {
    label: "NodeJS",
    value: "nodejs",
  },
];

export const ProfilePage = () => {
  const navigate = useNavigate();

  const [student, setStudent] = useState<studentModel>();

  useEffect(() => {
    const storageUser = localStorage.getItem("user");
    const user = storageUser ? JSON.parse(storageUser) : null;

    axios.get(`${STUDENTS_BASE_URL}students/${user.nusp_cnpj}`)
        .then(response => setStudent(response.data))
  }, [])
  
  return (
    <CenterView>
      <Card
        bordered={false}
        style={{ overflow: "scroll", maxHeight: "95%", width: "80%" }}
        type="inner"
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Title level={2}>Seu perfil</Title>
            <Input
              disabled 
              label="Nome" 
              color={Colors.black}
              value={student?.name}
            />
            <Input
              disabled 
              label="Email" 
              color={Colors.black}
              value={student?.usp_email}
            />
            <Input
              disabled 
              label="NUSP" 
              color={Colors.black}
              value={student?.nusp}
            />
            <Input
              disabled 
              label="Curso"
              color={Colors.black}
              value={student?.engineering}
            />
            <Input
              disabled 
              label="Período atual" 
              color={Colors.black}
              value={student?.current_quarter}
            />
            <InputLabel 
              color={Colors.black}>Habilidades</InputLabel>
            <Select
              mode="multiple"
              disabled
              style={{width: '100%'}}
              value={student?.skills}
            />
            <Input
              disabled 
              label="Endereço" 
              color={Colors.black}
              value={student?.address}
            />
            <Input
              disabled 
              label="Telefone" 
              color={Colors.black}
              value={student?.phone}
            />
        </Space>
        <LinkButton color={Colors.black} onClick={() => navigate(-1)}>Voltar</LinkButton>
      </Card>
    </CenterView>
  );
};
