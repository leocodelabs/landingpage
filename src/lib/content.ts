import siteData from '../data/site.json';
import activityData from '../data/activities.json';
import memberData from '../data/members.json';

export type Locale = 'en' | 'ar';
export type Localized = { en: string; ar: string };

export type Activity = {
  title: Localized;
  summary: Localized;
  date: string;
  type: Localized;
  location: Localized;
  image?: string;
  link?: string;
};

export type Member = {
  name: string;
  role: Localized;
  image?: string;
  github?: string;
  linkedin?: string;
};

export const site = siteData;
export const activities = ([...activityData] as Activity[]).sort((a, b) =>
  b.date.localeCompare(a.date),
);
export const members = (memberData as Member[]).filter((member) => member.name);

export const t = (value: Localized, locale: Locale) => value[locale];

export const localePath = (locale: Locale) => (locale === 'ar' ? '/ar/' : '/');

export const otherLocale = (locale: Locale): Locale => (locale === 'en' ? 'ar' : 'en');

export function formatDate(date: string, locale: Locale) {
  if (!date) return '';

  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    numberingSystem: 'latn',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}

const email = (import.meta.env.PUBLIC_EMAIL ?? '').replace(/^mailto:/, '').trim();

export const socials = {
  github: import.meta.env.PUBLIC_GITHUB_URL?.trim() ?? '',
  huggingface: import.meta.env.PUBLIC_HUGGINGFACE_URL?.trim() ?? '',
  youtube: import.meta.env.PUBLIC_YOUTUBE_URL?.trim() ?? '',
  email: email ? `mailto:${email}` : '',
  nahno: import.meta.env.PUBLIC_NAHNO_URL?.trim() ?? '',
  nahnoSites: import.meta.env.PUBLIC_NAHNO_SITES_URL?.trim() ?? '',
};
