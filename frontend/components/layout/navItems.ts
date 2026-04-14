export interface NavPreviewItem {
  label: string;
  href: string;
  previewTitle: string;
  previewText: string;
  previewImage: string;
}

export const PILL_ITEMS: NavPreviewItem[] = [
  {
    label: "Home",
    href: "/",
    previewTitle: "Welcome to RECSEEKERS",
    previewText: "High-impact recruiters matching top talent with their next move.",
    previewImage: "/Illustrations/Telecommute1.svg",
  },
  {
    label: "About",
    href: "/about",
    previewTitle: "About RECSEEKERS",
    previewText: "We specialise in recruiter-to-recruiter hiring-matching top talent in the Education sector",
    previewImage: "/Illustrations/GroupDiscussion1.svg",
  },
  {
    label: "Candidates",
    href: "/candidates",
    previewTitle: "For Recruiter Candidates",
    previewText: "Level up your recruiting career with roles that match your niche, targets, and way of working.",
    previewImage: "/Illustrations/HelpingPartner1.svg",
  },
  {
    label: "Employers",
    href: "/employers",
    previewTitle: "For Hiring Teams",
    previewText: "Hire proven recruiters who understand your market, your pipeline, and your growth targets.",
    previewImage: "/Illustrations/PeopleSearch2.svg",
  },
  {
    label: "EdTech",
    href: "/edtech",
    previewTitle: "EdTech",
    previewText: "A dedicated space for education-technology conversations and hiring insights.",
    previewImage: "/Illustrations/brainstorming.svg",
  },
  {
    label: "Our Subscription",
    href: "/subscription",
    previewTitle: "Subscription",
    previewText: "Get useful updates, insights, and opportunities delivered simply.",
    previewImage: "/Illustrations/communicator.svg",
  },
];

export const CONTACT_ITEM = {
  label: "Contact us",
  href: "/contact",
} as const;
