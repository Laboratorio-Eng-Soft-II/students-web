import { Select } from 'antd'
import styled from 'styled-components'
import { fieldDisabledStyle } from '../../app-styles'

export const SelectStyled = styled(Select)`
    :disabled {
        ${fieldDisabledStyle};
    }
`
