'use client';
import { useState } from 'react';
import Papa from 'papaparse';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function HardalDashboard() {
  const [posts, setPosts] = useState<any[]>([]);
  
  // Handle CSV Upload
  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setPosts(results.data as any);
      },
    });
  };

  // Batch Download as ZIP
  const downloadAll = async () => {
    const zip = new JSZip();
    const folder = zip.folder("og-images");

    for (const post of posts) {
      const url = `/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}&author=${encodeURIComponent(post.author)}`;
      const response = await fetch(url);
      const blob = await response.blob();
      folder?.file(`${post.title.replace(/\s+/g, '-').toLowerCase()}.png`, blob);
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "hardal-og-images.zip");
  };

  return (
    <main style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#FF5733' }}>Hardal OG Factory</h1>
        <button onClick={downloadAll} style={btnStyle}>Download All as ZIP (.zip)</button>
      </header>

      <div style={{ margin: '20px 0', padding: '20px', background: '#f9f9f9', borderRadius: '8px', border: '2px dashed #ccc' }}>
        <h3>Bulk Upload (CSV)</h3>
        <input type="file" accept=".csv" onChange={handleFileUpload} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
        {posts.map((post, index) => (
          <div key={index} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '10px' }}>
            <img 
              src={`/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}&author=${encodeURIComponent(post.author)}`} 
              style={{ width: '100%', borderRadius: '4px' }} 
            />
            <p style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '10px' }}>{post.title}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

const btnStyle = { backgroundColor: '#FF5733', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' };