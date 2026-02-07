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

interface InstagramEmailCProps {
    blogUrl?: string;
    websiteUrl?: string;
    assetsBaseUrl?: string;
}

export default function InstagramEmailC({
    blogUrl = 'https://www.clura.dev/en/blog/air-quality',
    websiteUrl = 'https://clura.dev',
    assetsBaseUrl = process.env.ASSETS_BASE_URL || '',
}: InstagramEmailCProps) {
    return (
        <Html>
            <Head />
            <Preview>Do you 3d print? This could save your lungs. An open source 3d printer enclosure</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Text style={text}>
                        Hi, I'm Fabrizio.
                    </Text>
                    <Text style={text}>
                        We all love 3D printing, but we rarely talk about the invisible cost: <strong>Air Quality.</strong>
                    </Text>
                    <Text style={text}>
                        When you melt plastic—even standard PLA—it releases VOCs (Volatile Organic Compounds) and ultrafine particles. If you print in your bedroom or home office like I do, you are breathing this in for hours every day.
                    </Text>
                    <Text style={text}>
                        I realized this 18 months ago, and I refused to stop printing. So I used my background in aerospace engineering to build a solution.
                    </Text>

                    <Img
                        src={`${assetsBaseUrl}/Email_hero_1.jpg`}
                        alt="Clura Enclosure"
                        width="580"
                        height="300"
                        style={{ ...formattedImage, marginBottom: '20px' }}
                    />

                    <Heading style={h1}>I built Clura: An Open Source Enclosure.</Heading>
                    <Text style={text}>
                        I designed this specifically to scrub the air and keep your environment safe, without breaking the bank.
                    </Text>
                    <Text style={text}>
                        I actually wrote a detailed guide on the health effects of 3D printing and how to mitigate them.
                    </Text>

                    <Section style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <Button style={button} href={blogUrl}>
                            Read the Article: Air Quality & 3D Printing
                        </Button>
                    </Section>

                    <Heading style={h1}>What is Clura?</Heading>
                    <Text style={text}>
                        It is the enclosure I built to solve this problem.
                    </Text>
                    <ul style={{ ...text, paddingLeft: '20px' }}>
                        <li>It has <strong>Smart Sensors</strong> to detect pollution.</li>
                        <li>It has <strong>Active Filtration</strong> to clean the air.</li>
                    </ul>

                    <Text style={text}>
                        Check out the blog to learn more about the health side, and if you like the project, you can sign up on the site to get notified when we launch.
                    </Text>

                    <Hr style={hr} />

                    <Text style={text}>
                        Stay safe,
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
