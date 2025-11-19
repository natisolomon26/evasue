import BuildSkill from "@/components/student/leadership/BuildSkill";
import MentorshipSection from "@/components/student/leadership/MentorshipSection";
import ModelLeadership from "@/components/student/leadership/ModelLeadership";
import SmallGroup from "@/components/student/leadership/SmallGroup";
import StudentLeadership from "@/components/student/leadership/StudentLeadership";
import PageBanner from "@/components/ui/PageBanner";

export default function LeadershipPage() {
  return (
    <>
      <PageBanner
        title="Student Leadership"
        subtitle="Raising Christ-like leaders for campus, church, and society"
        image="/images/bg3.JPG"
      />

      <StudentLeadership />
      <SmallGroup />
      <MentorshipSection />
      <ModelLeadership />
      <BuildSkill />
    </>
  );
}
