import type { Metadata } from "next";
import { Container } from "@/components/ui/shared";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How NeuroPet collects, uses, and protects your personal data.",
};

/* ── section heading helper ── */
function SectionH2({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: "var(--font-poppins, 'Poppins', sans-serif)",
      fontSize: "20px",
      fontWeight: 700,
      color: "#182b49",       /* navy */
      marginTop: "36px",
      marginBottom: "12px",
    }}>{children}</h2>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: "var(--font-open-sans, 'Open Sans', sans-serif)",
      fontSize: "14.5px",
      color: "#7a8291",
      lineHeight: 1.8,
      marginBottom: "12px",
    }}>{children}</p>
  );
}

function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <li style={{
      display: "flex",
      alignItems: "flex-start",
      gap: "10px",
      marginBottom: "10px",
      fontFamily: "var(--font-open-sans, 'Open Sans', sans-serif)",
      fontSize: "14.5px",
      color: "#7a8291",
      lineHeight: 1.75,
    }}>
      <span style={{
        flexShrink: 0,
        width: "7px", height: "7px",
        borderRadius: "50%",
        background: "#1c58a9",
        marginTop: "7px",
      }} />
      {children}
    </li>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ position: "relative", height: "320px", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/servicepg.jpg"
          alt="Privacy Policy"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          loading="eager"
        />
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(10,15,25,.45) 0%, rgba(10,15,25,0) 55%)",
        }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: "60px" }}>
          <Container>
            <h1 style={{
              fontFamily: "var(--font-poppins, 'Poppins', sans-serif)",
              fontSize: "48px", fontWeight: 600, color: "#fff",
              letterSpacing: "1px", marginBottom: "18px", lineHeight: 1.1,
            }}>Privacy Policy</h1>
            <span style={{
              display: "inline-block", background: "#e6266f", color: "#fff",
              padding: "9px 22px", borderRadius: "4px",
              fontFamily: "var(--font-poppins, 'Poppins', sans-serif)",
              fontSize: "13px", fontWeight: 600, letterSpacing: ".3px",
            }}>NeuroPet &nbsp;›&nbsp; Privacy Policy</span>
          </Container>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section style={{ background: "#fff", padding: "70px 0 90px" }}>
        <Container>
          <div style={{ maxWidth: "820px" }}>

            {/* Intro */}
            <Body>
              At NeuroPet, we are committed to protecting the privacy and security of our clients
              and site visitors, including you. This privacy policy will explain how our organisation
              uses the personal data we collect from you when you use our website.
            </Body>

            {/* ── Data Controller ── */}
            <SectionH2>Data Controller and Owner</SectionH2>
            <Body>
              NeuroPet — Registered Office: 123 Pet Care Lane, London, UK.
              Owner: NeuroPet Team.
            </Body>

            {/* ── What data ── */}
            <SectionH2>What data do we collect?</SectionH2>
            <Body>
              Personal data, or personal information, means any information about an individual
              from which that person can be identified. It does not include data where the identity
              has been removed (anonymous data). We may collect, use, store and transfer different
              kinds of personal data about you, grouped as follows:
            </Body>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px" }}>
              <BulletItem><strong>Identity Data</strong> — includes name.</BulletItem>
              <BulletItem><strong>Contact Data</strong> — includes billing address, delivery address, email address and telephone numbers.</BulletItem>
              <BulletItem><strong>Pet Data</strong> — includes pet&apos;s name, species, date of birth, breed/colour and gender.</BulletItem>
              <BulletItem><strong>Pet Medical History Data</strong> — includes name and address of vet, medical history and behavioural background.</BulletItem>
              <BulletItem><strong>Financial Data</strong> — includes bank account and payment card details.</BulletItem>
              <BulletItem><strong>Transaction Data</strong> — includes details about payments to and from you and other details of products and services you have purchased.</BulletItem>
              <BulletItem><strong>Technical Data</strong> — includes IP address, login data, browser type and version, time zone setting, browser plug-in types, operating system and platform.</BulletItem>
              <BulletItem><strong>Usage Data</strong> — includes information about how you use our website, products and services.</BulletItem>
            </ul>

            {/* ── How we use ── */}
            <SectionH2>How will we use your data?</SectionH2>
            <Body>We collect your data so that we can:</Body>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px" }}>
              <BulletItem>Follow up on enquiries received directly through email or phone.</BulletItem>
              <BulletItem>Assist us in providing services to you.</BulletItem>
              <BulletItem>Ensure our contractual obligations are met.</BulletItem>
            </ul>

            {/* ── Third parties ── */}
            <SectionH2>Are we going to share data with third parties?</SectionH2>
            <Body>
              We do not share, sell, rent or trade your information with third parties.
              Requests for recommendations or referrals are shared only with prior consent.
            </Body>

            {/* ── How we store ── */}
            <SectionH2>How do we store your data?</SectionH2>
            <Body>
              NeuroPet is committed to protecting the security of your personal information.
              We use a variety of security technologies and procedures to help protect your personal
              information from unauthorised access, use or disclosure. We have validated that all
              third-party vendors we use internally are GDPR compliant. Personal data shall be
              processed and stored for as long as required by the purpose for which it was collected.
            </Body>

            {/* ── Rights ── */}
            <SectionH2>What are your data protection rights?</SectionH2>
            <Body>
              NeuroPet would like to make sure you are fully aware of all of your data protection
              rights. Every user is entitled to the following:
            </Body>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px" }}>
              <BulletItem><strong>The right to access</strong> — You have the right to request copies of your personal data.</BulletItem>
              <BulletItem><strong>The right to rectification</strong> — You have the right to request that we correct any information you believe is inaccurate or incomplete.</BulletItem>
              <BulletItem><strong>The right to erasure</strong> — You have the right to request that we erase your personal data, under certain conditions.</BulletItem>
              <BulletItem><strong>The right to restrict processing</strong> — You have the right to request that we restrict the processing of your personal data, under certain conditions.</BulletItem>
              <BulletItem><strong>The right to object to processing</strong> — You have the right to object to our processing of your personal data, under certain conditions.</BulletItem>
              <BulletItem><strong>The right to data portability</strong> — You have the right to request that we transfer the data we have collected to another organisation, or directly to you, under certain conditions.</BulletItem>
            </ul>
            <Body>
              If you would like to exercise any of these rights, please contact us at{" "}
              <a href="mailto:hello@neuropet.com" style={{ color: "#1c58a9", fontWeight: 600 }}>
                hello@neuropet.com
              </a>{" "}
              or via our postal address: 123 Pet Care Lane, London, UK.
            </Body>

            {/* ── Cookies ── */}
            <SectionH2>Cookie Policy</SectionH2>
            <Body>
              We use cookies on our website to collect information to improve the content of our
              site and the services we offer. No personal data is collected on our website — we can
              see who visits the site and what pages you have visited but we cannot personally
              identify you from this information.
            </Body>

            {/* ── Changes ── */}
            <SectionH2>Changes</SectionH2>
            <Body>
              We reserve the right to modify this Policy at any time. If we decide to change our
              Policy, we will post those changes to this Policy and any other places we deem
              appropriate, so that you are aware of what information we collect, how we use it,
              and under what circumstances, if any, we disclose it. If we make material changes
              to this Policy, we will amend the published date on the web page in question.
            </Body>

            {/* Last updated */}
            <p style={{
              fontFamily: "var(--font-open-sans, 'Open Sans', sans-serif)",
              fontSize: "13px",
              color: "#7a8291",
              marginTop: "36px",
              paddingTop: "20px",
              borderTop: "1px solid #e4e6ea",
            }}>
              Last Updated: 24/07/2020
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
