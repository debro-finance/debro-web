export const HERO = {
  eyebrow: "Prelaunch · Investing, simplified",
  titleLead: "A simpler way to invest in",
  titleAccent: "tokenized assets.",
  description:
    "DeBro is building a modern investing platform that makes tokenized financial assets easier to understand and explore — with a clear, considered experience from the first step.",
  note: "In development. Join the waitlist for launch news.",
} as const;

export const STEPS = [
  {
    number: "01",
    title: "Explore tokenized assets",
    description:
      "Discover a focused selection of tokenized financial assets, explained in plain language and organized around what matters.",
  },
  {
    number: "02",
    title: "Understand what you're considering",
    description:
      "Review clear information about each asset, including how it works, what rights a token may carry, and the risks involved.",
  },
  {
    number: "03",
    title: "Invest with clarity",
    description:
      "Make decisions from one considered experience, designed to keep unnecessary complexity out of the way.",
  },
] as const;

export const BENEFITS = [
  {
    title: "Investing, made clearer",
    description:
      "A focused experience that explains tokenized assets without assuming specialist knowledge.",
  },
  {
    title: "Designed around you",
    description:
      "A familiar, modern interface that keeps clarity and control at the center of every decision.",
  },
  {
    title: "Built on transparency",
    description:
      "Clear information and independently verifiable records help you understand what you are considering.",
  },
  {
    title: "For every stage",
    description:
      "Clear enough for people new to tokenized assets, with the depth experienced investors expect.",
  },
] as const;

export const SECURITY_PRINCIPLES = [
  {
    title: "You stay in control",
    description:
      "DeBro is designed so that your assets remain under your control, rather than held by a custodian on your behalf.",
  },
  {
    title: "Every action is explicit",
    description:
      "You review and confirm each step before anything happens, with no hidden actions.",
  },
  {
    title: "Transparency, with limits",
    description:
      "Public records can be independently verified, but they do not remove market, issuer, technology or counterparty risk.",
  },
] as const;

export const RISK_DISCLOSURE =
  "Digital assets are volatile and can lose value. Tokenized assets may not give you direct ownership of an underlying financial asset; rights depend on the issuer and legal structure. DeBro is in prelaunch, does not provide investment advice, and does not guarantee returns. Only use funds you can afford to lose.";

export const FAQ_ITEMS = [
  {
    question: "What is DeBro?",
    answer:
      "DeBro is building a modern investing platform focused on tokenized financial assets. It is designed to make this market easier to understand and explore, with a clear experience from the first step. DeBro is in prelaunch: this site is live so you can follow the direction and join the waitlist, but investing and account features are not available yet.",
  },
  {
    question: "What are tokenized financial assets?",
    answer:
      "Tokenized financial assets are digital tokens issued on a blockchain that are designed to represent exposure to a financial asset. The legal rights attached to a token depend on the issuer and structure — holding a token is not necessarily the same as holding the underlying asset directly. We will publish clear product details before launch.",
  },
  {
    question: "How is DeBro different from a traditional investing platform?",
    answer:
      "DeBro is being designed around self-custody: instead of a platform holding your assets, you use your own wallet and approve each action. Transactions are recorded on Solana, where they can be independently verified. This approach is intended to give you more direct control, and it comes with responsibilities and risks that we will explain clearly. DeBro is in prelaunch, and no DeBro product is live today.",
  },
  {
    question: "Do I need a crypto wallet?",
    answer:
      "Not to join the waitlist. When the application launches, you will need a compatible Solana wallet to use DeBro. We will share supported wallet guidance ahead of launch.",
  },
  {
    question: "Why does DeBro use blockchain?",
    answer:
      "Blockchain infrastructure allows tokenized assets to be issued, transferred and recorded in a way that can be independently verified. DeBro uses Solana for this purpose. Most visitors will not need to understand the technical details to use the experience, but we will explain them clearly for anyone who wants to.",
  },
  {
    question: "Is DeBro a crypto trading platform?",
    answer:
      "DeBro is focused on tokenized financial assets, not speculative crypto trading. The underlying settlement uses blockchain technology, but the experience is designed around investing: understanding what you are considering and making a considered decision.",
  },
  {
    question: "When is DeBro launching?",
    answer:
      "A launch date has not been announced. DeBro is in active development, and the waitlist is the best way to hear when availability opens. Joining does not guarantee access or a specific launch date.",
  },
  {
    question: "Is DeBro available worldwide?",
    answer:
      "Availability has not been finalized. Access to tokenized financial assets may be limited by jurisdiction, regulation or issuer requirements. Joining the waitlist does not guarantee eligibility in any location.",
  },
  {
    question: "What happens when I join the waitlist?",
    answer:
      "You will receive a single email when DeBro becomes available. We do not send newsletters, product updates or promotional campaigns, and no account or wallet is required to join.",
  },
  {
    question: "How is my email used?",
    answer:
      "Your email is used only to notify you about DeBro launch availability, based on the consent you give when signing up. We will publish our full privacy policy before public collection opens, and every message we send will include a way to ask for removal.",
  },
] as const;

export const WAITLIST_POINTS = [
  "One email when DeBro launches",
  "No account required to join",
  "No newsletters or recurring marketing",
] as const;
