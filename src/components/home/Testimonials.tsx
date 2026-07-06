import prisma from "@/lib/prisma";

export async function Testimonials() {
  const testimonials = await prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  if (testimonials.length === 0) {
    return null; // Don't render Section if there are no active testimonials
  }

  return (
    <section className="bg-offwhite py-24 border-t border-concrete">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-navy uppercase tracking-tight">
            Dipercaya Ratusan Pelanggan
          </h2>
          <div className="w-16 h-1 bg-royal mx-auto mt-6" />
        </div>

        <div className="flex overflow-x-auto gap-4 md:grid md:grid-cols-3 md:gap-8 snap-x snap-mandatory hide-scrollbar pb-4 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-none">
          {testimonials.map((testi) => (
            <div key={testi.id} className="min-w-[85vw] sm:min-w-[45vw] md:min-w-0 snap-start bg-white p-6 md:p-8 border-l-4 border-royal shadow-sm">
              <div className="text-royal text-xl mb-4 tracking-widest">
                {"★".repeat(testi.rating)}
                {"☆".repeat(Math.max(0, 5 - testi.rating))}
              </div>
              <p className="text-iron leading-relaxed mb-8 italic">
                &quot;{testi.text}&quot;
              </p>
              <hr className="mb-6 border-concrete" />
              <div>
                <strong className="block font-display font-bold text-lg text-navy uppercase tracking-wide">
                  {testi.author} — {testi.location}
                </strong>
                <span className="text-iron text-sm font-medium">
                  {testi.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
