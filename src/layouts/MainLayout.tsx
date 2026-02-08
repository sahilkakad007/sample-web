
import React from 'react';
import ChocolateRain from '../components/ChocolateRain';
import BackgroundMusic from '../components/BackgroundMusic';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-chocolate-800 via-chocolate-900 to-black text-cream-100 font-sans selection:bg-gold-500 selection:text-chocolate-900">
            <ChocolateRain />
            <BackgroundMusic />

            <div className="relative z-10 container mx-auto px-4 py-8">
                {children}
            </div>

            {/* Decorative overlay for vintage feel */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[1] mix-blend-overlay"
                style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper.png")' }}>
            </div>
        </div>
    );
};

export default MainLayout;
