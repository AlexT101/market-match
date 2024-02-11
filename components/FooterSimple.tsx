'use client';

import { Container, Group, Anchor } from '@mantine/core';
import Icon from '../public/icon.svg';
import classes from 'styles//Footer.module.css';
import { useRouter } from 'next/navigation';

const links = [
    { link: '/', label: 'Preferences' },
    { link: '/stocks', label: 'Stocks' },
    { link: '/report', label: 'Report' },
];

const FooterSimple = () => {
    const router = useRouter();
    const items = links.map((link) => (
        <Anchor<'a'>
            c="white"
            key={link.label}
            href={link.link}
            onClick={(event) => {
                event.preventDefault();
                router.push(link.link);
            }}
            size="sm"
        >
            {link.label}
        </Anchor>
    ));

    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <img src={Icon.src} width={28} height={28} />
                <Group className={classes.links}>{items}</Group>
            </Container>
        </div>
    );
}
export default FooterSimple;