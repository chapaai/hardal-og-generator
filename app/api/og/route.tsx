import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const title = searchParams.get('title') || 'Social Media Automation';
    const category = searchParams.get('category') || 'Hardal Case Study';
    const author = searchParams.get('author') || 'Utku Demirhan';

    // Using a more reliable way to get the base URL
    const host = request.headers.get('host');
    const protocol = host?.includes('localhost') ? 'http' : 'https';
    const logoUrl = `${protocol}://${host}/hardal-logo.png`;

    return new ImageResponse(
      (
        <div style={{
            height: '100%', width: '100%', display: 'flex', flexDirection: 'column',
            backgroundColor: '#000', padding: '80px', color: 'white',
        }}>
          {/* LOGO CONTAINER */}
          <div style={{ display: 'flex', backgroundColor: '#fff', padding: '15px 25px', borderRadius: '12px', width: 'fit-content', marginBottom: '40px' }}>
            {/* We add an alt and a style to ensure it doesn't collapse if missing */}
            <img 
              src={logoUrl} 
              width="180" 
              height="60" 
              style={{ objectFit: 'contain' }} 
            />
          </div>

          <div style={{ width: '80px', height: '6px', backgroundColor: '#E1AD01', marginBottom: '30px' }} />

          <div style={{ fontSize: 24, color: '#E1AD01', textTransform: 'uppercase', marginBottom: '15px', fontWeight: 'bold' }}>
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
  } catch (e) {
    return new Response(`Error rendering image`, { status: 500 });
  }
}