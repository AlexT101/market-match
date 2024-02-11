'use client';

import { useState, useEffect } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, rem, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    IconInfoCircle,
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
        case '/stocks':   
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
            Invested is a new take on the traditional financial dashboard. Aimed at beginners who are new to the stock market, we simplify the information we provide and help you search through the hundreds of stocks available by using your preferences. You can also ask our AI advisor any questions you might have about a stock. You can choose stocks you like by swiping right on them, and we will generate a list of stocks that you could further research for investment.
        </Text>
      </Modal>
        </>
    );
}

export default Navbar;