import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {motion} from "framer-motion"
import { CheckCircle2 } from 'lucide-react'

function Checkout() {
    const navigate= useNavigate();
    const location = useLocation();

      const refId = location.state?.refId || `REF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;


  return (
     <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 150 }}
        className="text-green-500 mb-4"
      >
        <CheckCircle2 size={80} />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-semibold text-gray-800 mb-2"
      >
        Booking Confirmed
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-500 mb-6"
      >
        Ref ID: <span className="font-mono text-gray-700">{refId}</span>
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        className="px-6 py-2 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition"
      >
        Back to Home
      </motion.button>
    </div>
  
  )
}

export default Checkout