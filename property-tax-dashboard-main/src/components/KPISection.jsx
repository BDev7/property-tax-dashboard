import KPICard from "./KPICard";

function KPISection({ data }) {
  const pending = data.filter(
  (item) => item.status === "Pending"
  ).length;
  const totalProperties = data.length;

  const approved = data.filter(
    (item) => item.status === "Approved"
  ).length;

  const rejected = data.filter(
    (item) => item.status === "Rejected"
  ).length;

  const totalCollection = data.reduce(
    (acc, item) => acc + item.collection_inr,
    0
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      <KPICard
  title="Total Properties"
  value={totalProperties}
  color="bg-blue-600"
/>

<KPICard
  title="Pending"
  value={pending}
  color="bg-yellow-500"
/>

<KPICard
  title="Approved"
  value={approved}
  color="bg-green-600"
/>

<KPICard
  title="Rejected"
  value={rejected}
  color="bg-red-500"
/>

<KPICard
  title="Collection"
  value={`₹${totalCollection.toLocaleString()}`}
  color="bg-purple-600"
/>
    </div>
  );
}

export default KPISection;