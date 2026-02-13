import React from "react";

const CivilianRegistration = () => {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        backgroundColor: "#fafafa",
        color: "#262626",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* GOOGLE FONT */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* MAIN */}
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          padding: "40px 20px",
          gap: "80px",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* LEFT CONTENT */}
        <div
          style={{
            display: "none",
            flexDirection: "column",
            justifyContent: "center",
            width: "400px",
          }}
          className="left-content"
        >
          <h1
            style={{
              fontSize: "5rem",
              fontWeight: 800,
              color: "#2FA4A9",
              marginBottom: "10px",
              lineHeight: 1.1,
              letterSpacing: "-2px",
            }}
          >
            Welcome!
          </h1>

          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#333",
              marginBottom: "20px",
            }}
          >
            Join the Findmymeds community.
          </h2>

          <p
            style={{
              fontSize: "1.1rem",
              color: "#666",
              lineHeight: 1.6,
              marginBottom: "40px",
            }}
          >
            Create your account to easily find, track, and manage your
            medications from pharmacies near you. Fast, reliable, and secure.
          </p>

          <button
            onClick={() => window.history.back()}
            style={{
              width: "fit-content",
              padding: "12px 30px",
              backgroundColor: "transparent",
              border: "2px solid #2FA4A9",
              color: "#2FA4A9",
              borderRadius: "30px",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            ← Back to Login
          </button>
        </div>

        {/* RIGHT CONTENT */}
        <div style={{ width: "100%", maxWidth: "450px" }}>
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #dbdbdb",
              borderRadius: "12px",
              padding: "40px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
              <h2
                style={{
                  color: "#333",
                  fontSize: "1.8rem",
                  marginBottom: "5px",
                  fontWeight: 700,
                }}
              >
                Create Account
              </h2>
            </div>

            <form
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  style={inputStyle}
                />
              </div>

              <input
                type="email"
                placeholder="Email Address"
                required
                style={inputStyle}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                style={inputStyle}
              />
              <input type="text" placeholder="Address" style={inputStyle} />

              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  placeholder="Postal Code"
                  style={inputStyle}
                />
                <input type="text" placeholder="City" style={inputStyle} />
              </div>

              <input type="text" placeholder="District" style={inputStyle} />
              <input
                type="password"
                placeholder="Password"
                required
                style={inputStyle}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                style={inputStyle}
              />

              <button
                type="submit"
                style={{
                  backgroundColor: "#2FA4A9",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "14px",
                  fontWeight: 700,
                  fontSize: "16px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          padding: "30px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
          fontSize: "12px",
          color: "#8e8e8e",
          marginTop: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "15px",
          }}
        >
          <span>About</span>
          <span>Contact</span>
          <span>Help</span>
          <span>Privacy & Terms</span>
          <span>FAQs</span>
        </div>

        <div>© 2025 Findmymeds from Sri Lanka</div>
      </footer>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  backgroundColor: "#fafafa",
  border: "1px solid #dbdbdb",
  borderRadius: "6px",
  padding: "12px 15px",
  fontSize: "14px",
  color: "#262626",
  outline: "none",
};

export default CivilianRegistration;
