import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const title = searchParams.get('title') || 'Branded Social Image';
  const category = searchParams.get('category') || 'Hardal Case Study';
  const author = searchParams.get('author') || 'Utku Demirhan';

  return new ImageResponse(
    (
      <div style={{
          height: '100%', width: '100%', display: 'flex', flexDirection: 'column',
          backgroundColor: '#000000', padding: '80px', color: 'white', fontFamily: 'sans-serif',
      }}>
        {/* INLINE SVG LOGO (Hardal Style) */}
        <div style={{ display: 'flex', backgroundColor: '#fff', padding: '15px 25px', borderRadius: '12px', width: 'fit-content', marginBottom: '40px' }}>
          <svg width="150" height="40" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 10L40 35H0L20 10Z" fill="#141020" /> 
            <rect x="50" y="10" width="120" height="30" rx="4" fill="#141020" />
            <text x="55" y="32" font-family="sans-serif" font-weight="bold" font-size="22" fill="white">HARDAL</text>
          </svg>
        </div>

        <div style={{ width: '80px', height: '6px', backgroundColor: '#E1AD01', marginBottom: '30px' }} />

        <div style={{ fontSize: 24, color: '#E1AD01', textTransform: 'uppercase', marginBottom: '15px', fontWeight: 'bold', letterSpacing: '2px' }}>
          {category}
        </div>

        <div style={{ fontSize: 72, fontWeight: 900, lineHeight: 1.1, marginBottom: 'auto' }}>
          {title}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #333', paddingTop: '40px' }}>
          <div style={{ fontSize: 32 }}>{author}</div>
          <div style={{ fontSize: 24, color: '#E1AD01' }}>hardal.io</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}