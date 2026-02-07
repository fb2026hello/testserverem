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
} from '@react-email/components';
import * as React from 'react';
import { main, container, h1, text, button, hr, footer } from './styles';

interface InstagramEmailBProps {
    websiteUrl?: string;
    assetsBaseUrl?: string;
}

export default function InstagramEmailB({
    websiteUrl = 'https://clura.dev',
    assetsBaseUrl = process.env.ASSETS_BASE_URL || '',
}: InstagramEmailBProps) {
    return (
        <Html>
            <Head />
            <Preview>The Ultimate 3d printer enclosure for your Prusa MK3/4 & Prusa Mini</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Text style={text}>
                        Hi, I'm Fabrizio.
                    </Text>
                    <Text style={text}>
                        A while back, I was looking for an enclosure for my Prusa. I saw the main options on the market costing nearly €500 when picked out with some features.
                    </Text>

                    <Heading style={h1}>I didn't want to spend €500 on a box.</Heading>

                    <Text style={text}>
                        Especially one that didn't even have smart sensors. I felt I could do better—create something affordable that wasn't just "a box," but a whole ecosystem for my printer.
                    </Text>

                    <Img
                        src={`${assetsBaseUrl}/Email_hero_1.jpg`}
                        alt="Clura Enclosure"
                        width="580"
                        height="300"
                        style={{ ...formattedImage, marginBottom: '20px' }}
                    />

                    <Heading style={h1}>So I built Clura.</Heading>
                    <Text style={text}>
                        It’s an upgrade for your entire printing experience. It’s not just about saving money; it’s about getting more features than the expensive industrial options:
                    </Text>

                    <ol style={{ ...text, paddingLeft: '20px' }}>
                        <li><strong>Safety:</strong> It uses active air circulation through HEPA/Carbon filters to scrub VOCs (essential if you print indoors).</li>
                        <li><strong>Smarts:</strong> It includes a smart screen that tracks temperature, humidity, and air quality in real-time.</li>
                        <li><strong>Filament Tracking:</strong> It weighs your spool as you print, so you never fail a print due to running out of material.</li>
                    </ol>

                    <Text style={text}>
                        I'm launching this project soon to help other makers upgrade their setup without the crazy price tag.
                    </Text>

                    <Section style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <Button style={button} href={websiteUrl}>
                            Join the Waitlist at clura.dev
                        </Button>
                    </Section>

                    <Text style={text}>
                        Don't settle for overpriced gear. Build better.
                    </Text>

                    <Hr style={hr} />

                    <Text style={text}>
                        Best,
                        <br />
                        Fabrizio
                    </Text>
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
