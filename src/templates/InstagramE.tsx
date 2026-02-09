import {
    Body,
    Container,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Text,
} from '@react-email/components';
import * as React from 'react';

const KICKSTARTER_URL = process.env.KICKSTARTER_URL || 'https://kickstarter.com/projects/clura/clura';

interface EmailProps {
    name?: string;
}

export const InstagramEmailE = ({ name }: EmailProps) => (
    <Html>
        <Head />
        <Preview>Seriously. I just want you to print safely. Here is how.</Preview>
        <Body style={main}>
            <Container style={container}>
                <Text style={text}>Hi {name || 'Maker'}, I'm Fabrizio.</Text>

                <Text style={text}>
                    I know you must see a lot of posts and emails like this trying show you a product, in this case a 3D printer enclosure.
                </Text>

                <Text style={text}>
                    To be honest, I initially did not want to send this. I felt that it made our project look like all of these "companies" just trying to sell you something. <strong>But we're different.</strong> Everything I have ever made is open source and available on my GitHub.
                </Text>

                <Text style={text}>
                    I have spent the last 18 months of my life working on this project as an aerospace engineering student. My goal isn't just to sell units; it is to help as many makers as possible safeguard their health when 3D printing.
                </Text>

                {/* Inline image, looks like attachment or pasted image */}
                <Img
                    src="https://www.clura.dev/Email_hero_1.jpg"
                    width="100%"
                    height="auto"
                    alt="Clura Enclosure"
                    style={{ marginTop: '16px', marginBottom: '16px', borderRadius: '4px' }}
                />

                <Text style={text}>
                    <strong>This is Clura.</strong>
                </Text>

                <Text style={text}>
                    Unlike generic acrylic boxes, Clura is an engineered system involving:
                </Text>

                <Text style={text}>
                    • <strong>Active Filtration:</strong> Not just a fan, but a scrubbing loop designed to actually trap harmful particles.
                    <br />• <strong>Filament Intelligence:</strong> A built-in load cell system that tracks filament weight so you never run out of filament mid print.
                    <br />• <strong>Smart Sensing:</strong> Integrated environmental sensors (VOC, PM2.5, Temp) running on custom open firmware.
                </Text>

                <Text style={text}>
                    Here is the deal: I don't care if you choose to self-source the components following our Bill of Materials, or if you buy our kit to support us.
                </Text>

                <Text style={text}>
                    All I care is that I have helped another maker with something that I care deeply about.
                </Text>

                <Text style={text}>
                    If you want to support us, you can <Link href={KICKSTARTER_URL} style={link}>follow the project on Kickstarter</Link> or <Link href="https://github.com/Cluradev/CluraEnclosure" style={link}>view it on GitHub</Link>.
                </Text>

                <Text style={text}>
                    I hope this helps your setup.
                    <br />
                    Fabrizio
                </Text>
            </Container>
        </Body>
    </Html>
);

export default InstagramEmailE;

// Personal "Gmail" Styles
const main: React.CSSProperties = {
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', // Standard Gmail/System font
};

const container: React.CSSProperties = {
    width: '100%',
    maxWidth: '600px',
    margin: '0', // Gmail often has no margin for personal emails, or we align left
    padding: '20px 0 20px 20px', // Slight padding left
    textAlign: 'left',
};

const text: React.CSSProperties = {
    fontSize: '14px', // Gmail standard size
    lineHeight: '1.5',
    color: '#000000',
    marginBottom: '16px',
};

const link: React.CSSProperties = {
    color: '#15c', // Gmail blue
    textDecoration: 'underline',
};
