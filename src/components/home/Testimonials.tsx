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
            Dipercaya Ribuan Pelanggan
          </h2>
          <div className="w-16 h-1 bg-royal mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testi) => (
            <div key={testi.id} className="bg-white p-8 border-l-4 border-royal shadow-sm">
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
