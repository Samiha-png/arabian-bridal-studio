import { motion } from 'framer-motion';

export default function AnnouncementBar() {
  return (
    <motion.div
      className="announcement"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      Private consultations by appointment · Worldwide shipping · Frontend demo
    </motion.div>
  );
}