import Link from "next/link";
import { Container } from "@/components/ui/shared";
import { blogPosts, siteConfig } from "@/lib/site-config";
import { ServicesNewsletter } from "@/components/services/sections";

/* ── helpers ── */
function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    day: d.toLocaleDateString("en-GB", { day: "2-digit" }),
    month: d.toLocaleDateString("en-GB", { month: "short" }).toUpperCase(),
    full: d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
  };
}

/* ── Sidebar (shared by list + detail) ── */
export function BlogSidebar({ activeSlug }: { activeSlug?: string }) {
  return (
    <aside style={{ display: "flex", flexDirection: "column", gap: "36px" }}>

      {/* Recent Posts */}
      <div>
        {/* Pink accent line + heading */}
        <div style={{ borderTop: "3px solid #e6266f", width: "40px", marginBottom: "14px" }} />
        <h3 style={{
          fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
          fontSize: "18px", fontWeight: 700, color: "#182b49", marginBottom: "20px",
        }}>Recent Posts</h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {blogPosts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              style={{
                display: "flex", gap: "12px", alignItems: "flex-start",
                textDecoration: "none",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt="" style={{
                width: "64px", height: "52px", objectFit: "cover",
                borderRadius: "2px", flexShrink: 0,
              }} />
              <span style={{
                fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
                fontSize: "13px", fontWeight: 600,
                color: activeSlug === p.slug ? "#e6266f" : "#182b49",
                lineHeight: 1.4,
              }}>{p.title}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <div style={{ borderTop: "3px solid #e6266f", width: "40px", marginBottom: "14px" }} />
        <h3 style={{
          fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
          fontSize: "18px", fontWeight: 700, color: "#182b49", marginBottom: "14px",
        }}>Categories</h3>
        {["Dog Behaviour", "Cat Behaviour", "Puppy Training"].map((cat) => (
          <div key={cat} style={{
            fontFamily: "var(--font-open-sans,'Open Sans',sans-serif)",
            fontSize: "13.5px", color: "#7a8291", marginBottom: "8px",
          }}>{cat}</div>
        ))}
      </div>

      {/* Follow us */}
      <div>
        <div style={{ borderTop: "3px solid #e6266f", width: "40px", marginBottom: "14px" }} />
        <h3 style={{
          fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
          fontSize: "18px", fontWeight: 700, color: "#182b49", marginBottom: "16px",
        }}>Follow us</h3>
        <div style={{ display: "flex", gap: "10px" }}>
          {[
            { href: siteConfig.social.facebook,  label: "Facebook",  letter: "f" },
            { href: siteConfig.social.instagram, label: "Instagram", letter: "◎" },
            { href: siteConfig.social.twitter,   label: "Twitter",   letter: "t" },
            { href: siteConfig.social.linkedin,  label: "LinkedIn",  letter: "in" },
          ].map(({ href, label, letter }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              style={{
                width: "34px", height: "34px", borderRadius: "50%",
                background: "#1c58a9", color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
                fontSize: "13px", fontWeight: 700, textDecoration: "none",
              }}
            >{letter}</a>
          ))}
        </div>
      </div>

      {/* Archives */}
      <div>
        <div style={{ borderTop: "3px solid #e6266f", width: "40px", marginBottom: "14px" }} />
        <h3 style={{
          fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
          fontSize: "18px", fontWeight: 700, color: "#182b49", marginBottom: "14px",
        }}>Archives</h3>
        {["March 2026", "February 2026"].map((a) => (
          <div key={a} style={{
            fontFamily: "var(--font-open-sans,'Open Sans',sans-serif)",
            fontSize: "13.5px", color: "#7a8291", marginBottom: "8px",
          }}>{a}</div>
        ))}
      </div>
    </aside>
  );
}

/* ══════════════════════════════════════════
   BLOG LIST PAGE
══════════════════════════════════════════ */
export default function BlogPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ position: "relative", height: "430px", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/servicepg.jpg"
          alt="Blog"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          loading="eager"
        />
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(10,15,25,.38) 0%, rgba(10,15,25,0) 55%)",
        }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: "70px" }}>
          <Container>
            <h1 style={{
              fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
              fontSize: "56px", fontWeight: 600, color: "#fff",
              letterSpacing: "1px", marginBottom: "22px", lineHeight: 1.1,
            }}>Blog</h1>
            <span style={{
              display: "inline-block", background: "#e6266f", color: "#fff",
              padding: "9px 22px", borderRadius: "4px",
              fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
              fontSize: "13px", fontWeight: 600, letterSpacing: ".3px",
            }}>NeuroPet &nbsp;›&nbsp; Blog</span>
          </Container>
        </div>
      </section>

      {/* ── CONTENT + SIDEBAR ── */}
      <section style={{ background: "#fff", padding: "70px 0" }}>
        <Container>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: "60px",
            alignItems: "start",
          }}
            className="max-lg:grid-cols-1"
          >
            {/* ── LEFT: card grid ── */}
            <div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "28px",
              }}
                className="max-md:grid-cols-1"
              >
                {blogPosts.map((post) => {
                  const d = formatDate(post.date);
                  return (
                    <article
                      key={post.slug}
                      style={{
                        background: "#fff",
                        border: "1px solid #e4e6ea",
                        borderRadius: "2px",
                        overflow: "hidden",
                      }}
                    >
                      {/* Image + date badge */}
                      <div style={{ position: "relative" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.image}
                          alt={post.title}
                          style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }}
                        />
                        {/* Pink date badge — top-left corner */}
                        <div style={{
                          position: "absolute", top: "14px", left: "14px",
                          background: "#e6266f", color: "#fff", textAlign: "center",
                          padding: "6px 10px", minWidth: "44px",
                          borderRadius: "2px",
                        }}>
                          <div style={{
                            fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
                            fontSize: "18px", fontWeight: 700, lineHeight: 1,
                          }}>{d.day}</div>
                          <div style={{
                            fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
                            fontSize: "10px", fontWeight: 600, letterSpacing: "1px",
                          }}>{d.month}</div>
                        </div>
                      </div>

                      {/* Card body */}
                      <div style={{ padding: "20px 22px 24px" }}>
                        <h2 style={{
                          fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
                          fontSize: "16px", fontWeight: 700,
                          color: "#182b49", marginBottom: "10px", lineHeight: 1.4,
                        }}>{post.title}</h2>

                        <p style={{
                          fontFamily: "var(--font-open-sans,'Open Sans',sans-serif)",
                          fontSize: "13.5px", color: "#7a8291",
                          lineHeight: 1.7, marginBottom: "14px",
                        }}>
                          {post.excerpt}
                        </p>

                        {/* Posted by */}
                        <div style={{
                          display: "flex", alignItems: "center", gap: "6px",
                          marginBottom: "16px",
                          fontFamily: "var(--font-open-sans,'Open Sans',sans-serif)",
                          fontSize: "12.5px", color: "#7a8291",
                        }}>
                          <span>Posted by</span>
                          <span style={{
                            color: "#1c58a9", fontWeight: 600,
                            fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
                          }}>🐾 neuropet</span>
                        </div>

                        {/* READ MORE button */}
                        <Link
                          href={`/blog/${post.slug}`}
                          style={{
                            display: "inline-block",
                            background: "#1c58a9", color: "#fff",
                            padding: "11px 28px", borderRadius: "26px",
                            fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
                            fontWeight: 700, fontSize: "12px", letterSpacing: ".5px",
                            textDecoration: "none", transition: "background .2s",
                          }}
                        >
                          READ MORE
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Pagination */}
              <div style={{
                display: "flex", alignItems: "center", gap: "6px", marginTop: "40px",
              }}>
                {[1, 2].map((n) => (
                  <button
                    key={n}
                    style={{
                      width: "34px", height: "34px",
                      background: n === 1 ? "#1c58a9" : "#fff",
                      color: n === 1 ? "#fff" : "#182b49",
                      border: "1px solid #e4e6ea",
                      fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
                      fontWeight: 700, fontSize: "13px", cursor: "pointer",
                      borderRadius: "2px",
                    }}
                  >{n}</button>
                ))}
                <button style={{
                  padding: "0 18px", height: "34px",
                  background: "#fff", color: "#182b49",
                  border: "1px solid #e4e6ea",
                  fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
                  fontWeight: 700, fontSize: "13px", cursor: "pointer",
                  borderRadius: "2px",
                }}>Next</button>
              </div>
            </div>

            {/* ── RIGHT: sidebar ── */}
            <BlogSidebar />
          </div>
        </Container>
      </section>

      <ServicesNewsletter />
    </>
  );
}
