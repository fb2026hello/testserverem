import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
    Hr,
} from "@react-email/components";
import * as React from "react";

const KICKSTARTER_URL = process.env.KICKSTARTER_URL || 'https://kickstarter.com/projects/clura/clura';

interface EmailProps {
    name?: string;
}

export const SuperbackerEmailD = ({ name }: EmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>A safer way to 3D print, built by an aerospace student.</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Img
                        src="https://www.clura.dev/Email_logo_1.jpg"
                        alt="Clura"
                        width="140"
                        style={logo}
                    />

                    <Img
                        src="https://www.clura.dev/Email_hero_1.jpg"
                        alt="Clura Enclosure"
                        style={heroImage}
                    />

                    <Text style={text}>
                        Hi {name || 'Maker'}, I'm Fabrizio.
                    </Text>

                    <Text style={text}>
                        I'm an aerospace engineering student building an **Open Source 3D Printer Enclosure** to help the community.
                    </Text>

                    <Text style={text}>
                        So, you might be asking yourself: Why am I writing to you?
                        <br /><br />
                        I am writing to share a solution to a problem that many makers don't consider enough until it's too late: Air Quality.
                    </Text>

                    <Section style={box}>
                        <Heading as="h3" style={{ ...h3, marginTop: 0 }}>I built Clura.</Heading>
                        <Text style={{ ...text, padding: 0, marginBottom: '12px' }}>
                            The best completely open-source enclosure ecosystem featuring:
                        </Text>
                        <ul style={{ paddingLeft: '20px', margin: 0 }}>
                            <li style={listItem}>
                                <strong>Active Air Filtration:</strong> Real HEPA/Carbon scrubbing to remove VOCs.
                            </li>
                            <li style={listItem}>
                                <strong>Filament Weight Sensing:</strong> Know exactly how much material you have left.
                            </li>
                            <li style={listItem}>
                                <strong>Smart Ecosystem:</strong> A touch screen + sensors to monitor your print environment.
                            </li>
                        </ul>
                    </Section>

                    <Text style={text}>
                        I started this project because I wanted to print in my room without destroying my lungs (3D Printing releases VOCs and particulates in the air). I wanted an affordable, feature-packed enclosure that could be adapted to any printer. None existed, so I made my own.
                    </Text>

                    <Text style={text}>
                        I thought that you might want to check out our <Link href="https://github.com/Cluradev/CluraEnclosure" style={link}>GitHub repo</Link> which contains everything we have ever made and our documentation page.
                    </Text>

                    <Section style={{ padding: "16px 0 16px", textAlign: "center" as const }}>
                        <Button href={KICKSTARTER_URL} style={buttonKickstarter}>
                            Get the Kit on Kickstarter
                        </Button>
                        <Text style={{ ...caption, marginTop: "12px" }}>
                            Or <Link style={link} href="https://github.com/Cluradev/CluraEnclosure">view on GitHub</Link>
                        </Text>
                    </Section>

                    <Hr style={hr} />

                    <Text style={text}>
                        Best,
                        <br />
                        Fabrizio
                    </Text>

                    <Text style={footerLinks}>
                        <Link href="https://clura.dev" style={link}>Visit Website</Link> • <Link href="https://clura.dev/unsubscribe" style={link}>Unsubscribe</Link>
                        <br />
                        <br />
                        Clura Srls.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
};

export default SuperbackerEmailD;

// STYLES (Brand)
const main: React.CSSProperties = {
    backgroundColor: "#f6f9fc",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
    padding: "40px 0",
};

const container: React.CSSProperties = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "40px 0 48px",
    marginBottom: "64px",
    borderRadius: "8px",
    maxWidth: "600px",
    border: "1px solid #f0f0f0",
};

const logo: React.CSSProperties = {
    display: "block",
    margin: "0 auto 24px auto",
};

const heroImage: React.CSSProperties = {
    display: "block",
    maxWidth: "100%",
    width: "calc(100% - 80px)",
    margin: "0 auto 32px auto",
    borderRadius: "12px",
    border: "1px solid #eaeaea",
    height: "auto",
};

const text: React.CSSProperties = {
    color: "#333",
    fontSize: "16px",
    lineHeight: "26px",
    padding: "0 40px",
    marginBottom: "20px",
    marginTop: "0",
};

const box: React.CSSProperties = {
    padding: "24px 30px",
    backgroundColor: "#fafafa",
    margin: "0 40px 24px 40px",
    borderRadius: "8px",
    border: "1px solid #eaeaea",
    width: "auto",
};

const h3: React.CSSProperties = {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: "12px",
};

const listItem: React.CSSProperties = {
    fontSize: "15px",
    lineHeight: "24px",
    color: "#444",
    marginBottom: "8px",
};

const buttonKickstarter: React.CSSProperties = {
    backgroundColor: "#05CE78", // Kickstarter Green
    color: "#ffffff",
    padding: "14px 24px",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "600",
    textDecoration: "none",
    display: "inline-block",
    textAlign: "center" as const,
};

const caption: React.CSSProperties = {
    fontSize: "14px",
    color: "#666",
    margin: "0",
};

const hr: React.CSSProperties = {
    borderColor: "#e6ebf1",
    margin: "32px 40px",
    borderTop: "1px solid #e6ebf1",
};

const footerLinks: React.CSSProperties = {
    color: "#aaa",
    fontSize: "12px",
    marginTop: "24px",
    padding: "0 40px",
    textAlign: "center" as const,
};

const link: React.CSSProperties = {
    color: "#888",
    textDecoration: "underline",
};
