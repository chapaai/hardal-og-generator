import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url);
    
    const title = searchParams.get('title') || 'Social Media Automation';
    const category = searchParams.get('category') || 'Hardal Case Study';
    const author = searchParams.get('author') || 'Utku Demirhan';

    const logoUrl = `${origin}/hardal-logo.png`;

    return new ImageResponse(
      (
        <div style={{
            height: '100%', width: '100%', display: 'flex', flexDirection: 'column',
            backgroundColor: '#000', padding: '80px', color: 'white',
        }}>
          <div style={{ display: 'flex', backgroundColor: '#fff', padding: '15px 25px', borderRadius: '12px', width: 'fit-content', marginBottom: '40px' }}>
            <img src={logoUrl} width="180" height="60" style={{ objectFit: 'contain' }} />
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
  } catch (e: unknown) {
    console.error(e);
    return new Response(`Failed to generate image`, { status: 500 });
  }
}