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

interface SuperbackerEmailBProps {
    kickstarterUrl?: string;
    githubUrl?: string;
    assetsBaseUrl?: string;
}

export default function SuperbackerEmailB({
    kickstarterUrl = process.env.KICKSTARTER_URL || 'https://kickstarter.com/projects/clura/clura',
    githubUrl = 'https://github.com/Cluradev/CluraEnclosure',
    assetsBaseUrl = process.env.ASSETS_BASE_URL || '',
}: SuperbackerEmailBProps) {
    return (
        <Html>
            <Head />
            <Preview>Open source hardware + Aerospace eng. student = Awesome 3d printer enclosure</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Text style={text}>
                        Hi, I'm Fabrizio.
                    </Text>
                    <Text style={text}>
                        I know you must receive a lot of emails like this—people trying to hype up their products to get a pledge.
                    </Text>
                    <Text style={text}>
                        To be honest, I initially did not want to send this. I felt that it made our project look like all of these "companies" just trying to sell you something. <strong>But we're different.</strong> Everything I have ever made is open source and available on my github.
                    </Text>
                    <Text style={text}>
                        I have spent the last 18 months of my life working on this project as an aerospace engineering student. My goal isn't just to sell units; it is to help as many makers as possible safeguard their health when 3d printing.
                    </Text>

                    <Heading style={h1}>This is Clura:</Heading>
                    <Text style={text}>
                        It is a fully open-source hardware ecosystem designed to make printing safer and smarter.
                    </Text>

                    <Img
                        src={`${assetsBaseUrl}/Email_hero_1.jpg`}
                        alt="Clura Enclosure"
                        width="580"
                        height="300"
                        style={{ ...formattedImage, marginBottom: '20px' }}
                    />

                    <Text style={text}>
                        Unlike generic acrylic boxes, Clura is an engineered system involving:
                    </Text>
                    <ul style={{ ...text, paddingLeft: '20px' }}>
                        <li><strong>Smart Sensing:</strong> Integrated environmental sensors (VOC, PM2.5, Temp/Humidity) running on custom open firmware.</li>
                        <li><strong>Active Filtration:</strong> Not just a fan, but a scrubbing loop designed to actually trap harmful particles.</li>
                        <li><strong>Filament Intelligence:</strong> A built-in load cell system that tracks filament usage by weight, so you never start a print you can't finish.</li>
                        <li><strong>Modularity:</strong> It’s built on standard profiles and printable parts, meaning you can adapt it to a Prusa, an Ender, or a custom rig.</li>
                    </ul>

                    <Heading style={h1}>Here is the deal:</Heading>
                    <Text style={text}>
                        I don't care if you choose to self-source the components following our Bill of Materials and our extensive guides, or if you buy our kit to support us.
                    </Text>
                    <Text style={text}>
                        All I care is that I have helped another maker with something that I care deeply about. I wanted to give you this option.
                    </Text>

                    <Section style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <Text style={text}>If you want to build it yourself, grab the files here:</Text>
                        <Button style={button} href={githubUrl}>
                            View on Github
                        </Button>

                        <Text style={text}>If you want to save time and support the dev work, grab a kit on Kickstarter:</Text>
                        <Button style={{ ...button, backgroundColor: '#05ce78' }} href={kickstarterUrl}>
                            Follow the Project
                        </Button>
                    </Section>

                    <Text style={text}>
                        I hope this helps your setup.
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
