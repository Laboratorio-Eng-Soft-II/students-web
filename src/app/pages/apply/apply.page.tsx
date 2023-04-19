import React, { useState } from "react";
import { Space, Button, Input, Form, Typography, Card } from "antd";
import { CenterView } from "../../../components/center-view/center-view.styles";
import { useNavigate, useParams } from "react-router-dom";
import { AppPath } from "../../routes";
import axios from "axios";
import { STUDENTS_BASE_URL } from "../../../core";
import { FlashMessage } from "../../../components";

const { Title, Text } = Typography;

interface IForm {
  cv_link: string;
  linkedin_link: string;
}

export const EnrollmentPage: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);

  const [form] = Form.useForm<IForm>();

  const navigate = useNavigate();

  const params = useParams();

  const { positionId } = params;

  const onFinish = async (values: IForm) => {
    const { cv_link, linkedin_link } = values;
    const userStored = localStorage.getItem("user");
    const user = userStored ? JSON.parse(userStored) : {};

    try {
      axios
        .post(`${STUDENTS_BASE_URL}enrollment/${positionId}`, {
          cv_link,
          linkedin_link,
          student_nusp: user.nusp_cnpj,
        })
        .then(() => setShowAlert(true));
    } catch (error) {
      console.log(error);
      setShowAlert(true);
    }
  };

  return (
    <CenterView>
      {showAlert && (
        <FlashMessage
          banner
          showIcon
          type="success"
          afterClose={() => setShowAlert(false)}
          message="Inscrição realizada com sucesso!"
          action={
            <Button
              type="link"
              size="small"
              onClick={() => navigate(AppPath.home)}
            >
              IR PARA HOME
            </Button>
          }
        />
      )}
      <Card bordered={false}>
        <Space direction="vertical">
          <Title level={2}>Aplicar a Vaga</Title>
          <Text>Forneça as informações para fazer incrição na vaga</Text>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item label="Currículo" name="cv_link">
              <Input placeholder="Link para currículo" />
            </Form.Item>
            <Form.Item label="Linkedin" name="linkedin_link">
              <Input placeholder="Link do Linkedin" />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button htmlType="submit" type="primary">
                  Aplicar
                </Button>
                <Button type="text" onClick={() => navigate(-1)}>
                  Cancelar
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </CenterView>
  );
};
