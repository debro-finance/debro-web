export const HERO = {
  eyebrow: "Prelaunch · Built on Solana",
  titleLead: "A simpler way to explore",
  titleAccent: "tokenized assets.",
  description:
    "DeBro is building a self-custodial investing experience for discovering tokenized financial assets on Solana — designed to feel clear from the very first step.",
  note: "In development. Join the waitlist — no wallet needed.",
} as const;

export const STEPS = [
  {
    number: "01",
    title: "Discover tokenized assets",
    description:
      "Explore a focused selection of tokenized financial assets, explained in plain language. No prior crypto experience required.",
  },
  {
    number: "02",
    title: "Connect your wallet",
    description:
      "When the application becomes available, connect a compatible Solana wallet. You stay in control of your assets throughout.",
  },
  {
    number: "03",
    title: "Invest with clarity",
    description:
      "Review what you are exploring, understand the risks, and make decisions from one simple, considered experience.",
  },
] as const;

export const BENEFITS = [
  {
    title: "A simpler way in",
    description:
      "A focused interface that explains tokenized assets without assuming years of crypto experience.",
  },
  {
    title: "Self-custody at the center",
    description:
      "Designed around your wallet, so control of your assets stays with you — not with a custodian.",
  },
  {
    title: "On-chain transparency",
    description:
      "Solana-based transactions can be independently verified, bringing a new level of visibility to investing.",
  },
  {
    title: "Built for two audiences",
    description:
      "Clear enough for newcomers, with the depth and precision experienced investors expect.",
  },
] as const;

export const SECURITY_PRINCIPLES = [
  {
    title: "Your keys stay yours",
    description:
      "DeBro is designed not to take custody of your wallet or its private keys. Access is granted through your wallet's own approval flow.",
  },
  {
    title: "Every action is explicit",
    description:
      "Transactions are designed to require your confirmation in your wallet before anything is signed.",
  },
  {
    title: "Transparency, with limits",
    description:
      "On-chain records are public and verifiable, but they do not remove market, smart-contract, issuer or counterparty risk.",
  },
] as const;

export const RISK_DISCLOSURE =
  "Digital assets are volatile and can lose value. Tokenized assets may not give you direct ownership of an underlying financial asset; rights depend on the issuer and legal structure. DeBro is in prelaunch, does not provide investment advice, and does not guarantee returns. Only use funds you can afford to lose.";

export const FAQ_ITEMS = [
  {
    question: "What is DeBro?",
    answer:
      "DeBro is building a self-custodial investing experience centered on tokenized financial assets on Solana. The product is in prelaunch: the website is live so you can understand the direction and join the waitlist, but trading and wallet connection are not available yet.",
  },
  {
    question: "What are tokenized financial assets?",
    answer:
      "Tokenized financial assets are digital tokens issued on a blockchain that are designed to represent exposure to a financial asset. The legal rights attached to a token depend on the issuer and structure — holding a token is not necessarily the same as holding the underlying asset directly. We will publish clear product details before launch.",
  },
  {
    question: "How is DeBro different from a traditional investing platform?",
    answer:
      "DeBro is being designed around self-custody: instead of a platform holding your assets, you use your own wallet and approve each action. Transactions are recorded on Solana, where they can be independently verified. DeBro is in prelaunch, and no DeBro product is live today.",
  },
  {
    question: "Do I need a crypto wallet?",
    answer:
      "Not to join the waitlist. When the application launches, you will need a compatible Solana wallet to explore tokenized assets. We will share supported wallet guidance ahead of launch.",
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
  "No wallet or account required",
  "No newsletters or recurring marketing",
] as const;
