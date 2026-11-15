// Details still to come from the client. Replace these in one place.
export const placeholders = {
  price: '[Price]',
  licence: '[number]',
  email: '[Email address]',
  phone: '[Phone number]',
  legalText: '[Legal text to be supplied by Bometh]',
};

export const social = [
  { label: 'Instagram', href: '#' },
  { label: 'Facebook', href: '#' },
  { label: 'TikTok', href: '#' },
];

export const legalNotice = `It is against the law to sell or supply alcohol to, or to obtain alcohol on behalf of, a person under 18 years of age. Liquor licence ${placeholders.licence}. Please enjoy responsibly.`;

// Public origin used for the sitemap and robots.txt. Set NEXT_PUBLIC_SITE_URL
// to point a preview or staging deploy somewhere else.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.bomethwines.com').replace(/\/$/, '');
