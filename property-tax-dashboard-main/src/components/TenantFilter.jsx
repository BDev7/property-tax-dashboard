import data from "../properties.json";

function TenantFilter({ tenant, setTenant }) {
  const tenants = [
    "All Cities",
    ...new Set(data.map((item) => item.tenant)),
  ];

  return (
    <div className="mb-6">
      <select
        value={tenant}
        onChange={(e) => setTenant(e.target.value)}
        className="p-3 border rounded-lg"
      >
        {tenants.map((city) => (
          <option key={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TenantFilter;