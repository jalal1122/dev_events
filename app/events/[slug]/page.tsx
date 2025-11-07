import DetailPage from "@/Components/DetailPage";
import { Suspense } from "react";

const EventDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = params.then((p) => p.slug);

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <DetailPage params={slug} />
      </Suspense>
    </main>
  );
};

export default EventDetails;
