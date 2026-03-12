import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'No Title Provided';
  const category = searchParams.get('category') || 'HARDAL';
  const author = searchParams.get('author') || 'Utku Demirhan';

  return new ImageResponse(
    (
      <div style={{
          height: '100%', width: '100%', display: 'flex', flexDirection: 'column',
          backgroundColor: '#000000', padding: '60px', color: 'white',
          border: '20px solid #E1AD01', // BRIGHT YELLOW BORDER (to see if it updated)
      }}>
        {/* LOGO SECTION */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          <div style={{ 
            backgroundColor: '#E1AD01', padding: '10px 20px', borderRadius: '10px',
            color: 'black', fontSize: '30px', fontWeight: 'bold' 
          }}>
            HARDAL
          </div>
        </div>

        {/* CATEGORY */}
        <div style={{ fontSize: 24, color: '#E1AD01', marginBottom: '10px', fontWeight: 'bold' }}>
          {category}
        </div>

        {/* TITLE */}
        <div style={{ fontSize: 70, fontWeight: 900, lineHeight: 1.1, marginBottom: 'auto' }}>
          {title}
        </div>

        {/* FOOTER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #333', paddingTop: '30px' }}>
          <div style={{ fontSize: 32 }}>{author}</div>
          <div style={{ fontSize: 24, color: '#E1AD01' }}>hardal.io</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}