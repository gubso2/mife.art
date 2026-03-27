import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Marina Ensor for enquiries, commissions, or to say hello.",
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold uppercase tracking-wider mb-6">
            Contact
          </h1>

          <p className="text-muted leading-relaxed mb-8">
            Interested in a piece? Have a question about commissions? Or just want to say
            hello? Send a message and I&apos;ll get back to you as soon as I can.
          </p>

          <ContactForm />
        </div>

        <div className="flex flex-col justify-center">
          <div className="bg-gray-50 p-6 md:p-8 lg:p-12 space-y-6">
            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold mb-2">Email</h3>
              <a
                href="mailto:hello@mife.art"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                hello@mife.art
              </a>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold mb-2">Instagram</h3>
              <a
                href="https://www.instagram.com/mife_art/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                @mife_art
              </a>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold mb-2">Location</h3>
              <p className="text-sm text-muted">Australia</p>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold mb-2">Commissions</h3>
              <p className="text-sm text-muted leading-relaxed">
                Custom commissions are available. Please include details about your vision,
                preferred size, and colour palette in your message.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
