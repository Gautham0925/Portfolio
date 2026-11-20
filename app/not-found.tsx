import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { PageContainer } from "@/components/layout/PageContainer";

export default function NotFound() {
  return (
    <PageContainer className="flex min-h-[50vh] flex-col items-start justify-center gap-6">
      <p className="eyebrow">Error 404</p>
      <h1 className="text-4xl font-semibold md:text-5xl">Page not found</h1>
      <p className="max-w-md text-muted">The page you requested does not exist or has moved.</p>
      <Button asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </PageContainer>
  );
}
