import { Suspense } from "react";
import WcCategoryClient from "@/components/wc/WcCategoryClient";

export default function WcCategoryPage() {
  return (
    <Suspense fallback={<p>Loading category...</p>}>
      <WcCategoryClient />
    </Suspense>
  );
}
