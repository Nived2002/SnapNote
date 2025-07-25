import { PlusIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'

const NavBar = () => {
  return (
    <motion.header
      className='bg-base-300 border-b border-base-content/10'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.3 }}
    >
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tighter">
            SnapNote
          </h1>
          <div>
            <Link to={"/create"} className="btn btn-primary">
              <PlusIcon className='size-5' />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default NavBar
