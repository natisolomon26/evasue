import LeadershipMinistry from "@/components/student/LeadershipMinistry";
import PageBanner from "@/components/ui/PageBanner";

export default function LeadershipPage() {
  return (
    <>
      <PageBanner
        title="Student Leadership"
        subtitle="Raising Christ-like leaders for campus, church, and society"
        image="/images/bg4.JPG"
      />

      <LeadershipMinistry />
    </>
  );
}
