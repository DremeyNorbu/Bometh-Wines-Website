import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      sections={['What we collect', 'How we use it', 'Cookies', 'Who we share it with', 'Your choices', 'Contact us']}
    />
  );
}
