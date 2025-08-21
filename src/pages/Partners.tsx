import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PartnersHero from "@/components/partners/PartnersHero";
import AuthorizedPartnersInfo from "@/components/partners/AuthorizedPartnersInfo";
import PartnersGrid from "@/components/partners/PartnersGrid";
import PartnerModal from "@/components/partners/PartnerModal";

export interface Partner {
  id: number;
  name: string;
  logo: string;
  region: string;
  type: string;
  // category?: string;
  phone: string;
  email: string;
  website: string;
}

const Partners = () => {
  const [selectedFilters] = useState({
    region: "All",
    type: "All",
    category: "All",
  });
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <PartnersHero />
      <AuthorizedPartnersInfo />
      <PartnersGrid
        selectedFilters={selectedFilters}
        onPartnerClick={setSelectedPartner}
      />
      <PartnerModal
        partner={selectedPartner}
        onClose={() => setSelectedPartner(null)}
      />
      <Footer />
    </div>
  );
};

export default Partners;
