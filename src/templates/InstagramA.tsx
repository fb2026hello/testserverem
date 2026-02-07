import {
    Html,
    Head,
    Preview,
    Body,
    Container,
    Section,
    Img,
    Heading,
    Text,
    Button,
    Hr,
    Link,
} from '@react-email/components';
import * as React from 'react';
import { main, container, h1, text, button, hr, footer } from './styles';

interface InstagramEmailAProps {
    kickstarterUrl?: string;
    githubUrl?: string;
    websiteUrl?: string;
    assetsBaseUrl?: string;
}

export default function InstagramEmailA({
    kickstarterUrl = process.env.KICKSTARTER_URL || 'https://kickstarter.com/projects/clura/clura',
    githubUrl = 'https://github.com/Cluradev/CluraEnclosure',
    websiteUrl = 'https://clura.dev',
    assetsBaseUrl = process.env.ASSETS_BASE_URL || '',
}: InstagramEmailAProps) {
    return (
        <Html>
            <Head />
            <Preview>Open Source hardware + 3d printer enclosure = better and safer printing</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Text style={text}>
                        Hi! I'm Fabrizio.
                    </Text>
                    <Text style={text}>
                        I'm an aerospace engineering student, but mostly I'm just a guy who loves 3D printing and tinkering with open source tech.
                    </Text>
                    <Text style={text}>
                        I'm writing to you because, like you, I spend a lot of time around my printer. But there was always one thing that bugged me: the fumes.
                    </Text>

                    <Img
                        src={`${assetsBaseUrl}/Email_hero_1.jpg`}
                        alt="Clura Enclosure"
                        width="580"
                        height="300"
                        style={{ ...formattedImage, marginBottom: '20px' }}
                    />

                    <Heading style={h1}>So, what did I build?</Heading>
                    <Text style={text}>
                        I built <strong>Clura</strong>. It’s the enclosure I always wanted but couldn't buy. It’s affordable, completely open-source, and it actually keeps the air in your workshop clean.
                    </Text>
                    <Text style={text}>
                        I started this project because I wanted to print in my bedroom without destroying my lungs with VOCs and particulates. Since nothing good existed, I decided to DIY the ultimate solution.
                    </Text>

                    <Heading style={h1}>Why check it out?</Heading>
                    <Text style={text}>
                        I figured since you follow 3D printing pages, you might dig this. I'm just here to share a solution to a problem we all have.
                    </Text>
                    <Text style={text}>
                        We have a Github repo with all our files, and a documentation page if you want to see how it works. We are also launching on Kickstarter soon, so if you want to grab a kit for your setup, now is the time to look.
                    </Text>

                    <Section style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <Button style={button} href={githubUrl}>
                            Check the Github
                        </Button>
                        <Button style={{ ...button, backgroundColor: '#05ce78' }} href={websiteUrl}>
                            Want to learn more? Visit clura.dev
                        </Button>
                    </Section>

                    <Heading style={h1}>What can Clura actually do for you?</Heading>
                    <ul style={{ ...text, paddingLeft: '20px' }}>
                        <li><strong>Air Filtration:</strong> Filters the nasty stuff so you breathe easy.</li>
                        <li><strong>Filament Scale:</strong> Tells you exactly how much plastic you have left.</li>
                        <li><strong>Smart Screen:</strong> Controls your printer's environment with a touch interface.</li>
                    </ul>

                    <Text style={text}>
                        Cheers,
                        <br />
                        Fabrizio
                    </Text>

                    <Hr style={hr} />

                    <Text style={footer}>
                        Sent via Clura Engine
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}

const formattedImage = {
    borderRadius: '8px',
    objectFit: 'cover' as const,
    width: '100%',
};
