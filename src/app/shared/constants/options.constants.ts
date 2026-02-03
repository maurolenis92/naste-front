import { SelectOption } from '../models/select.model';

export const STATUS_OPTIONS: SelectOption[] = [
  { label: 'Pendiente', value: 'PENDING' },
  { label: 'Pagado', value: 'PAID' },
  { label: 'Entregado', value: 'DELIVERED' },
  { label: 'Cancelado', value: 'CANCELLED' },
];

export const ORIGIN_OPTIONS: SelectOption[] = [
  { label: 'Instagram', value: 'INSTAGRAM' },
  { label: 'Facebook', value: 'FACEBOOK' },
  { label: 'TikTok', value: 'TIKTOK' },
  { label: 'WhatsApp', value: 'WHATSAPP' },
  { label: 'Referral', value: 'REFERRAL' },
  { label: 'Other', value: 'OTHER' },
];

export const PAYMENT_METHOD_OPTIONS: SelectOption[] = [
  { label: 'Cash', value: 'CASH' },
  { label: 'Transfer', value: 'TRANSFER' },
  { label: 'Breb', value: 'BREB' },
  { label: 'Nequi', value: 'NEQUI' },
  { label: 'Bancolombia', value: 'BANCOLOMBIA' },
  { label: 'Other', value: 'OTHER' },
];
