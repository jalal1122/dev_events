import DetailPage from "@/Components/DetailPage";
import { Suspense } from "react";

const EventDetails = async ({ params }: { params: { slug: string } }) => {
  // `params` is an object provided by Next.js router at runtime/build-time
  // Pass it straight to the server component `DetailPage` (no Promise).
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <DetailPage params={params} />
      </Suspense>
    </main>
  );
};

export default EventDetails;
