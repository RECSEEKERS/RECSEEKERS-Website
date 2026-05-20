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
    previewText: "We help education recruitment agencies hire the top 5% of talent across the UK and Australia",
    previewImage: "/Illustrations/Telecommute1.svg",
  },
  {
    label: "About",
    href: "/about",
    previewTitle: "Who are we?",
    previewText: "Learn about us, our values, our location, our team and more. Don't forget to check out our LinkedIn too!",
    previewImage: "/Illustrations/GroupDiscussion1.svg",
  },
  {
    label: "Candidates",
    href: "/candidates",
    previewTitle: "Looking for jobs?",
    previewText: "Level up your recruiting career with roles that match your niche, targets, and way of working",
    previewImage: "/Illustrations/dealIcon2.svg",
  },
  {
    label: "Employers",
    href: "/employers",
    previewTitle: "Looking for new hires?",
    previewText: "Hire proven talent who understand your market, your pipeline, and your growth targets",
    previewImage: "/Illustrations/PeopleSearch2.svg",
  },
  // { HIDE FOR NOW UNTIL ITS ADDED IN OTHER PAGE
  //   label: "EdTech",
  //   href: "/edtech",
  //   previewTitle: "Education Technology",
  //   previewText: "We're working with the best emerging startups in UK EdTech space",
  //   previewImage: "/Illustrations/brainstorming.svg",
  // }
];

export const CONTACT_ITEM = {
  label: "Contact us",
  href: "/contact",
} as const;
