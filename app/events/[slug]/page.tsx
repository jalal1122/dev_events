import DetailPage from "@/Components/DetailPage";
import { Suspense } from "react";

const EventDetails = async ({ params }: { params: { slug: string } }) => {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <DetailPage params={params} />
      </Suspense>
    </main>
  );
};

export default EventDetails;
