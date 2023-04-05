import { useParams } from 'react-router'
import { PositionModel } from '../positions'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { POSITIONS_BASE_URL } from '../../../core'
import { Button, Col, Hbox, Header, Input, Row, SelectField, Separator, TextArea } from '../../../components'
import { LinkButton, Spacing } from '../../../theme'
import { Container } from '../home/home-styles'

interface RouteParams {
    cnpj: string | undefined
    id: string | undefined
}

export const PositionDetailsPage: React.FC = () => {
    const params = useParams()
    const [position, setPosition] = useState<PositionModel>()

    const { cnpj, id } = params as unknown as RouteParams

    useEffect(() => {
        axios
            .get(`${POSITIONS_BASE_URL}positions/get/${id}`)
            .then(response => setPosition(response.data))
    }, [cnpj, id])

    const navigate = useNavigate()

    return (
        <Container>
            <Header title='Detalhes da Vaga' />
            <Hbox>
                <Hbox.Item grow>
                    <Row>
                        <Col>
                            <Input
                                disabled
                                value={position?.type}
                                label="Título da Vaga"
                            />
                        </Col>
                    </Row>
                    <Separator size={Spacing.Small} />
                    <Row>
                        <Col>
                            <TextArea
                                disabled
                                value={position?.description}
                                label="Descrição da vaga"
                            />
                        </Col>
                    </Row>
                    <Separator size={Spacing.Small} />
                    <Row>
                        <Col>
                            <SelectField
                                defaultValue={position?.required_skills}
                                label="Requisitos"
                                options={position?.required_skills.map(
                                    value => {
                                        return { value, label: value }
                                    },
                                )}
                            />
                        </Col>
                    </Row>
                    <Separator size={Spacing.Small} />
                    <Row>
                        <Col>
                            <TextArea
                                disabled
                                value={position?.main_work}
                                label="Atividades a serem realizadas"
                            />
                        </Col>
                    </Row>
                    <Separator size={Spacing.Small} />
                    <Row>
                        <Col>
                            <Input
                                disabled
                                value={
                                    'R$ ' +
                                    position?.salary
                                        .toFixed(2)
                                        .replace('.', ',')
                                }
                                label="Remuneração"
                            />
                        </Col>
                    </Row>
                </Hbox.Item>
            </Hbox>
            <Separator size={Spacing.Small} />
            <Hbox hAlign='space-between'>
                <Hbox.Item>
                    <LinkButton onClick={() => navigate(-1)}>Voltar</LinkButton>
                </Hbox.Item>
                <Hbox.Separator />
                <Hbox.Item>
                    <Button type="submit">Inscrever-se</Button>
                </Hbox.Item>
            </Hbox>
        </Container>
    )
}
