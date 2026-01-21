import Navigation from "@/components/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import ConceptSection from "@/components/sections/ConceptSection";
import GoalsSection from "@/components/sections/GoalsSection";
import CharacteristicsSection from "@/components/sections/CharacteristicsSection";
import DrivingForcesSection from "@/components/sections/DrivingForcesSection";
import PathwaySection from "@/components/sections/PathwaySection";
import StatePartyEthicsSection from "@/components/sections/StatePartyEthicsSection";
import SignificanceSection from "@/components/sections/SignificanceSection";
import GallerySection from "@/components/sections/GallerySection";
import VideoResourcesSection from "@/components/sections/VideoResourcesSection";
import VideoAISection from "@/components/sections/VideoAISection";
import ConclusionSection from "@/components/sections/ConclusionSection";
import VoiceReader from "@/components/VoiceReader";
import ChatBox from "@/components/ChatBox";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />

      <div id="hero">
        <HeroSection />
      </div>

      <div id="concept">
        <ConceptSection />
      </div>

      <div id="goals">
        <GoalsSection />
      </div>

      <div id="characteristics">
        <CharacteristicsSection />
      </div>

      <div id="forces">
        <DrivingForcesSection />
      </div>

      <div id="pathway">
        <PathwaySection />
      </div>

      <div id="state">
        <StatePartyEthicsSection />
      </div>

      <div id="significance">
        <SignificanceSection />
      </div>
      
      <div id="video-ai">
        <VideoAISection />
      </div>

      <div id="gallery">
        <GallerySection />
      </div>

      <div id="videos">
        <VideoResourcesSection />
      </div>

      <div id="conclusion">
        <ConclusionSection />
      </div>
      <ChatBox />
      <VoiceReader />
    </main>
  );
};


export default Index;

