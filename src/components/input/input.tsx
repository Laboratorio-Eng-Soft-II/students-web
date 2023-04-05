import { InputHTMLAttributes } from 'react'
import { Spacing } from '../../theme'
import { Col, Row } from '../grid'
import { InputLabel, InputStyled } from './input-styles'
import { Separator } from '../box'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

export const Input: React.FC<InputProps> = ({ label, children, ...props }) => {
    return (
        <Row>
            <Col>
                {!!label && <InputLabel>{label}</InputLabel>}
                <Separator size={Spacing.XSmall} />
                <InputStyled {...props} />
            </Col>
        </Row>
    )
}
