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

interface SuperbackerEmailCProps {
    kickstarterUrl?: string;
    githubUrl?: string;
    assetsBaseUrl?: string;
}

export default function SuperbackerEmailC({
    kickstarterUrl = process.env.KICKSTARTER_URL || 'https://kickstarter.com/projects/clura/clura',
    githubUrl = 'https://github.com/Cluradev/CluraEnclosure',
    assetsBaseUrl = process.env.ASSETS_BASE_URL || '',
}: SuperbackerEmailCProps) {
    return (
        <Html>
            <Head />
            <Preview>The 3d printer enclosure I wished someone built (Open Source & Affordable)</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Text style={text}>
                        Hi, I'm Fabrizio.
                    </Text>
                    <Text style={text}>
                        I'm an aerospace engineering student, but really, I'm just a maker who got tired of proprietary hardware.
                    </Text>
                    <Text style={text}>
                        I wanted to print safely in my room, but the only good enclosures on the market were closed-source, expensive, and unmodifiable. The cheap ones were just fire hazards.
                    </Text>

                    <Heading style={h1}>I wished someone had built a high-quality, open-source ecosystem.</Heading>
                    <Text style={text}>
                        No one did, so I spent the last 18 months building it myself.
                    </Text>

                    <Img
                        src={`${assetsBaseUrl}/Email_hero_1.jpg`}
                        alt="Clura Enclosure"
                        width="580"
                        height="300"
                        style={{ ...formattedImage, marginBottom: '20px' }}
                    />

                    <Heading style={h1}>Meet Clura.</Heading>
                    <Text style={text}>
                        Clura is built on the philosophy that you should own your hardware.
                    </Text>
                    <ul style={{ ...text, paddingLeft: '20px' }}>
                        <li><strong>100% Open Source:</strong> Every STL, PCB design, and line of code is available.</li>
                        <li><strong>Community Driven:</strong> Designed to be hacked, modified, and improved by you.</li>
                        <li><strong>Health First:</strong> Professional-grade air filtration to stop VOCs and micro-plastics from damaging your lungs.</li>
                    </ul>

                    <Text style={text}>
                        We are launching on Kickstarter to get these kits into the hands of makers, but the source code is live right now.
                    </Text>
                    <Text style={text}>
                        If you believe in open hardware that actually protects your health, check us out.
                    </Text>

                    <Section style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <Button style={button} href={githubUrl}>
                            Check the Source Code
                        </Button>
                        <Button style={{ ...button, backgroundColor: '#05ce78' }} href={kickstarterUrl}>
                            Support us on Kickstarter
                        </Button>
                    </Section>

                    <Text style={text}>
                        Happy Printing,
                    </Text>

                    <Hr style={hr} />

                    <Text style={text}>
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
