import { Suspense } from "react";
import WaitlistContent from "./WaitlistContent";

export default function WaitlistPage() {
  return (
    <Suspense>
      <WaitlistContent />
    </Suspense>
  );
}
