// src/pages/DestinationTourPage.tsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- DATA DINAMIS LENGKAP UNTUK 8 DESTINASI ---
// Kunci (key) di sini HARUS cocok dengan slug yang dihasilkan oleh createSlug di DestinationListPage.tsx
const tourData: { [key: string]: { title: string, description: string, embedUrl: string } } = {
    // GANTI SEMUA URL SIMULASI ("...-id") dengan URL EMBED 360° YOUTUBE AKTUAL ANDA
    'patung-liberty': { 
        title: 'Patung Liberty', 
        description: 'Menampilkan miniatur ikonik Patung Liberty yang menjadi simbol kebebasan dan persahabatan. Suasana Amerika menjadikannya tempat favorit untuk berswafoto.', 
        embedUrl: "https://www.youtube.com/embed/liberty-id?vq=hd1080&modestbranding=1" 
    },
    'big-ben': { 
        title: 'Big Ben', 
        description: 'Miniatur menara jam Big Ben, simbol London yang megah. Tampilkan foto Anda dengan latar belakang Inggris yang klasik.', 
        embedUrl: "https://www.youtube.com/embed/big-ben-id?vq=hd1080&modestbranding=1"
    },
    'ka-bah': { 
        title: 'Ka\'bah', 
        description: 'Miniatur Ka\'bah yang membawa nuansa Mekah di jantung kota Madiun. Tempat yang unik untuk merasakan suasana suci.', 
        embedUrl: "https://www.youtube.com/embed/kabah-id?vq=hd1080&modestbranding=1" 
    },
    'menara-eiffel': { 
        title: 'Menara Eiffel', 
        description: 'Menampilkan miniatur ikonik Menara Eiffel yang menjadi simbol keindahan Kota Paris. Suasana romantis dengan dekorasi khas Prancis menjadikan tempat ini pilihan favorit untuk berswafoto, berjalan santai, dan merasakan nuansa ala kota dunia.', 
        embedUrl: "https://www.youtube.com/embed/eiffel-id?vq=hd1080&modestbranding=1" 
    },
    'patung-merlion': { 
        title: 'Patung Merlion', 
        description: 'Patung Merlion yang megah membawa suasana Singapura di PSC. Ikon yang sempurna untuk latar belakang foto Anda.', 
        embedUrl: "https://www.youtube.com/embed/merlion-id?vq=hd1080&modestbranding=1" 
    },
    'kereta-cepat-shinkansen': { 
        title: 'Kereta Cepat Shinkansen', 
        description: 'Miniatur kereta cepat Shinkansen Jepang yang melambangkan kecepatan dan kemajuan teknologi. Cocok untuk penggemar fotografi transportasi.', 
        embedUrl: "https://www.youtube.com/embed/shinkansen-id?vq=hd1080&modestbranding=1" 
    },
    'kincir-angin': { 
        title: 'Kincir Angin Belanda', 
        description: 'Ikonik Kincir Angin yang membawa nuansa pedesaan Belanda. Latar yang unik untuk foto dengan kesan Eropa yang damai.', 
        embedUrl: "https://www.youtube.com/embed/kincir-angin-id?vq=hd1080&modestbranding=1" 
    },
    'london-bridge': { 
        title: 'London Bridge', 
        description: 'Miniatur London Bridge yang menampilkan nuansa klasik Eropa. Rasakan atmosfer Inggris tanpa harus ke London.', 
        embedUrl: "https://www.youtube.com/embed/london-id?vq=hd1080&modestbranding=1" 
    },
};
// -----------------------------------------------------------

const DestinationTourPage: React.FC = () => {
    const { id } = useParams<{ id: string }>(); 
    const navigate = useNavigate();

    const data = id ? tourData[id] : null;

    // Logic: Menangani data tidak ditemukan
    if (!data) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-4">
                <Header />
                <main className="flex-grow flex flex-col items-center justify-center">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-red-600 mb-4">
                        Destinasi Tidak Ditemukan
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Kami tidak dapat menemukan destinasi dengan ID: <span className="font-mono text-red-700">{id}</span>
                    </p>
                    <button onClick={() => navigate('/destinations')} className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition">
                        Kembali ke Daftar Destinasi
                    </button>
                </main>
                <Footer />
            </div>
        );
    }

    const handleBack = () => navigate(-1);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            
            <Header />
            
            {/* Main container memusatkan konten dan memberikan padding vertikal */}
            <main className="max-w-4xl mx-auto px-4 w-full flex-grow py-8 sm:py-12">
                
                {/* 2. JUDUL DAN TOMBOL BACK - TAMPILAN SESUAI SCREENSHOT */}
                <div className="flex justify-between items-center mb-6">
                    
                    {/* Judul Teks (Di tengah halaman) */}
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mx-auto">
                        {data.title}
                    </h1>
                    
                    {/* Tombol Back - Style Kuning/Krem */}
                    <button 
                        onClick={handleBack} 
                        // KRITIS: Style Tombol Kuning Krem dan Teks Hitam
                        className="bg-[#f0e6c9] text-black text-sm font-bold py-2 px-6 rounded-lg shadow-md hover:bg-[#d8c29b] transition flex-shrink-0"
                    >
                        Back
                    </button>
                </div>

                {/* 3. EMBED 360 VIDEO/VIEW - KUNCI RESPONSIVITAS */}
                <div className="relative pt-[56.25%] rounded-xl overflow-hidden shadow-2xl mb-10 bg-gray-800">
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src={data.embedUrl}
                        title={`Virtual Tour: ${data.title}`}
                        allow="accelerometer; gyroscope; vr; fullscreen" 
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>
                
                {/* 4. DESKRIPSI DINAMIS */}
                {/* Deskripsi Menara Eiffel lebih panjang dari contoh */}
                <div className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-inner">
                    <h2 className="text-xl font-semibold mb-2 text-center">Tentang {data.title}</h2>
                    <p className="leading-relaxed text-justify">
                        {data.description}
                    </p>
                </div>

            </main>
            
            <Footer />
            
        </div>
    );
};

export default DestinationTourPage;
