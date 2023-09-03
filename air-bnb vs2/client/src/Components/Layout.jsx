import React, { useState } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

export default function Layout({ searchQuery, setSearchQuery }) {
  return (
    <div className="py-4 px-8 flex flex-col min-h-screen">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Outlet />
    </div>
  );
}
