import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { title: "Jonas K.P. Sørensen — Digital konsulent" },
      { name: "description", content: "UX research, servicedesign og konceptudvikling. Selvstændig siden 2016." },
      { name: "author", content: "Jonas K.P. Sørensen" },
      { property: "og:title", content: "Jonas K.P. Sørensen — Digital konsulent" },
      { property: "og:description", content: "UX research, servicedesign og konceptudvikling. Selvstændig siden 2016." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://www.jkps.dk/og-thumbnail.png?v=2" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@jonaskps" },
      { name: "twitter:title", content: "Jonas K.P. Sørensen — Digital konsulent" },
      { name: "twitter:description", content: "UX research, servicedesign og konceptudvikling. Selvstændig siden 2016." },
      { name: "twitter:image", content: "https://www.jkps.dk/og-thumbnail.png?v=2" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
