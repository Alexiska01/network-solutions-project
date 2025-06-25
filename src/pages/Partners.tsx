import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PartnersHero from "@/components/partners/PartnersHero";

import PartnersFilters from "@/components/partners/PartnersFilters";
import PartnersGrid from "@/components/partners/PartnersGrid";
import PartnerModal from "@/components/partners/PartnerModal";

export interface Partner {
  id: number;
  name: string;
  logo: string;
  region: string;
  type: string;
  category: string;
  phone: string;
  email: string;
  website: string;
}

const Partners = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    region: "All",
    type: "All",
    category: "All",
  });
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  return (
    <div className="min-h-screen">
      <Header />
      <PartnersHero />
      <PartnersFilters
        selectedFilters={selectedFilters}
        onFilterChange={setSelectedFilters}
      />
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
