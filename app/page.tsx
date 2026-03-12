'use client';

import React, { useState } from 'react';
import Papa from 'papaparse';
import { Download, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';

export default function OGGenerator() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setData(results.data);
        setLoading(false);
      },
      error: () => {
        alert("Error parsing CSV file.");
        setLoading(false);
      }
    });
  };

  const downloadAll = async () => {
    setLoading(true);
    // Logic for downloading images can be expanded here
    // For now, we will notify the user
    alert("Starting download for " + data.length + " images...");
    
    for (const item of data) {
      const query = new URLSearchParams({
        title: item.title || '',
        category: item.category || '',
        author: item.author || ''
      }).toString();
      
      const link = document.createElement('a');
      link.href = `/og?${query}`;
      link.download = `${item.title || 'image'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Small delay to prevent browser browser freezing
      await new Promise(r => setTimeout(r, 500));
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Hardal OG Image Generator
          </h1>
          <p className="text-lg text-gray-600">
            Upload your CSV and generate branded social media images instantly.
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8 border-2 border-dashed border-gray-300">
          <div className="flex flex-col items-center">
            <label className="flex flex-col items-center cursor-pointer">
              <Upload className="h-12 w-12 text-blue-500 mb-2" />
              <span className="text-gray-700 font-medium">Select CSV File</span>
              <input 
                type="file" 
                accept=".csv" 
                className="hidden" 
                onChange={handleFileUpload} 
              />
            </label>
            <p className="mt-2 text-sm text-gray-500">
              CSV must have columns: **title, category, author**
            </p>
          </div>
        </div>

        {/* Controls */}
        {data.length > 0 && (
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Previewing {data.length} Images
            </h2>
            <button
              onClick={downloadAll}
              disabled={loading}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Download size={20} />}
              Download All Images
            </button>
          </div>
        )}

        {/* Preview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.map((item, index) => {
            const query = new URLSearchParams({
              title: item.title || '',
              category: item.category || '',
              author: item.author || ''
            }).toString();

            return (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
                <div className="aspect-video bg-gray-200 relative">
                  <img
                    src={`/og?${query}`}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 bg-white border-t">
                  <p className="text-sm font-bold text-blue-600 uppercase mb-1">{item.category}</p>
                  <p className="text-gray-900 font-medium truncate">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-2">By {item.author}</p>
                </div>
              </div>
            );
          })}
        </div>

        {data.length === 0 && !loading && (
          <div className="text-center py-20 bg-gray-100 rounded-xl">
            <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-xl">No data uploaded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}