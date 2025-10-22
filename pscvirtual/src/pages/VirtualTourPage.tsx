// src/pages/VirtualTourPage.tsx (FINAL FIX - TOMBOL BACK MENGANDALKAN ALIRAN DOKUMEN)

import React, { useEffect, useRef, useState } from "react";
import * as PANOLENS from "panolens";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InfoBox from "../components/InfoBox";
import { useNavigate } from "react-router-dom";

const VIDEO_PATH = "/Jalan_percobaan_injected.mp4"; 

const VirtualTourPage: React.FC = () => {
    const navigate = useNavigate();
    const viewerRef = useRef<HTMLDivElement>(null);
    const [isViewerReady, setIsViewerReady] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const viewerInstance = useRef<PANOLENS.Viewer | null>(null);
    const panoramaInstance = useRef<PANOLENS.VideoPanorama | null>(null);

    const handleStartVideo = () => {
        if (panoramaInstance.current) {
            const videoElement = panoramaInstance.current.getVideoElement();
            if (videoElement) {
                videoElement.play().then(() => setIsVideoPlaying(true)).catch(() => alert("Gagal memulai video."));
            }
        }
    };

    useEffect(() => {
        // Logika inisialisasi Panolens...
        if (!viewerRef.current) return;
        const videoOptions = { autoplay: true, muted: true, loop: true, playsinline: true, crossOrigin: "anonymous", };
        const panorama = new PANOLENS.VideoPanorama(VIDEO_PATH, videoOptions);
        panoramaInstance.current = panorama;
        const viewer = new PANOLENS.Viewer({ container: viewerRef.current, autoHideInfospot: false, controlBar: true, cameraFov: 75, });
        viewerInstance.current = viewer;
        viewer.add(panorama);

        const videoElement = panorama.getVideoElement();
        if (videoElement) {
            videoElement.crossOrigin = 'anonymous'; 
            videoElement.preload = 'auto'; 
            videoElement.load();
            
            const onCanPlay = () => {
                panorama.setVideoTexture(videoElement); 
                setIsViewerReady(true); 
                videoElement.play().then(() => setIsVideoPlaying(true)).catch(() => setIsVideoPlaying(false));
                videoElement.removeEventListener('canplaythrough', onCanPlay);
            };
            videoElement.addEventListener('canplaythrough', onCanPlay);
        }
        return () => { if (viewerInstance.current) { viewerInstance.current.dispose(); } };
    }, []); 

    const handleBack = () => navigate(-1); 

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            
            {/* Main container - Dibuat RELATIVE */}
            <main className="max-w-7xl mx-auto px-4 mt-6 sm:mt-10 flex-grow w-full pb-12 relative">
                
                {/* Tombol Back sekarang berada di luar div judul untuk positioning yang lebih mudah */}
                <div className="text-right mb-4">
                    <button
                        onClick={handleBack}
                        className="bg-[#f0e6c9] text-black text-sm font-bold py-2 px-6 rounded-lg shadow-md hover:bg-[#d8c29b] transition"
                    >
                        Back
                    </button>
                </div>

                {/* Judul dan Deskripsi Container */}
                <div className="flex flex-col items-center mb-4 text-center">
                    
                    {/* Judul & Deskripsi Container (Dibuat center) */}
                    <div className="max-w-3xl"> 
                        
                        {/* Judul Utama */}
                        <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-2">
                            "Virtual Tour of Pahlawan Street"
                        </h1>
                        
                        {/* Deskripsi */}
                        <p className="text-gray-600 text-base mb-4">
                            "Rasakan suasana Jalan Pahlawan secara interaktif dalam tur 360°. Temukan berbagai spot menarik, kuliner, dan suasana PSC."
                        </p>
                    </div>
                </div>
                
                {/* Kontainer untuk tampilan 360 */}
                <div
                    ref={viewerRef}
                    className="w-full rounded-xl overflow-hidden shadow-2xl relative"
                    style={{ height: "24rem" }} 
                    data-height-responsive="md:h-[500px] lg:h-[700px]" 
                >
                    {/* ... (Overlay dan Loading Panolens) ... */}
                    {isViewerReady && !isVideoPlaying && (
                        <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-20 p-4">
                            <p className="text-white text-lg sm:text-xl text-center mb-6">
                                Klik untuk memulai pengalaman Virtual Tour (diperlukan oleh browser).
                            </p>
                            <button
                                onClick={handleStartVideo}
                                className="bg-red-600 text-white text-lg sm:text-xl font-bold py-3 px-8 rounded-full shadow-lg hover:bg-red-700 transition transform hover:scale-105"
                            >
                                Start Tour
                            </button>
                            <p className="text-gray-400 text-sm mt-4 text-center">Video akan diputar dalam mode Mute.</p>
                        </div>
                    )}
                    
                    {!isViewerReady && (
                        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-30">
                            <div className="text-white text-xl sm:text-2xl">Loading Virtual Tour...</div>
                        </div>
                    )}
                </div>

                <InfoBox />
            </main>
            <Footer />
        </div>
    );
};

export default VirtualTourPage;