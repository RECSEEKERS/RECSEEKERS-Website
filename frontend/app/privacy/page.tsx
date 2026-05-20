import legalContent from "@/content/legal.en.json";
import { LegalPageTemplate } from "@/components/legal/LegalPageTemplate";

export default function PrivacyPage() {
  return <LegalPageTemplate section="privacy" content={legalContent} />;
}
