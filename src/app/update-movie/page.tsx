import UpdateMovie from "@/components/movies/UpdateMovie";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdateMovie />
    </Suspense>
  );
}