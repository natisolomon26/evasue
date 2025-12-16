import PageBanner from "@/components/ui/PageBanner";
import WhoWeAreSection from "@/components/about/WhoWeAreSection";
import ExistSection from "@/components/about/ExistSection";
import CommitmentSection from "@/components/about/CommitmentSection";
import CoreValuesSection from "@/components/about/CoreValueSection";

export default function WhoWeArePage() {
  return (
    <>
      <PageBanner 
        title="Who We Are"
        subtitle="A fellowship centered on Jesus Christ"
        image="/images/bg3.JPG"
      />

      <WhoWeAreSection />
      <CoreValuesSection />
      <ExistSection />
      <CommitmentSection />
    </>
  );
}
