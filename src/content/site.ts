export const HERO = {
  eyebrow: "Prelaunch · Investing, simplified",
  titleLead: "A simpler way to invest in",
  titleAccent: "tokenized assets.",
  description:
    "DeBro is building a modern investing experience that brings tokenized financial assets together. Explore opportunities, understand what a token may represent, and review relevant information in one considered place.",
  note: "In development. Investing functionality is not yet available.",
} as const;

export const STEPS = [
  {
    number: "01",
    title: "Explore",
    description:
      "Discover information about tokenized financial assets in one planned experience, without needing to start with specialist terminology.",
  },
  {
    number: "02",
    title: "Understand",
    description:
      "Learn how an asset is structured, what rights a token may carry, and which risks to consider before making a decision.",
  },
  {
    number: "03",
    title: "Invest",
    description:
      "Review the information and decide whether an opportunity is right for you.",
  },
] as const;

export const BENEFITS = [
  {
    title: "A unified investing experience",
    description:
      "Bring discovery and relevant asset information into one considered destination, rather than piecing together unfamiliar details.",
  },
  {
    title: "Clarity before decisions",
    description:
      "Understand an asset's structure, potential rights and risks in plain language before considering any investment action.",
  },
  {
    title: "User control and asset portability",
    description:
      "Manage eligible tokens directly, with control and portability shaped by each asset and network.",
  },
] as const;

export const SECURITY_PRINCIPLES = [
  {
    title: "Understand the structure",
    description:
      "Rights depend on the issuer, asset and legal structure. Review the terms that apply to each investment.",
  },
  {
    title: "Make informed decisions",
    description:
      "The experience is designed to make asset information and each investing step clear.",
  },
  {
    title: "Control carries responsibility",
    description:
      "Where users manage access directly, they are responsible for protecting that access.",
  },
] as const;

export const RISK_DISCLOSURE =
  "Digital assets can be volatile and may lose value. A token may not provide direct ownership of an underlying financial asset; rights depend on its issuer and legal structure. Market, issuer, liquidity, legal and technology risks vary by product. This website is not investment advice or an offer to buy or sell financial instruments.";

export const FAQ_ITEMS = [
  {
    question: "What is DeBro?",
    answer:
      "DeBro is building a modern investing platform focused on tokenized financial assets, bringing discovery and plain-language context into one considered experience.",
  },
  {
    question: "What are tokenized financial assets?",
    answer:
      "They are digital tokens issued on a blockchain and designed to represent rights or exposure related to a financial asset. The legal rights depend on the issuer and structure; holding a token is not automatically the same as owning the underlying asset.",
  },
  {
    question: "What rights do tokenized assets provide?",
    answer:
      "Rights are set by the asset's issuer and legal structure. A token may not provide direct ownership, voting rights, income or a claim on an underlying asset. Review the specific terms for any asset before making a decision.",
  },
  {
    question: "How is DeBro different from a traditional investing platform?",
    answer:
      "DeBro is being designed around tokenized financial assets, bringing discovery and plain-language context into one considered investing experience.",
  },
  {
    question: "How can I access DeBro?",
    answer:
      "DeBro is being designed to make investing accessible without requiring prior experience with crypto wallets. You'll be able to sign in using your email or Google account, or connect an existing compatible wallet. Wallets will work behind the scenes for users who choose a simpler sign-in experience, while those who prefer managing their own wallet can connect it directly.",
  },
  {
    question: "What are the risks?",
    answer:
      "Risks can include changes in value, limited liquidity, issuer or counterparty failure, legal uncertainty and technology issues. Token rights vary, and a token may not provide direct ownership of an underlying asset. Review asset-specific terms and risks before making an investment decision.",
  },
  {
    question: "Why does DeBro use blockchain?",
    answer:
      "DeBro uses Solana as the underlying infrastructure for tokenized assets. This enables digital assets to be transferred and transactions to be independently verified. Our goal is to make that technology work seamlessly in the background, so you can focus on investing rather than understanding blockchain.",
  },
  {
    question: "When and where will DeBro be available?",
    answer:
      "DeBro is currently in development, with plans to make the platform accessible to investors across multiple markets. Availability will depend on local regulations, eligibility requirements and supported assets. Join the waitlist to receive an email when DeBro launches.",
  },
  {
    question: "What happens after I join the waitlist?",
    answer:
      "With your consent, we plan to send one email when DeBro's availability is announced. Joining does not create an account or guarantee access.",
  },
  {
    question: "How is my email used?",
    answer:
      "Your email is collected only for a launch-availability announcement, based on the consent shown in the form. It is not for newsletters or recurring marketing. The full privacy information will be published before public collection opens.",
  },
] as const;

export const WAITLIST_POINTS = [
  "One launch-availability email",
  "No product account needed to express interest",
  "No newsletter or recurring marketing",
] as const;
