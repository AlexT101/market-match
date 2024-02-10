'use client';

import { useState, useEffect } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, rem, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    IconInfoCircle,
    IconForms,
    IconHome2,
    IconClipboardText,
    IconGraph,
    IconChartHistogram
} from '@tabler/icons-react';
import classes from 'styles//Navbar.module.css';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

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
    { icon: IconChartHistogram, label: 'Stocks', href: '/stocks' },
    { icon: IconClipboardText, label: 'Report', href: 'report' },
];

const activeNav = (pathname: string) => {
    switch(pathname){
        case '/':
            return 0;
        case '/preferences':   
            return 1;
        case '/report':
            return 2;
    }
    return 0;
}

const Navbar = () => {
    const pathname = usePathname();
    const [active, setActive] = useState(activeNav(pathname));
    const router = useRouter();
    const [opened, { open, close }] = useDisclosure(false);


    useEffect(()=>{
        setActive(activeNav(pathname));
    },[pathname]);

    const links = mockdata.map((link, index) => (
        <NavbarLink
            {...link}
            key={link.label}
            active={index === active}
            onClick={() => {setActive(index); router.push(link.href)}}
        />
    ));

    return (
        <>
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
                <NavbarLink icon={IconInfoCircle} label="About" onClick={open}/>
            </Stack>
        </nav>
        <Modal
        opened={opened}
        onClose={close}
        title="About"
        centered
        padding={24}
        radius={16}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Text c="dimmed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </Modal>
        </>
    );
}

export default Navbar;