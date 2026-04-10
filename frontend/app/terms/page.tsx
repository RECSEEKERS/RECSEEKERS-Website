import legalContent from "@/content/legal.en.json";
import { LegalPageTemplate } from "@/components/legal/LegalPageTemplate";

export default function TermsPage() {
  return <LegalPageTemplate section="terms" content={legalContent} />;
}
