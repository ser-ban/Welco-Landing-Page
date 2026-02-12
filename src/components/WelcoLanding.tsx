import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BrainCircuit,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  ConciergeBell,
  HandCoins,
  Languages,
  MessageCircle,
  Mic,
  Minus,
  PhoneCall,
  Plus,
  ShieldCheck,
  Sparkles,
  Star,
  Wallet,
  Wrench,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const featureCards = [
  {
    icon: MessageCircle,
    title: "Instant WhatsApp responses",
    description:
      "Guests get clear, brand-safe answers within seconds, day and night, without your team being online.",
  },
  {
    icon: ConciergeBell,
    title: "Operational playbooks",
    description:
      "Welco follows your SOPs for check-in, appliance troubleshooting, quiet hours, and escalation protocols.",
  },
  {
    icon: PhoneCall,
    title: "Escalate only what matters",
    description:
      "The assistant handles repetitive conversations and routes high-risk or high-value requests to humans.",
  },
  {
    icon: Wallet,
    title: "Revenue-aware recommendations",
    description:
      "Promote partner businesses and monetize trusted local recommendations with measurable attribution.",
  },
  {
    icon: ShieldCheck,
    title: "Professional and compliant",
    description:
      "Built with production controls, traceable interactions, and policy-safe replies for hospitality brands.",
  },
  {
    icon: BrainCircuit,
    title: "Self-updating operational memory",
    description:
      "Welco learns from past issues, guest situations, and handovers automatically, improving future responses without manual knowledge-base updates.",
  },
];

const moreFeatureCards = [
  {
    icon: HandCoins,
    title: "Earn from local business partnerships",
    description:
      "When recommended partners pay for their slots, you receive a share of that revenue—so your property’s influence turns into real income.",
  },
  {
    icon: CalendarClock,
    title: "Recommendations at the right moment",
    description:
      "Suggestions go out automatically at planned times during the stay—morning tips, evening options—so guests get value without having to ask.",
  },
  {
    icon: Languages,
    title: "Guests in their language",
    description:
      "Messages are detected and answered in the guest’s language, with translations cached so repeat questions stay fast and consistent.",
  },
  {
    icon: Mic,
    title: "Voice messages, same smart replies",
    description:
      "Guests can send voice notes; they’re transcribed and handled like text so the assistant responds with the same context and care.",
  },
  {
    icon: BookOpen,
    title: "One guidebook, web and PDF",
    description:
      "A single link gives guests WiFi, rules, check-in steps, and local picks. A downloadable PDF keeps everything handy offline.",
  },
  {
    icon: Wrench,
    title: "Appliance help from your manuals",
    description:
      "Upload PDFs or manuals once; the AI uses them to answer guest questions about appliances and troubleshooting.",
  },
];

const processSteps = [
  "Connect your WhatsApp and property context",
  "Add house rules, appliance manuals, and auto-load local recommendations",
  "Launch live and review measurable automation impact",
];

const testimonials = [
  {
    quote:
      "We reduced first-response time from minutes to seconds while keeping a premium guest tone.",
    name: "Operations Lead",
    company: "Urban Stay Group",
  },
  {
    quote:
      "Welco removed repetitive host tasks and let our team focus on occupancy and guest delight.",
    name: "Property Owner",
    company: "Belair Lake Complex",
  },
  {
    quote:
      "The assistant handles scale better than we expected, especially during check-in peaks.",
    name: "Guest Experience Manager",
    company: "Sierra Suites",
  },
];

const WelcoLanding = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [capabilitiesExpanded, setCapabilitiesExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSignup = () => {
    document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" });
  };

  const WAITLIST_RATE_LIMIT_MS = 60 * 1000; // 1 minute
  const WAITLIST_LAST_SUBMIT_KEY = "welco_waitlist_last_submit";

  const handleWaitlistSignup = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    const lastSubmit = localStorage.getItem(WAITLIST_LAST_SUBMIT_KEY);
    if (lastSubmit) {
      const elapsed = Date.now() - Number(lastSubmit);
      if (elapsed < WAITLIST_RATE_LIMIT_MS) {
        const waitSec = Math.ceil((WAITLIST_RATE_LIMIT_MS - elapsed) / 1000);
        toast({
          title: "Please wait a moment",
          description: `You can add another email in about ${waitSec} second${waitSec === 1 ? "" : "s"}. We limit signups to once per minute.`,
          variant: "destructive",
        });
        return;
      }
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.from("waitlist").insert([{ email }]);

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already registered",
            description: "This email is already on our waitlist.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        localStorage.setItem(WAITLIST_LAST_SUBMIT_KEY, String(Date.now()));
        toast({
          title: "You're on the list",
          description: "We'll contact you as soon as early access opens.",
        });
        setEmail("");
      }
    } catch (error) {
      console.error("Waitlist signup error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="landing-shell noise-overlay relative min-h-screen">
      <header className="fixed inset-x-0 top-0 z-50 flex h-14 min-h-[56px] items-center border-b border-slate-200/70 bg-white/70 backdrop-blur-xl safe-area-inset-top sm:h-16">
        <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <img src="/logo.svg" alt="Welco logo" className="h-7 w-7 shrink-0 rounded-lg shadow-sm sm:h-8 sm:w-8" />
            <span className="truncate text-base font-semibold tracking-tight text-slate-900 sm:text-lg">Welco AI</span>
          </div>
          <Button
            onClick={scrollToSignup}
            className="h-9 min-h-[44px] shrink-0 rounded-xl bg-blue-600 px-4 text-sm text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700 sm:h-10 sm:px-5 sm:text-base"
          >
            Get early access
          </Button>
        </div>
      </header>

      <main className="relative overflow-x-hidden pt-14 sm:pt-16">
        <section className="relative overflow-hidden px-4 pb-12 pt-0 sm:px-6 sm:pb-16 lg:px-8">
          <div
            className="aurora-layer parallax-layer"
            style={{ transform: `translate3d(0, ${scrollY * 0.16}px, 0)` }}
          />
          <div
            className="orb orb-a parallax-layer left-[4%] top-12"
            style={{ transform: `translate3d(0, ${scrollY * 0.12}px, 0)` }}
          />
          <div
            className="orb orb-b parallax-layer right-[6%] top-28"
            style={{ transform: `translate3d(0, ${scrollY * -0.09}px, 0)` }}
          />

          <div className="mx-auto grid w-full max-w-7xl items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10">
            <div>
              <div className="mb-3 mt-2 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-blue-700 sm:mb-4 sm:mt-4 sm:px-4 sm:py-2">
                <Sparkles className="h-3.5 w-3.5" />
                Hospitality AI platform
              </div>
              <h1 className="hero-title-gradient text-3xl font-semibold leading-tight sm:text-4xl sm:text-5xl lg:text-6xl">
                The guest messaging layer built for professional hosts.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:mt-6 sm:text-lg">
                Align every guest interaction with your brand quality. Welco automates repetitive
                support, keeps conversations human-like, and gives your team control when it
                matters.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
                <Button
                  onClick={scrollToSignup}
                  size="lg"
                  className="group h-11 min-h-[44px] rounded-xl bg-blue-600 text-white shadow-xl shadow-blue-700/25 hover:bg-blue-700 sm:h-12"
                >
                  Join the waitlist
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
                <Button
                  onClick={scrollToSignup}
                  variant="outline"
                  size="lg"
                  className="h-11 min-h-[44px] rounded-xl border-slate-300 bg-white/85 text-slate-700 hover:bg-slate-100 sm:h-12"
                >
                  Book a private demo
                </Button>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2 sm:mt-8 sm:max-w-md">
                <div className="section-surface flex min-h-[72px] flex-col items-center justify-center rounded-xl p-2.5 text-center sm:min-h-[88px] sm:p-3">
                  <p className="text-lg font-semibold text-slate-900 sm:text-xl">24/7</p>
                  <p className="text-[10px] text-slate-600 sm:text-xs">coverage</p>
                </div>
                <div className="section-surface flex min-h-[72px] flex-col items-center justify-center rounded-xl p-2.5 text-center sm:min-h-[88px] sm:p-3">
                  <p className="text-lg font-semibold text-slate-900 sm:text-xl">&lt;10s</p>
                  <p className="text-[10px] text-slate-600 sm:text-xs">response speed</p>
                </div>
                <div className="section-surface flex min-h-[72px] flex-col items-center justify-center rounded-xl p-2.5 text-center sm:min-h-[88px] sm:p-3">
                  <p className="text-base font-semibold text-slate-900 sm:text-xl">Proactive AI</p>
                  <p className="text-[10px] leading-tight text-slate-600 sm:text-xs">Follow-ups & recommendations</p>
                </div>
              </div>
            </div>

            <Card className="glass-card rounded-2xl border-slate-200/60 sm:rounded-3xl">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    <MessageCircle className="h-3.5 w-3.5 text-blue-600" />
                    Live guest thread
                  </div>
                  <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    Active now
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-slate-100 px-3 py-2.5 text-sm text-slate-700 sm:max-w-[80%] sm:px-4 sm:py-3">
                    Hi, the dishwasher is not starting and we have dinner soon.
                  </div>
                  <div className="ml-auto max-w-[90%] rounded-2xl rounded-br-md bg-blue-600 px-3 py-2.5 text-sm text-blue-50 shadow-lg shadow-blue-600/25 sm:max-w-[84%] sm:px-4 sm:py-3">
                    No stress. Please hold the power button for 3 seconds and check if the door is
                    fully latched. If it still fails, I can dispatch a partner technician.
                  </div>
                  <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-slate-100 px-3 py-2.5 text-sm text-slate-700 sm:max-w-[78%] sm:px-4 sm:py-3">
                    Great, it works. Any breakfast places nearby?
                  </div>
                  <div className="ml-auto max-w-[90%] rounded-2xl rounded-br-md bg-blue-600 px-3 py-2.5 text-sm text-blue-50 shadow-lg shadow-blue-600/25 sm:max-w-[84%] sm:px-4 sm:py-3">
                    Try Mornings &amp; Co, 6 minutes away. Guests rate it 4.9 and they open at
                    07:30.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="mx-auto w-full max-w-7xl rounded-2xl section-surface p-4 sm:rounded-3xl sm:p-6 lg:p-10">
            <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200/65 bg-white/70 p-4 sm:rounded-2xl sm:p-5">
                <p className="text-xs text-slate-500 sm:text-sm">Time reclaimed</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900 sm:text-3xl">6-10 hrs/week</p>
                <p className="mt-2 text-xs text-slate-600 sm:text-sm">
                  Less repetitive guest support across every property.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200/65 bg-white/70 p-4 sm:rounded-2xl sm:p-5">
                <p className="text-xs text-slate-500 sm:text-sm">SLA consistency</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900 sm:text-3xl">Always on</p>
                <p className="mt-2 text-xs text-slate-600 sm:text-sm">
                  Operational reliability during nights, weekends, and holidays.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200/65 bg-white/70 p-4 sm:rounded-2xl sm:p-5">
                <p className="text-xs text-slate-500 sm:text-sm">Partnership income</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900 sm:text-3xl">Earn on every referral</p>
                <p className="mt-2 text-xs text-slate-600 sm:text-sm">
                  Guests book trusted restaurants and services you recommend, and you receive a
                  commission through partner deals.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-8 max-w-2xl sm:mb-10">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-700 sm:mb-3 sm:text-sm">
                Product capabilities
              </p>
              <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl lg:text-4xl">
                Built to look premium, run reliably, and scale trust.
              </h2>
            </div>
            <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
              {featureCards.map((feature) => (
                <Card key={feature.title} className="glass-card rounded-xl sm:rounded-2xl">
                  <CardContent className="p-4 sm:p-6">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 sm:mb-4 sm:h-11 sm:w-11">
                      <feature.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 sm:text-lg">{feature.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:mt-2 sm:text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div
              className="grid overflow-hidden transition-all duration-300 ease-out"
              style={{
                gridTemplateRows: capabilitiesExpanded ? "1fr" : "0fr",
              }}
            >
              <div className="min-h-0 pt-5">
                <div
                  className={`grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3 transition-all duration-300 ${
                    capabilitiesExpanded
                      ? "opacity-100 delay-75"
                      : "opacity-0 delay-0"
                  }`}
                >
                  {moreFeatureCards.map((feature) => (
                    <Card key={feature.title} className="glass-card rounded-xl sm:rounded-2xl">
                      <CardContent className="p-4 sm:p-6">
                        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 sm:mb-4 sm:h-11 sm:w-11">
                          <feature.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <h3 className="text-base font-semibold text-slate-900 sm:text-lg">{feature.title}</h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:mt-2 sm:text-sm">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 py-5 sm:gap-4 sm:py-6">
              <span className="h-px flex-1 bg-slate-200/80" aria-hidden />
              <button
                type="button"
                onClick={() => setCapabilitiesExpanded((e) => !e)}
                className="flex h-12 w-12 shrink-0 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-slate-200/80 bg-white/90 text-slate-600 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:bg-slate-100"
                aria-expanded={capabilitiesExpanded}
                aria-label={capabilitiesExpanded ? "Show fewer capabilities" : "Show more capabilities"}
              >
                {capabilitiesExpanded ? (
                  <Minus className="h-5 w-5 transition-transform duration-200" />
                ) : (
                  <Plus className="h-5 w-5 transition-transform duration-200" />
                )}
              </button>
              <span className="h-px flex-1 bg-slate-200/80" aria-hidden />
            </div>

            <p className="mt-6 text-center text-sm text-slate-500">
              And more advanced features built for modern hospitality operations.
            </p>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto grid w-full max-w-7xl gap-6 rounded-2xl section-surface p-4 sm:gap-8 sm:rounded-3xl sm:p-6 lg:p-10 lg:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-700 sm:mb-3 sm:text-sm">
                How it works
              </p>
              <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl lg:text-4xl">
                Launch a production-ready assistant in days, not quarters.
              </h2>
              <p className="mt-3 max-w-xl text-sm text-slate-600 sm:mt-4 sm:text-base">
                Keep implementation straightforward while adding a polished, high-trust experience
                for your guests and operations team.
              </p>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {processSteps.map((step, index) => (
                <div key={step} className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-white/75 p-3 sm:gap-4 sm:rounded-2xl sm:p-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                    {index + 1}
                  </div>
                  <p className="text-xs font-medium text-slate-700 sm:text-sm">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10 sm:gap-5">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-700 sm:mb-3 sm:text-sm">
                  Trusted outcomes
                </p>
                <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl lg:text-4xl">
                  Designed for trust, consistency, and measurable performance.
                </h2>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs text-slate-600 sm:px-4 sm:py-2 sm:text-sm">
                <Star className="h-3.5 w-3.5 shrink-0 fill-yellow-400 text-yellow-400 sm:h-4 sm:w-4" />
                <span>Guest experience benchmark: premium tier</span>
              </div>
            </div>

            <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
              {testimonials.map((item) => (
                <Card key={item.company} className="glass-card rounded-xl sm:rounded-2xl">
                  <CardContent className="p-4 sm:p-6">
                    <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">"{item.quote}"</p>
                    <div className="mt-4 sm:mt-5">
                      <p className="text-xs font-semibold text-slate-900 sm:text-sm">{item.name}</p>
                      <p className="text-[10px] text-slate-500 sm:text-xs">{item.company}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="signup" className="px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8">
          <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-blue-300/30 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-700 p-5 shadow-2xl shadow-blue-900/25 sm:rounded-3xl sm:p-8 lg:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-200 sm:mb-3 sm:text-sm">
                Early access
              </p>
              <h2 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
                Upgrade your guest communication stack with Welco AI.
              </h2>
              <p className="mt-3 text-sm text-blue-100 sm:mt-4 sm:text-base">
                Join the launch list and get priority onboarding, implementation guidance, and
                private rollout slots.
              </p>
            </div>

            <form
              onSubmit={handleWaitlistSignup}
              className="mx-auto mt-6 flex max-w-2xl flex-col gap-3 sm:mt-8 sm:flex-row"
            >
              <Input
                type="email"
                value={email}
                placeholder="Enter your work email"
                onChange={(event) => setEmail(event.target.value)}
                className="h-11 min-h-[44px] rounded-xl border-blue-300/20 bg-white text-base text-slate-900 placeholder:text-slate-400 focus-visible:ring-blue-400 sm:h-12"
                required
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="h-11 min-h-[44px] rounded-xl bg-white px-6 font-semibold text-blue-700 hover:bg-blue-50 sm:h-12"
              >
                {isLoading ? "Joining..." : "Join waitlist"}
              </Button>
            </form>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-blue-100/90 sm:mt-5 sm:gap-4">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                English-only content by default
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                No spam, only launch updates
              </span>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200/80 bg-white/60 px-4 py-6 backdrop-blur-sm sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 text-center text-xs text-slate-600 sm:flex-row sm:gap-3 sm:text-left sm:text-sm">
          <div className="font-medium text-slate-900">Welco AI</div>
          <div className="max-w-[280px] sm:max-w-none">Professional AI communication for modern hospitality teams.</div>
          <a href="mailto:contact@welco.ro" className="text-blue-600 underline-offset-2 hover:underline">contact@welco.ro</a>
        </div>
      </footer>
    </div>
  );
};

export default WelcoLanding;
