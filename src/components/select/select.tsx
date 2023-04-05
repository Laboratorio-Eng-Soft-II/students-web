import { Select } from 'antd'
import type { SelectProps } from 'antd'
import { Col, Row } from '../grid'
import { InputLabel } from '../input/input-styles'
import { Separator } from '../box'
import { Spacing } from '../../theme'

interface SelectFieldProps extends SelectProps {
    label?: string
}

export const SelectField: React.FC<SelectFieldProps> = ({
    label,
    ...others
}) => {
    return (
        <Row>
            <Col>
                <InputLabel>{label}</InputLabel>
                <Separator size={Spacing.XSmall} />
                <Select style={{ width: '100%' }} {...others} />
            </Col>
        </Row>
    )
}
