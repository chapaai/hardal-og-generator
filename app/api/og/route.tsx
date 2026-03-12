import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Default Title';
  const category = searchParams.get('category') || 'General';
  const author = searchParams.get('author') || 'Hardal';

  return new ImageResponse(
    (
      <div style={{
          height: '100%', width: '100%', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', fontSize: 32, fontWeight: 600,
        }}
      >
        <div style={{ marginTop: 40 }}>{category}</div>
        <div style={{ marginTop: 10, fontSize: 60 }}>{title}</div>
        <div style={{ marginTop: 20 }}>{author}</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}