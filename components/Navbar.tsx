'use client';

import { useState } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import {
    IconInfoCircle,
    IconForms,
    IconHome2,
    IconClipboardText,
    IconGraph
} from '@tabler/icons-react';
import classes from 'styles//Navbar.module.css';
import { useRouter } from 'next/navigation';

interface NavbarLinkProps {
    icon: typeof IconHome2;
    label: string;
    active?: boolean;
    onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
    return (
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
            <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
                <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
            </UnstyledButton>
        </Tooltip>
    );
}

const mockdata = [
    { icon: IconHome2, label: 'Home', href: '/' },
    { icon: IconForms, label: 'Preferences', href: '/preferences' },
    { icon: IconClipboardText, label: 'Report', href: 'report' },
];

const Navbar = () => {
    const [active, setActive] = useState(0);
    const router = useRouter();

    const links = mockdata.map((link, index) => (
        <NavbarLink
            {...link}
            key={link.label}
            active={index === active}
            onClick={() => {setActive(index); router.push(link.href)}}
        />
    ));

    return (
        <nav className={classes.navbar}>
            <Center>
                <IconGraph size={30}/>
            </Center>

            <div className={classes.navbarMain}>
                <Stack justify="center" gap={20}>
                    {links}
                </Stack>
            </div>

            <Stack justify="center" gap={0}>
                <NavbarLink icon={IconInfoCircle} label="About" />
            </Stack>
        </nav>
    );
}

export default Navbar;