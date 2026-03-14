import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Default values for Integration safety
    const title = searchParams.get('title') || 'Hardal Insight';
    const category = searchParams.get('category') || 'General';
    const author = searchParams.get('author') || 'Hardal Team';
    const index = parseInt(searchParams.get('i') || '0');

    // Branding colors
    const gradients = [
      'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)',
      'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
      'linear-gradient(135deg, #f3e8ff 0%, #d8b4fe 100%)',
      'linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)',
    ];
    
    const currentGradient = gradients[index % gradients.length];

    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    
    // Using the stable PNG logo
    const logoUrl = `${protocol}://${host}/hardal-logo.png`;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: currentGradient,
            padding: '80px',
            position: 'relative',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Category Badge */}
          <div style={{
            display: 'flex',
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            padding: '10px 24px',
            borderRadius: '100px',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            marginBottom: '28px',
            alignSelf: 'flex-start',
          }}>
            <span style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b' }}>
              {category}
            </span>
          </div>

          {/* Headline */}
          <div style={{ 
            fontSize: '72px', 
            fontWeight: '900', 
            color: '#1e293b', 
            lineHeight: 1.1,
            letterSpacing: '-0.04em',
            marginBottom: '40px',
            maxWidth: '950px'
          }}>
            {title}
          </div>

          {/* Author Section */}
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 'auto' }}>
            <div style={{
              width: '90px',
              height: '90px',
              borderRadius: '45px',
              backgroundColor: '#1e293b',
              marginRight: '24px',
            }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '34px', fontWeight: '800', color: '#1e293b' }}>{author}</span>
              <span style={{ fontSize: '22px', color: '#475569', fontWeight: '500' }}>Hardal Expert</span>
            </div>
          </div>

          {/* Logo with Multiply blend for non-transparent PNGs */}
          <div style={{ position: 'absolute', bottom: '80px', right: '80px', display: 'flex' }}>
            <img 
              src={logoUrl} 
              style={{ 
                width: '170px', 
                mixBlendMode: 'multiply' 
              }} 
            />
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`API Error: ${e.message}`, { status: 500 });
  }
}