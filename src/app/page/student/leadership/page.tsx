import BuildSkill from "@/components/student/BuildSkill";
import MentorshipSection from "@/components/student/MentorshipSection";
import ModelLeadership from "@/components/student/ModelLeadership";
import SmallGroup from "@/components/student/SmallGroup";
import StudentLeadership from "@/components/student/StudentLeadership";
import PageBanner from "@/components/ui/PageBanner";

export default function LeadershipPage() {
  return (
    <>
      <PageBanner
        title="Student Leadership"
        subtitle="Raising Christ-like leaders for campus, church, and society"
        image="/images/bg4.JPG"
      />

      <StudentLeadership />
      <SmallGroup />
      <MentorshipSection />
      <ModelLeadership />
      <BuildSkill />
    </>
  );
}
