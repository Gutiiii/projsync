'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import AdminNavMobile from './AdminNavMobile';

const AdminHamburger = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleToggle = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="h-full">
      <Menu width={30} height={30} onClick={handleToggle} />
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <AdminNavMobile onClose={handleToggle} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminHamburger;
