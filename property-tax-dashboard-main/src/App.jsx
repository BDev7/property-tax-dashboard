import { useState } from "react";
import data from "./properties.json";

import Navbar from "./components/Navbar";
import KPISection from "./components/KPISection";
import TenantFilter from "./components/TenantFilter";
import Charts from "./components/Charts";
import AIChat from "./components/AIChat";

function App() {
  const [tenant, setTenant] = useState("All Cities");

  const filteredData =
    tenant === "All Cities"
      ? data
      : data.filter((item) => item.tenant === tenant);

  return (
  <div>
    <Navbar />

    <div className="p-6 bg-slate-900 min-h-screen">
      <TenantFilter
        tenant={tenant}
        setTenant={setTenant}
      />

      <KPISection data={filteredData} />

      <Charts
  data={data}
  filteredData={filteredData}
  tenant={tenant}
/>

      <AIChat data={data} />
    </div>

    <div className="text-center text-gray-500 py-6">
      Built using React, Recharts, Tailwind CSS and Gemini AI
    </div>
    </div>
);
}

export default App;