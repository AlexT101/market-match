'use client';

import '../styles/index.css';
import { Button } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

interface ArrowProps {
    name: string,
    onClick: () => void
}

const Arrow = ({ name, onClick }: ArrowProps) => {
    return (
        <Button id={name} onClick={onClick} className="arrow">
            {name == "left" ?
                <IconChevronLeft size={36} className="arrowLeft"/>
                :
                <IconChevronRight size={36} className="arrowRight"/>
            }
        </Button>
    )
}

export default Arrow;