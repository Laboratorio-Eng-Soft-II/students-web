import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import { Button as AntdButton } from 'antd'
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANIES_BASE_URL, STUDENTS_BASE_URL } from '../../../core'
import { Button, CenterView, Col, FlashMessage, Hbox, Input, Row, SelectField, Separator, StarRating } from '../../../components'
import { AppPath } from '../../routes'
import { H2, LinkButton } from '../../../theme'
import { InputLabel } from '../../../components/input/input-styles'

interface FormState {
    comment: string
}

interface CompanyModel {
    corporateName: string
    cnpj: string
}

interface CompanyOption {
    name: string
    cnpj: string
}

const availableRatings = [1, 2, 3, 4, 5]

const questions = [
    'De 1 a 5, como você julga o processo de onboard da empresa?',
    'De 1 a 5, como você julga o acompanhamento feito pela empresa?',
    'De 1 a 5, como você julga a coerência das tarefas passadas?',
    'De 1 a 5, como você julga o conhecimento adquirido durante o estágio?',
]

export const CompanyFeedbackPage: React.FC = () => {
    const [showAlert, setShowAlert] = useState(false)

    const { control, handleSubmit } = useForm<FormState>({
        defaultValues: { comment: '' },
    })

    const onSubmit: SubmitHandler<FormState> = async data => {
        const storageUser = localStorage.getItem('user')
        const user = storageUser ? JSON.parse(storageUser) : null

        const { comment } = data

        if(selectedCompany){
            await axios.post(`${STUDENTS_BASE_URL}students/${user.nusp_cnpj}/feedback`, {
                author_nusp_cnpj: user.nusp_cnpj,
                target_nusp_cnpj: selectedCompany,
                answers: activeRatings,
                comments: comment,
            })
            .then(() => setShowAlert(true))
            .catch(error => console.log(error))
        }
    }

    const [activeRatings, setActiveRatings] = useState<number[]>(
        new Array(questions.length).fill(1),
    )

    const [students, setStudents] = useState<CompanyOption[]>()
    const [selectedCompany, setSelectedCompany] = useState<string>()

    useEffect(() => {
        axios.get(`${COMPANIES_BASE_URL}companies`).then(res => {
            var response: CompanyOption[] = []
            res.data.map((option: CompanyModel) => {
                response.push({ name: option.corporateName, cnpj: option.cnpj })
                return '' // Evitando erro de map sem return
            })
            setStudents(response)
        })
    }, [])

    const handleUpdateRating = (
        setActiveRatings: Dispatch<SetStateAction<number[]>>,
        rating: number,
        index: number,
    ) => {
        const updatedRatings = [...activeRatings]
        updatedRatings[index] = rating
        setActiveRatings(updatedRatings)
    }

    const navigation = useNavigate()

    return (
        <CenterView style={{ flexDirection: 'column'}}>
            {showAlert && (
                <FlashMessage
                    banner
                    showIcon
                    type="success"
                    afterClose={() => setShowAlert(false)}
                    message="Empresa avaliada com sucesso!"
                    action={
                        <AntdButton
                            onClick={() => navigation(AppPath.home)}
                            type="link"
                            size="small"
                        >
                            IR PARA HOME
                        </AntdButton>
                    }
                />
            )}

            <H2>Avaliação - Empresa</H2>

            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '70%' }}>
                <Row>
                    <Col>
                        <SelectField
                            label="Nome da empresa"
                            options={students?.map(value => {
                                return { value: value.cnpj, label: value.name }
                            })}
                            onChange={(value: string) =>
                                setSelectedCompany(value)
                            }
                        />
                    </Col>
                </Row>
                <Separator />

                {questions.map((question, index) => (
                    <Fragment key={`question${index}`}>
                        <Row>
                            <Col>
                                <InputLabel>{question}</InputLabel>
                                <Separator />
                                {availableRatings.map(rating => (
                                    <StarRating
                                        type="button"
                                        key={`question${index}-star${rating}`}
                                        isActive={
                                            rating <= activeRatings[index]
                                        }
                                        onClick={() =>
                                            handleUpdateRating(
                                                setActiveRatings,
                                                rating,
                                                index,
                                            )
                                        }
                                    />
                                ))}
                            </Col>
                        </Row>
                        <Separator />
                    </Fragment>
                ))}

                <Row>
                    <Col>
                        <Controller
                            name="comment"
                            control={control}
                            render={({ field }) => (
                                <Input label="Comentários extras" {...field} />
                            )}
                        />
                    </Col>
                </Row>
                <Separator />

                <Row>
                    <Col>
                        <Hbox hAlign="flex-end">
                            <Hbox.Item>
                                <LinkButton
                                    onClick={() =>
                                        navigation(AppPath.home)
                                    }
                                >
                                    Voltar
                                </LinkButton>
                            </Hbox.Item>
                            <Hbox.Separator />
                            <Hbox.Item>
                                <Button type="submit">Enviar</Button>
                            </Hbox.Item>
                        </Hbox>
                    </Col>
                </Row>
                <Separator />
            </form>
        </CenterView>
    )
}
