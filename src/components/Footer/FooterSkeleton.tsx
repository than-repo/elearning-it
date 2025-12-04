// src/components/Footer/FooterSkeleton.tsx
export function FooterSkeleton() {
  return (
    <footer className="bg-background border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Cột 1: Logo + mô tả */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-lg animate-pulse" />
              <div className="h-8 w-48 bg-muted rounded animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
              <div className="h-4 w-11/12 bg-muted rounded animate-pulse" />
              <div className="h-4 w-10/12 bg-muted rounded animate-pulse" />
            </div>
            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-muted rounded-full animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Cột 2 & 3: Liên kết */}
          {[1, 2].map((col) => (
            <div key={col} className="space-y-4">
              <div className="h-6 w-32 bg-muted rounded animate-pulse" />
              <ul className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i}>
                    <div className="h-4 w-28 bg-muted rounded animate-pulse" />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Cột 4: Liên hệ + Map */}
          <div className="space-y-4">
            <div className="h-6 w-40 bg-muted rounded animate-pulse" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-48 bg-muted rounded animate-pulse" />
                </div>
              ))}
            </div>

            {/* Map skeleton */}
            <div className="mt-6 aspect-video rounded-lg overflow-hidden border">
              <div className="w-full h-full bg-muted animate-pulse" />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t">
          <div className="h-4 w-80 mx-auto bg-muted rounded animate-pulse" />
        </div>
      </div>
    </footer>
  );
}
