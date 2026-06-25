export default function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="front-layout flex flex-col min-h-[100dvh] selection:bg-royal selection:text-white">
      {children}
    </div>
  );
}
