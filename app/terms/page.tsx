import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = { title: 'Terms & Conditions' };

export default function Terms() {
  return (
    <LegalPage
      title="Terms & Conditions"
      sections={['Using this site', 'Age requirement', 'Orders and payment', 'Delivery', 'Returns and refunds', 'Changes to these terms', 'Contact us']}
    />
  );
}
