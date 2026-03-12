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
    if (!file) return;

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
    
    try {
      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const query = new URLSearchParams({
          title: post.title || 'No Title',
          category: post.category || 'General',
          author: post.author || 'Hardal'
        }).toString();
        
        const response = await fetch(`/api/og?${query}`);
        if (response.ok) {
          const blob = await response.blob();
          zip.file(`hardal-og-${i + 1}.png`, blob);
        }
      }

      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'hardal-og-export.zip');
    } catch (error) {
      console.error("Download failed:", error);
      alert("Something went wrong during the ZIP generation.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '40px', borderBottom: '2px solid #eee', paddingBottom: '20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800' }}>Hardal OG Automation</h1>
        <p style={{ color: '#666' }}>Upload CSV to generate branded social images in bulk.</p>
      </header>

      <div style={{ backgroundColor: '#f9f9f9', padding: '30px', borderRadius: '12px', marginBottom: '40px' }}>
        <input 
          type="file" 
          accept=".csv" 
          onChange={handleFileUpload} 
          style={{ fontSize: '16px' }} 
        />
        
        {posts.length > 0 && (
          <button 
            onClick={downloadAll} 
            disabled={loading}
            style={{ 
              marginLeft: '20px', 
              padding: '12px 24px', 
              backgroundColor: '#000', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {loading ? 'Generating ZIP...' : `Download ${posts.length} Images (.ZIP)`}
          </button>
        )}
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
        gap: '25px' 
      }}>
        {posts.map((post, index) => {
          const query = new URLSearchParams({
            title: post.title || '',
            category: post.category || '',
            author: post.author || ''
          }).toString();

          return (
            <div key={index} style={{ border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <img 
                src={`/api/og?${query}`} 
                alt="Preview" 
                style={{ width: '100%', height: 'auto', display: 'block', backgroundColor: '#f0f0f0' }}
              />
              <div style={{ padding: '15px' }}>
                <code style={{ fontSize: '11px', color: '#999' }}>ID: {index + 1} | {post.title}</code>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}