
import BibleStudy from "@/components/student/discipleship/BibleStudy";
import ChurchConnections from "@/components/student/discipleship/ChurchConnections";
import Small from "@/components/student/discipleship/Small";
import Trainings from "@/components/student/discipleship/Trainings";
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
      <Trainings />
      <ChurchConnections />
    </>
  );
}
