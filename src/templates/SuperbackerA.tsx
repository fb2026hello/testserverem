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

interface SuperbackerEmailAProps {
    kickstarterUrl?: string;
    githubUrl?: string;
    assetsBaseUrl?: string;
}

export default function SuperbackerEmailA({
    kickstarterUrl = process.env.KICKSTARTER_URL || 'https://kickstarter.com/projects/clura/clura',
    githubUrl = 'https://github.com/Cluradev/CluraEnclosure',
    assetsBaseUrl = process.env.ASSETS_BASE_URL || '',
}: SuperbackerEmailAProps) {
    return (
        <Html>
            <Head />
            <Preview>Open Source hardware + 3d printer enclosure = better and safer printing</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Text style={text}>
                        Hi, I'm Fabrizio. I'm an aerospace engineering student with a desire to help the open source community.
                    </Text>
                    <Text style={text}>
                        So, you might be asking yourself: Why am I writing to you?
                    </Text>
                    <Text style={text}>
                        I am writing to share a solution to a problem that many makers don't consider enough until it's too late: Air Quality.
                    </Text>

                    <Img
                        src={`${assetsBaseUrl}/Email_hero_1.jpg`}
                        alt="Clura Enclosure"
                        width="580"
                        height="300"
                        style={{ ...formattedImage, marginBottom: '20px' }}
                    />

                    <Heading style={h1}>What did I build?</Heading>
                    <Text style={text}>
                        I built Clura, the best completely open-source enclosure ecosystem featuring air filtration, environmental sensors, and more.
                    </Text>
                    <Text style={text}>
                        I started this project because I wanted to print in my room without destroying my lungs (3D Printing releases VOCs and particulates in the air). I wanted an affordable, feature-packed enclosure that could be adapted to any printer. None existed, so I made my own.
                    </Text>

                    <Heading style={h1}>Why am I writing to you?</Heading>
                    <Text style={text}>
                        I'm here to just share with you the solution to a problem which I think many makers don't consider enough. I thought that you might want to check out our github repo which contains everything we have ever made and our documentation page.
                    </Text>
                    <Text style={text}>
                        We are also launching on Kickstarter soon and if you wanted to support the project you could get the enclosure kit at a discounted price.
                    </Text>

                    <Section style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <Button style={button} href={githubUrl}>
                            Check the Github
                        </Button>
                        <Button style={{ ...button, backgroundColor: '#05ce78' }} href={kickstarterUrl}>
                            Follow on Kickstarter
                        </Button>
                    </Section>

                    <Heading style={h1}>Want to learn more? Here is what Clura can do:</Heading>
                    <Text style={text}>
                        <strong>Feature 1 - Active Air Filtration:</strong> Real HEPA/Carbon scrubbing to remove VOCs.
                    </Text>
                    <Text style={text}>
                        <strong>Feature 2 - Filament Weight Sensing:</strong> Know exactly how much material you have left.
                    </Text>
                    <Text style={text}>
                        <strong>Feature 3 - Smart Ecosystem:</strong> A touch screen + sensors to monitor your print environment.
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
