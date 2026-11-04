import type { StaticImageData } from 'next/image';
import tasting from '@/assets/photos/ev-tasting.jpg';
import festival from '@/assets/photos/ev-festival.jpg';
import launch from '@/assets/photos/ev-launch.jpg';
import release from '@/assets/photos/news-release.jpg';
import offer from '@/assets/photos/news-offer.jpg';
import toast from '@/assets/photos/news-toast.jpg';

export type Story = {
  category: 'event' | 'news';
  kind: string;
  title: string;
  when: string;
  action: string;
  image: StaticImageData;
  tint: string;
  ink: string;
};

export const stories: Story[] = [
  { category: 'event', kind: 'Event', title: 'Wine tastings', when: '[Date] · [Location]', action: 'Register', image: tasting, tint: '#FBD0DB', ink: '#58103A' },
  { category: 'event', kind: 'Event', title: 'Festivals', when: '[Date] · [Location]', action: 'Register', image: festival, tint: '#FFD2B4', ink: '#5A2212' },
  { category: 'event', kind: 'Event', title: 'Exclusive launch events', when: '[Date] · [Location]', action: 'Register', image: launch, tint: '#D9D4F5', ink: '#2A2358' },
  { category: 'news', kind: 'New release', title: '[Product release headline]', when: '[Date]', action: 'Read more', image: release, tint: '#F6DBA4', ink: '#3A1A0A' },
  { category: 'news', kind: 'Special offer', title: '[Special offer headline]', when: '[Date]', action: 'Read more', image: offer, tint: '#FBD0DB', ink: '#58103A' },
  { category: 'news', kind: 'News', title: '[News headline]', when: '[Date]', action: 'Read more', image: toast, tint: '#DDE5CC', ink: '#24301C' },
];
