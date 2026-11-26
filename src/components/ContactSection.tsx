import { FormEvent, useState } from 'react';
import { Check, Copy, Mail, Send } from 'lucide-react';
import { PROFILE_INFO } from '../data/curriculum';

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('HTML & CSS Foundations');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please complete your name, email address, and message.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-[#FAFAFB]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-sm font-medium text-[#2563EB] mb-3">
                Learn or Collaborate With Me
              </p>
              <h2
                className="font-[family-name:var(--font-display)] text-3xl lg:text-4xl font-bold tracking-tight text-[#111827] mb-4"
                style={{ textWrap: 'balance' }}
              >
                Want to study together or book a beginner walkthrough?
              </h2>
              <p className="text-[15.5px] text-[#4B5563] leading-relaxed">
                Whether you are taking your very first step in HTML and CSS, debugging a
                JavaScript function, or practicing Python problem solving, send a note and let&apos;s
                connect.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-[#E5E7EB] space-y-3">
              <div className="flex items-center gap-2 text-xs font-medium text-[#6B7280]">
                <Mail className="w-4 h-4 text-[#2563EB]" />
                <span>Direct Email</span>
              </div>
              <p className="font-[family-name:var(--font-mono)] text-sm font-medium text-[#111827] break-all">
                {PROFILE_INFO.email}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#111827] bg-[#FAFAFB] hover:bg-[#F3F4F6] border border-[#D1D5DB] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>Copied Email</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#4B5563]" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${PROFILE_INFO.email}`}
                  className="text-xs font-medium text-[#2563EB] hover:underline whitespace-nowrap shrink-0"
                >
                  Open in Mail App
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 lg:p-8 rounded-2xl bg-white border border-[#E5E7EB]">
              {submitted ? (
                <div className="py-8 space-y-4">
                  <div className="w-10 h-10 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center">
                    <Check className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#111827]">
                    Message recorded for {name}
                  </h3>
                  <p className="text-sm text-[#4B5563] leading-relaxed max-w-md">
                    Thanks for reaching out about <span className="font-medium text-[#111827]">{topic}</span>. You can
                    also email directly at{' '}
                    <a
                      href={`mailto:${PROFILE_INFO.email}?subject=${encodeURIComponent(
                        `Coding Inquiry: ${topic}`
                      )}&body=${encodeURIComponent(message)}`}
                      className="text-[#2563EB] font-medium hover:underline"
                    >
                      {PROFILE_INFO.email}
                    </a>{' '}
                    to launch your mail client with this message pre-filled.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="px-4 py-2 text-xs font-medium text-[#111827] border border-[#D1D5DB] hover:border-[#111827] rounded-lg transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold text-[#374151] mb-1.5"
                      >
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Jordan"
                        className="w-full px-3.5 py-2.5 text-sm text-[#111827] bg-[#FAFAFB] border border-[#D1D5DB] rounded-lg focus:bg-white focus:border-[#2563EB] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold text-[#374151] mb-1.5"
                      >
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 text-sm text-[#111827] bg-[#FAFAFB] border border-[#D1D5DB] rounded-lg focus:bg-white focus:border-[#2563EB] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-topic"
                      className="block text-xs font-semibold text-[#374151] mb-1.5"
                    >
                      Language or Session Focus
                    </label>
                    <select
                      id="contact-topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm text-[#111827] bg-[#FAFAFB] border border-[#D1D5DB] rounded-lg focus:bg-white focus:border-[#2563EB] focus:outline-none"
                    >
                      <option>HTML &amp; CSS Foundations</option>
                      <option>JavaScript &amp; DOM Interactivity</option>
                      <option>Python Logic &amp; Data Structures</option>
                      <option>Peer Code Review / Study Group</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold text-[#374151] mb-1.5"
                    >
                      What are you learning or building?
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share what language you're working on or where you'd like guidance..."
                      className="w-full px-3.5 py-2.5 text-sm text-[#111827] bg-[#FAFAFB] border border-[#D1D5DB] rounded-lg focus:bg-white focus:border-[#2563EB] focus:outline-none resize-y"
                    />
                  </div>

                  {error && (
                    <p className="text-xs font-medium text-[#DC2626]" role="alert">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
