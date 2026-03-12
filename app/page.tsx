'use client';
import { useState } from 'react';
import Papa from 'papaparse';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function OGGenerator() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setPosts(results.data);
      },
    });
  };

  const downloadAll = async () => {
    setLoading(true);
    const zip = new JSZip();
    
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const params = new URLSearchParams({
        title: post.title || 'Untitled',
        category: post.category || 'General',
        author: post.author || 'Hardal'
      });
      
      const response = await fetch(`/api/og?${params.toString()}`);
      const blob = await response.blob();
      zip.file(`post-${i + 1}.png`, blob);
    }

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'hardal-og-images.zip');
    setLoading(false);
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Hardal OG Image Generator</h1>
      <input type="file" accept=".csv" onChange={handleFileUpload} style={{ marginBottom: '20px' }} />
      
      {posts.length > 0 && (
        <button 
          onClick={downloadAll} 
          disabled={loading}
          style={{ marginLeft: '10px', padding: '10px 20px', cursor: 'pointer' }}
        >
          {loading ? 'Generating ZIP...' : `Download ${posts.length} Images`}
        </button>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '40px' }}>
        {posts.map((post, index) => (
          <div key={index} style={{ border: '1px solid #ddd', padding: '10px' }}>
            <img 
              src={`/api/og?title=${encodeURIComponent(post.title || '')}&category=${encodeURIComponent(post.category || '')}&author=${encodeURIComponent(post.author || '')}`} 
              alt="Preview" 
              style={{ width: '100%' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}