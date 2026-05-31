import { motion } from "framer-motion";
function KPICard({ title, value, color }) {
  return (
    <div className={`${color} p-6 rounded-xl shadow-md text-white hover:scale-105 transition-all duration-300 cursor-pointer`}>
      <h2 className="text-lg font-medium opacity-90">
        {title}
      </h2>

      <p className="text-4xl font-extrabold mt-3">
        {value}
      </p>
      <motion.div
  whileHover={{ scale: 1.05 }}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  className={`${color} p-6 rounded-xl shadow-md text-white`}
></motion.div>
    </div>
  );
}

export default KPICard;