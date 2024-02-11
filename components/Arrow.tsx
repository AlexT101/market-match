'use client';

import '../styles/index.css';
import { Tooltip, Button } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

interface ArrowProps {
    name: string,
    onClick: () => void,
    disabled: boolean
}

const Arrow = ({ name, onClick, disabled }: ArrowProps) => {
    return (
        <Tooltip label={name == "left" ? "Reject Stock" : "Accept Stock"}>
            <Button color="rgb(66,66,66)" id={name} onClick={onClick} className="arrow" disabled={disabled}>
                {name == "left" ?
                    <IconChevronLeft size={36} className="arrowLeft" />
                    :
                    <IconChevronRight size={36} className="arrowRight" />
                }
            </Button>
        </Tooltip>
    )
}

export default Arrow;