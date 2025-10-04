import React, { useState, useEffect, useRef } from "react";
import { Mail, Github, Linkedin, Send, Phone } from "lucide-react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const formRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    emailjs
      .sendForm(
        "your_service_id",   // 🔥 Replace with your EmailJS Service ID
        "your_template_id",  // 🔥 Replace with your EmailJS Template ID
        formRef.current,
        "your_public_key"    // 🔥 Replace with your EmailJS Public Key
      )
      .then(
        () => {
          setStatus("Message sent successfully! ✅");
          setLoading(false);
          formRef.current.reset();
        },
        (error) => {
          setStatus("Something went wrong ❌ Please try again.");
          console.error("EmailJS Error:", error);
          setLoading(false);
        }
      );
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-12 text-[#E8EDDF] pt-30 overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        
        <form
          ref={formRef}
          onSubmit={sendEmail}
          className={` border border-[#CFDBD5]/20 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg transition-all duration-700 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F5CB5C] mb-6">
            Send Me a Message
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-[#CFDBD5]">
                Name
              </label>
              <input
                type="text"
                name="from_name"
                required
                className="w-full px-4 py-3 rounded-md  border border-[#CFDBD5]/20 text-[#E8EDDF] placeholder-[#CFDBD5]/50 focus:outline-none focus:border-[#F5CB5C] focus:shadow-[0_0_10px_#F5CB5C]/30 transition-all"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-[#CFDBD5]">
                Email
              </label>
              <input
                type="email"
                name="from_email"
                required
                className="w-full px-4 py-3 rounded-md  border border-[#CFDBD5]/20 text-[#E8EDDF] placeholder-[#CFDBD5]/50 focus:outline-none focus:border-[#F5CB5C] focus:shadow-[0_0_10px_#F5CB5C]/30 transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-[#CFDBD5]">
                Message
              </label>
              <textarea
                rows="5"
                name="message"
                required
                className="w-full px-4 py-3 rounded-md  border border-[#CFDBD5]/20 text-[#E8EDDF] placeholder-[#CFDBD5]/50 focus:outline-none focus:border-[#F5CB5C] focus:shadow-[0_0_10px_#F5CB5C]/30 transition-all"
                placeholder="Write your message..."
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#F5CB5C] text-[#111111] font-semibold hover:bg-[#E8EDDF] hover:scale-105 transition-all duration-300 shadow-md hover:shadow-[0_0_15px_#F5CB5C]/40 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Message"}
              <Send className="w-4 h-4" />
            </button>
            {status && (
              <p className="text-center text-sm mt-3 text-[#F5CB5C]">
                {status}
              </p>
            )}
          </div>
        </form>

        
        <div
          className={`flex flex-col justify-center space-y-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F5CB5C] mb-2">
            Let’s Connect
          </h2>
          <p className="text-[#CFDBD5]/80 text-base leading-relaxed max-w-md">
            I’m always open to exciting projects, collaborations, and
            opportunities. Reach out via the form, or directly through these
            channels:
          </p>

          <div className="space-y-4">
            {[
              {
                icon: Mail,
                label: "mradulwork1316@gmail.com",
                href: "mailto:mradulwork1316@gmail.com",
              },
              {
                icon: Phone,
                label: "+91 6264828235",
                href: "tel:+916264828235",
              },
              {
                icon: Linkedin,
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/mradul-patle-5207b52a7/",
              },
              {
                icon: Github,
                label: "GitHub",
                href: "https://github.com/mradulpatle03",
              },
            ].map((contact, i) => (
              <a
                key={i}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ transitionDelay: `${i * 100}ms` }}
                className="flex items-center gap-4 px-5 py-3 rounded-xl  border border-[#CFDBD5]/20 hover:border-[#F5CB5C]/40 text-[#CFDBD5] hover:text-[#F5CB5C] hover:shadow-[0_0_20px_#F5CB5C]/30 transition-all duration-300 hover:scale-105"
              >
                <contact.icon className="w-5 h-5" />
                <span className="font-medium">{contact.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
