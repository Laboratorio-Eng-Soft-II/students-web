import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ConfigProvider, Space, Typography } from 'antd'

import { POSITIONS_BASE_URL } from '../../../core'
import { Container } from '../home/home-styles';
import logoPoli from "../../../assets/LogoEPUSP.png";

const { Title, Link } = Typography;

export const MOCK_POSITIONS = [
    {
        title: 'Vaga 1',
        description: 'Descrição sobre a vaga 1',
        requirements: [],
        activities: 'Desenvolvimento front-end de um aplicativo mobile',
        salary: 4000,
        id: '1',
    },
    {
        title: 'Vaga 2',
        description: 'Descrição sobre a vaga 2',
        requirements: [],
        activities: 'Desenvolvimento back-end de um servidor',
        salary: 5000,
        id: '2',
    },
    {
        title: 'Vaga 3',
        description: 'Descrição sobre a vaga 3',
        requirements: [],
        activities: 'Desenvolvimento full stack',
        salary: 6000,
        id: '3',
    },
]

const cnpj = '123'

export interface PositionModel {
    type: string
    description: string
    required_skills: string[]
    main_work: string
    salary: number
    id: string
    cnpj: string
    benefits: string
}

export const PositionsPage: React.FC = () => {
    const navigate = useNavigate()

    const [positions, setPositions] = useState<PositionModel[]>()

    useEffect(() => {
        axios
            .get(`${POSITIONS_BASE_URL}positions/${cnpj}`)
            .then(response => setPositions(response.data))
    }, [])

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
                    <Title>Internship 4.0 - Portal de estágios</Title>
                    <Title>Todas as vagas</Title>
                    {MOCK_POSITIONS?.map((position, index) => (
                        <Fragment key={`${position}-${index}`}>
                            <Title>{position.title}</Title>
                        </Fragment>
                    ))}
            {/* {positions?.map((position, index) => (
                <Fragment key={`${position}-${index}`}>
                    <TextCard
                        title={position.type + ' - ' + position.description}
                        onClick={() =>
                            navigate(`/companies/positions/${position.id}`)
                        }
                    />
                    <Separator size={Spacing.Small} />
                </Fragment>
            ))}
            <Hbox>
                <Hbox.Item>
                    <Link onClick={() => navigate('/companies/home')}>
                        Voltar
                    </Link>
                </Hbox.Item>
            </Hbox> */}
                </Space>
            </ConfigProvider>
        </Container>
    )
}
