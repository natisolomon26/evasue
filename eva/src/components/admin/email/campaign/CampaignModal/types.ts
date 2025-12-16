// components/admin/email/campaign/CampaignModal/types.ts
export interface CampaignData {
  subject: string;
  category: string;
  htmlBody: string;
  previewText?: string;
  fromName?: string;
  fromEmail?: string;
  recipients?: string[];
  scheduledFor?: string;
  tags?: string[];
  attachments?: File[];
}

export interface StepProps {
  data: CampaignData;
  errors: Record<string, string>;
  onUpdate: (updates: Partial<CampaignData>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onValidate: (field: string, value: any) => void;
}