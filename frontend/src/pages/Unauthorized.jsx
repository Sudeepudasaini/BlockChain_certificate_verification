import React from 'react'

export default function Unauthorized() {
  return (
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .container { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 4rem 2rem; }
        .icon-wrap { width: 72px; height: 72px; border-radius: 50%; background-color: #f5f5f5; border: 1px solid #e0e0e0; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; }
        .icon-wrap i { font-size: 32px; color: #888; }
        /* Target exact measured size: width ~127.61px, height 80px */
       .error-code {
  font-size: 220px !important;      /* increased for clarity, override global p rule */
  line-height: 1 !important;
  font-weight: 900 !important;
  color: #111827 !important;
  letter-spacing: -6px !important;
  margin: 0 0 12px 0 !important;
  text-align: center !important;
  display: block !important;
}
        .title {
 font-size: 32px;
 font-weight: 800;
 margin-bottom: 12px;
}
        .container {
 display:flex;
 flex-direction:column;
 align-items:center;
 text-align:center;
 padding:3rem 2rem;
}
        .subtitle { font-size: 14px; color: #666; line-height: 1.6; max-width: 320px; margin-bottom: 2rem; }
        .btn { display: inline-flex; align-items: center; gap: 7px; background-color: #1a1a1a; color: #ffffff; border: none; border-radius: 8px; padding: 11px 24px; font-size: 14px; font-weight: 500; cursor: pointer; text-decoration: none; transition: opacity 0.15s ease; }
        .btn:hover { opacity: 0.82; }
        .btn i { font-size: 16px; }
        .brand { margin-top: 3rem; font-size: 12px; color: #aaa; display: flex; align-items: center; gap: 6px; }
        .brand i { font-size: 14px; }
      `}</style>

      <div className="container">
        <div className="icon-wrap">
          <i className="ti ti-certificate-off"></i>
        </div>
        <p className="error-code">404</p>
        <h1 className="title">Page not found</h1>
        <p className="subtitle">The page you're looking for doesn't exist or has been moved.</p>
        <a href="/" className="btn" style={{textDecoration: 'none'}}>
          <i className="ti ti-home"></i> Go home
        </a>
        <div className="brand">
          <i className="ti ti-shield-check"></i>
          ChainVerify AI
        </div>
      </div>
    </div>
  )
}
