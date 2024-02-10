'use client';

import '../styles/index.css';
import { Tooltip, Button } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

interface ArrowProps {
    name: string,
    onClick: () => void
}

const Arrow = ({ name, onClick }: ArrowProps) => {
    return (
        <Tooltip label={name == "left" ? "Reject Stock" : "Accept Stock"}>
            <Button id={name} onClick={onClick} className="arrow">
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