
import BibleStudy from "@/components/student/discipleship/BibleStudy";
import Small from "@/components/student/discipleship/Small";
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
      <BibleStudy />
      <Small />
    </>
  );
}
