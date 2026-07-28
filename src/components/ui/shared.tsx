import { cn } from "@/lib/utils";

export { cn };
export { BlobImage, RoundedImage } from "@/components/ui/BlobImage";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-container px-4 sm:px-6", className)}>
      {children}
    </div>
  );
}

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-label text-xs font-semibold uppercase tracking-[0.08em] text-primary-700">
      {children}
    </p>
  );
}

export function SectionTitle({
  children,
  className,
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "font-display text-[32px] leading-tight text-primary-900 md:text-[48px]",
        className
      )}
    >
      {children}
    </Tag>
  );
}

export function WavyDivider({ className }: { className?: string }) {
  return (
    <div className={cn("w-full overflow-hidden leading-none", className)}>
      <svg
        viewBox="0 0 1440 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block h-8 w-full md:h-12"
        preserveAspectRatio="none"
      >
        <path
          d="M0 24C240 48 480 0 720 24C960 48 1200 0 1440 24V48H0V24Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
