// src/pages/VirtualTourPage.tsx

import React from "react";
// Hapus semua import Panolens/hooks yang tidak terpakai
import Header from "../components/Header";
import Footer from "../components/Footer";
import InfoBox from "../components/InfoBox";
import { useNavigate } from "react-router-dom";
// Import komponen VideoPlayer
import PanoramaVideoPlayer from "../components/PanoramaVideoPlayer"; 

// Pastikan path ini menunjuk ke video 360 yang sudah di-inject metadata di folder public/
const VIDEO_360_PATH = "/video.mp4"; 

const VirtualTourPage: React.FC = () => {
    const navigate = useNavigate();
    
    const handleBack = () => navigate(-1); 
    
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            
            <main className="max-w-7xl mx-auto px-4 mt-6 sm:mt-10 flex-grow w-full pb-12 relative">
                
                {/* Tombol Back */}
                <div className="text-right mb-4">
                    <button onClick={handleBack} className="bg-[#f0e6c9] text-black text-sm font-bold py-2 px-6 rounded-lg shadow-md hover:bg-[#d8c29b] transition">
                        Back
                    </button>
                </div>

                {/* Judul dan Deskripsi Container */}
                <div className="flex flex-col items-center mb-4 text-center">
                    <div className="max-w-3xl"> 
                        <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-2">
                            "Virtual Tour of Pahlawan Street"
                        </h1>
                        <p className="text-gray-600 text-base mb-4">
                            "Rasakan suasana Jalan Pahlawan secara interaktif dalam tur 360°. Temukan berbagai spot menarik, kuliner, dan suasana PSC."
                        </p>
                    </div>
                </div>
                
                {/* MENGGUNAKAN KOMPONEN BARU */}
                <PanoramaVideoPlayer
                    videoPath={VIDEO_360_PATH}
                    // Menggunakan kelas tinggi responsif
                    heightClass="h-[24rem] md:h-[500px] lg:h-[700px]" 
                />

                <InfoBox />
            </main>
            <Footer />
        </div>
    );
};

export default VirtualTourPage;
