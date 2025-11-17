
import DiscipleshipMinistry from "@/components/student/DiscipleshipMinistry";
import PageBanner from "@/components/ui/PageBanner";

export default function Discipleship() {
  return (
    <>
      <PageBanner 
        title="What We Believe"
        subtitle="Our foundational Christian convictions"
        image="/images/bg3.JPG"
      />

      <DiscipleshipMinistry />
    </>
  );
}
