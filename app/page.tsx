"use client";

import { useState } from 'react';
import JSZip from 'jszip';

interface Post {
  title: string;
  category: string;
  author: string;
}

export default function HardalOGDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isZipping, setIsZipping] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const rows = text.split('\n').filter(row => row.trim() !== '').slice(1);
      const parsed = rows.map(row => {
        const parts = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        return {
          title: parts[0]?.replace(/"/g, '').trim() || 'Untitled',
          category: parts[1]?.replace(/"/g, '').trim() || 'Developer Guide',
          author: parts[2]?.replace(/"/g, '').trim() || 'Hardal User'
        };
      });
      setPosts(parsed);
    };
    reader.readAsText(file);
  };

  const downloadAsZip = async () => {
    if (posts.length === 0) return;
    setIsZipping(true);
    const zip = new JSZip();

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const url = `/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}&author=${encodeURIComponent(post.author)}&i=${i}`;
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        zip.file(`Hardal_OG_${i+1}.png`, blob);
      } catch (err) {
        console.error(err);
      }
    }

    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "hardal_og_batch.zip";
    link.click();
    setIsZipping(false);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#111', padding: '60px 20px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '30px', marginBottom: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 style={{ fontSize: '42px', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '8px' }}>Asset Studio</h1>
            <p style={{ color: '#666', fontSize: '18px' }}>Bulk OG Generation - Case Study #5</p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <label style={{ padding: '12px 24px', border: '1px solid #111', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
              Upload CSV
              <input type="file" accept=".csv" onChange={handleFileUpload} style={{ display: 'none' }} />
            </label>
            {posts.length > 0 && (
              <button 
                onClick={downloadAsZip} 
                disabled={isZipping}
                style={{ backgroundColor: '#111', color: '#fff', padding: '12px 28px', borderRadius: '6px', cursor: 'pointer', border: 'none', fontWeight: '600', fontSize: '14px' }}
              >
                {isZipping ? 'Bundling...' : `Export ZIP (${posts.length})`}
              </button>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '40px' }}>
          {posts.map((post, i) => (
            <div key={i} style={{ border: '1px solid #f0f0f0', borderRadius: '16px', overflow: 'hidden' }}>
              <img 
                src={`/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}&author=${encodeURIComponent(post.author)}&i=${i}`} 
                style={{ width: '100%', height: 'auto', display: 'block' }} 
              />
              <div style={{ padding: '20px', backgroundColor: '#fafafa', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>{post.title}</span>
                <span style={{ fontSize: '12px', color: '#999' }}>{post.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}