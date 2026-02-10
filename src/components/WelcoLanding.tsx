import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ConciergeBell,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Star,
  Wallet,
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

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSignup = () => {
    document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" });
  };

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
      <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-slate-200/70 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Welco logo" className="h-8 w-8 rounded-lg shadow-sm" />
            <div className="text-lg font-semibold tracking-tight text-slate-900">Welco AI</div>
          </div>
          <Button
            onClick={scrollToSignup}
            className="rounded-xl bg-blue-600 px-5 text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700"
          >
            Get early access
          </Button>
        </div>
      </header>

      <main className="relative pt-16">
        <section className="relative overflow-hidden px-4 pb-16 pt-0 sm:px-6 lg:px-8">
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

          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-4 mt-4 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-blue-700">
                <Sparkles className="h-3.5 w-3.5" />
                Hospitality AI platform
              </div>
              <h1 className="hero-title-gradient text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                The guest messaging layer built for professional hosts.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
                Align every guest interaction with your brand quality. Welco automates repetitive
                support, keeps conversations human-like, and gives your team control when it
                matters.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  onClick={scrollToSignup}
                  size="lg"
                  className="group rounded-xl bg-blue-600 text-white shadow-xl shadow-blue-700/25 hover:bg-blue-700"
                >
                  Join the waitlist
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
                <Button
                  onClick={scrollToSignup}
                  variant="outline"
                  size="lg"
                  className="rounded-xl border-slate-300 bg-white/85 text-slate-700 hover:bg-slate-100"
                >
                  Book a private demo
                </Button>
              </div>

              <div className="mt-8 grid max-w-md grid-cols-3 gap-2">
                <div className="section-surface flex min-h-[88px] flex-col items-center justify-center rounded-xl p-3 text-center">
                  <p className="text-xl font-semibold text-slate-900">24/7</p>
                  <p className="text-xs text-slate-600">coverage</p>
                </div>
                <div className="section-surface flex min-h-[88px] flex-col items-center justify-center rounded-xl p-3 text-center">
                  <p className="text-xl font-semibold text-slate-900">&lt;10s</p>
                  <p className="text-xs text-slate-600">response speed</p>
                </div>
                <div className="section-surface flex min-h-[88px] flex-col items-center justify-center rounded-xl p-3 text-center">
                  <p className="text-xl font-semibold text-slate-900">Proactive AI</p>
                  <p className="text-xs text-slate-600">Follow-ups for feedback & dynamic recommendations</p>
                </div>
              </div>
            </div>

            <Card className="glass-card rounded-3xl border-slate-200/60">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    <MessageCircle className="h-3.5 w-3.5 text-blue-600" />
                    Live guest thread
                  </div>
                  <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    Active now
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-slate-100 px-4 py-3 text-sm text-slate-700">
                    Hi, the dishwasher is not starting and we have dinner soon.
                  </div>
                  <div className="ml-auto max-w-[84%] rounded-2xl rounded-br-md bg-blue-600 px-4 py-3 text-sm text-blue-50 shadow-lg shadow-blue-600/25">
                    No stress. Please hold the power button for 3 seconds and check if the door is
                    fully latched. If it still fails, I can dispatch a partner technician.
                  </div>
                  <div className="max-w-[78%] rounded-2xl rounded-bl-md bg-slate-100 px-4 py-3 text-sm text-slate-700">
                    Great, it works. Any breakfast places nearby?
                  </div>
                  <div className="ml-auto max-w-[84%] rounded-2xl rounded-br-md bg-blue-600 px-4 py-3 text-sm text-blue-50 shadow-lg shadow-blue-600/25">
                    Try Mornings &amp; Co, 6 minutes away. Guests rate it 4.9 and they open at
                    07:30.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl rounded-3xl section-surface p-6 sm:p-10">
            <div className="grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200/65 bg-white/70 p-5">
                <p className="text-sm text-slate-500">Time reclaimed</p>
                <p className="mt-1 text-3xl font-semibold text-slate-900">6-10 hrs/week</p>
                <p className="mt-2 text-sm text-slate-600">
                  Less repetitive guest support across every property.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/65 bg-white/70 p-5">
                <p className="text-sm text-slate-500">SLA consistency</p>
                <p className="mt-1 text-3xl font-semibold text-slate-900">Always on</p>
                <p className="mt-2 text-sm text-slate-600">
                  Operational reliability during nights, weekends, and holidays.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/65 bg-white/70 p-5">
                <p className="text-sm text-slate-500">Partnership income</p>
                <p className="mt-1 text-3xl font-semibold text-slate-900">Earn on every referral</p>
                <p className="mt-2 text-sm text-slate-600">
                  Guests book trusted restaurants and services you recommend, and you receive a
                  commission through partner deals.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-10 max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-700">
                Product capabilities
              </p>
              <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                Built to look premium, run reliably, and scale trust.
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {featureCards.map((feature) => (
                <Card key={feature.title} className="glass-card rounded-2xl">
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-slate-500">
              And more advanced features built for modern hospitality operations.
            </p>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto grid w-full max-w-7xl gap-8 rounded-3xl section-surface p-6 sm:p-10 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-700">
                How it works
              </p>
              <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                Launch a production-ready assistant in days, not quarters.
              </h2>
              <p className="mt-4 max-w-xl text-slate-600">
                Keep implementation straightforward while adding a polished, high-trust experience
                for your guests and operations team.
              </p>
            </div>
            <div className="space-y-4">
              {processSteps.map((step, index) => (
                <div key={step} className="flex items-center gap-4 rounded-2xl border border-slate-200/70 bg-white/75 p-4">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                    {index + 1}
                  </div>
                  <p className="text-sm font-medium text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-700">
                  Trusted outcomes
                </p>
                <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                  Designed for trust, consistency, and measurable performance.
                </h2>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-600">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                Guest experience benchmark: premium tier
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {testimonials.map((item) => (
                <Card key={item.company} className="glass-card rounded-2xl">
                  <CardContent className="p-6">
                    <p className="text-sm leading-relaxed text-slate-600">"{item.quote}"</p>
                    <div className="mt-5">
                      <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.company}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="signup" className="px-4 pb-20 pt-10 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-blue-300/30 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-700 p-8 shadow-2xl shadow-blue-900/25 sm:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-200">
                Early access
              </p>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                Upgrade your guest communication stack with Welco AI.
              </h2>
              <p className="mt-4 text-blue-100">
                Join the launch list and get priority onboarding, implementation guidance, and
                private rollout slots.
              </p>
            </div>

            <form
              onSubmit={handleWaitlistSignup}
              className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row"
            >
              <Input
                type="email"
                value={email}
                placeholder="Enter your work email"
                onChange={(event) => setEmail(event.target.value)}
                className="h-12 rounded-xl border-blue-300/20 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-blue-400"
                required
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 rounded-xl bg-white px-6 font-semibold text-blue-700 hover:bg-blue-50"
              >
                {isLoading ? "Joining..." : "Join waitlist"}
              </Button>
            </form>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs text-blue-100/90">
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

      <footer className="border-t border-slate-200/80 bg-white/60 px-4 py-8 backdrop-blur-sm sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 text-sm text-slate-600 sm:flex-row">
          <div className="font-medium text-slate-900">Welco AI</div>
          <div>Professional AI communication for modern hospitality teams.</div>
          <div>contact@welco.ro</div>
        </div>
      </footer>
    </div>
  );
};

export default WelcoLanding;
