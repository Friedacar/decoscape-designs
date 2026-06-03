import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Layout>
      <SEO title="Page Not Found" description="The page you are looking for does not exist." />
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-8xl font-serif font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-6">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          The space you're looking for hasn't been designed yet. Let's get you back to familiar ground.
        </p>
        <Link href="/">
          <Button size="lg" className="rounded-full">Return Home</Button>
        </Link>
      </div>
    </Layout>
  );
}
