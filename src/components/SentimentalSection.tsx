
import ChocolateLetter from './sentimental/ChocolateLetter';
import PolaroidGallery from './sentimental/PolaroidGallery';
import PhotoTimeline from './sentimental/PhotoTimeline';

const SentimentalSection = () => {
    return (
        <section className="relative py-24 bg-chocolate-900/50">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />

            <div className="relative z-10">
                <PolaroidGallery />
                <PhotoTimeline />
                <ChocolateLetter />
            </div>
        </section>
    );
};

export default SentimentalSection;
