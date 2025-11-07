import DetailPage from "@/Components/DetailPage";
import { Suspense } from "react";

const EventDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailPage params={params} />
    </Suspense>
  );
};

export default EventDetails;
