import withUIContainerContext from 'components/withUIContainerContext'
import { UIContainerContext, UIContainerContextProps } from 'contexts/UIContainerContext'
import React, { FC } from 'react'
import Inner from './inner'

const Swap: FC<UIContainerContextProps> = (props) => {
    return (
        <UIContainerContext.Provider value={props}>
            <Inner />
        </UIContainerContext.Provider>
    )
}

export default withUIContainerContext(Swap)
