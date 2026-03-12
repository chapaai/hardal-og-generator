import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Untitled Post';
  const category = searchParams.get('category') || 'Blog';
  const author = searchParams.get('author') || 'Hardal Team';

  return new ImageResponse(
    (
      <div style={{
        height: '100%', width: '100%', display: 'flex', flexDirection: 'column',
        backgroundColor: '#ffffff', padding: '80px', justifyContent: 'space-between',
        borderBottom: '20px solid #FF5733' // Hardal Brand Accent
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ fontSize: 24, fontWeight: 'bold', color: '#FF5733', background: '#fff5f3', padding: '10px 20px', borderRadius: '50px' }}>
            {category.toUpperCase()}
          </div>
          <div style={{ fontSize: 32, fontWeight: '900', color: '#000' }}>HARDAL</div>
        </div>

        <div style={{ display: 'flex', fontSize: 72, fontWeight: 'bold', color: '#1a1a1a', lineHeight: 1.2, marginBottom: '40px' }}>
          {title}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', fontSize: 28, color: '#666' }}>
          <span>Written by </span>
          <span style={{ marginLeft: '10px', color: '#000', fontWeight: 'bold' }}>{author}</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}