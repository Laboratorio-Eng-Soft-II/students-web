import { Card, Space, Form, Input, Typography, Button, Select } from "antd";
import React, { useState } from "react";
import { CenterView } from "../../../components/center-view/center-view.styles";
import { useNavigate } from "react-router-dom";
import { AppPath } from "../../routes";
import axios from "axios";
import { STUDENTS_BASE_URL } from "../../../core";
import { FlashMessage } from "../../../components/flash-message";

const { Title, Text } = Typography;

interface IForm {
  name: string;
  email: string;
  nusp: string;
  engineering: string;
  skills: string[];
  phone: string;
  address: string;
  quarter: string;
  password: string;
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

export const SignUpPage = () => {
  const [form] = Form.useForm<IForm>();

  const [showFlash, setShowFlash] = useState(false);

  const navigate = useNavigate();

  const onFinish = async (values: IForm) => {
    const {
      address,
      email,
      name,
      nusp,
      engineering,
      phone,
      quarter,
      skills,
      password,
    } = values;

    await axios.post(`${STUDENTS_BASE_URL}students`, {
      nusp,
      name,
      engineering,
      current_quarter: parseInt(quarter),
      usp_email: email,
      phone,
      skills,
      address,
      password,
    });

    setShowFlash(true);
  };
  return (
    <CenterView>
      {showFlash && (
        <FlashMessage
          type="success"
          message="Aluno cadastrado com sucesso"
          showIcon
          action={
            <Button type="link" onClick={() => navigate(AppPath.home)}>
              IR PARA HOME
            </Button>
          }
          afterClose={() => setShowFlash(false)}
        />
      )}
      <Card
        bordered={false}
        style={{ overflow: "scroll", maxHeight: "95%", width: "80%" }}
        type="inner"
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Title level={2}>Cadastro</Title>
          <Text>
            Preencha as informações para fazer seu cadastro na plataforma
          </Text>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Nome"
              name="name"
              rules={[
                { required: true, message: "Por favor, digite seu nome" },
              ]}
            >
              <Input placeholder="Digite seu nome" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Por favor, digite seu email" },
              ]}
            >
              <Input placeholder="email@usp.br" />
            </Form.Item>
            <Form.Item
              label="NUSP"
              name="nusp"
              rules={[
                { required: true, message: "Por favor, digite seu NUSP" },
              ]}
            >
              <Input placeholder="Seu número USP" />
            </Form.Item>

            <Form.Item name="engineering" label="Curso">
              <Input placeholder="Digite seu curso" />
            </Form.Item>

            <Form.Item name="quarter" label="Período atual">
              <Input placeholder="Período atual" />
            </Form.Item>

            <Form.Item name="skills" label="Habilidades">
              <Select
                mode="multiple"
                options={SKILLS_OPTIONS}
                placeholder="Selecione suas habilidades principais"
              />
            </Form.Item>

            <Form.Item
              name="address"
              label="Endereço"
              style={{ width: "100%" }}
            >
              <Input placeholder="Digite seu endereço" />
            </Form.Item>
            <Form.Item name="phone" label="Telefone" style={{ width: "100%" }}>
              <Input placeholder="Digite seu número de telefone" />
            </Form.Item>
            <Form.Item
              rules={[
                { required: true, message: "Por favor, digite uma senha" },
              ]}
              name="password"
              label="Senha"
              style={{ width: "100%" }}
            >
              <Input.Password placeholder="Senha para acesso à plataforma" />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button htmlType="submit" type="primary">
                  Cadastrar
                </Button>
                <Button type="text" onClick={() => navigate(AppPath.login)}>
                  Ir para login
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </CenterView>
  );
};
