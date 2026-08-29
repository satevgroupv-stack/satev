import React from 'react';
import { useI18n } from '../../lib/i18n';
type Status = 'online' | 'offline' | 'low_stock' | 'maintenance';
const config: Record<
  Status,
  {
    dot: string;
    text: string;
    key: string;
  }> =
{
  online: {
    dot: 'bg-[#4ADE80]',
    text: 'text-[#4ADE80]',
    key: 'online'
  },
  offline: {
    dot: 'bg-[#FF6B6B]',
    text: 'text-[#FF6B6B]',
    key: 'offline'
  },
  low_stock: {
    dot: 'bg-[#FBBF24]',
    text: 'text-[#FBBF24]',
    key: 'low_stock'
  },
  maintenance: {
    dot: 'bg-neon',
    text: 'text-neon',
    key: 'maintenance'
  }
};
export function StatusBadge({ status }: {status: Status;}) {
  const { t } = useI18n();
  const c = config[status];
  return (
    <span
      className={`inline-flex items-center gap-2 text-sm font-medium ${c.text}`}>
      
      <span
        className={`h-2.5 w-2.5 rounded-full ${c.dot} ${status === 'online' ? 'animate-pulse' : ''}`} />
      
      {t(c.key)}
    </span>);

}