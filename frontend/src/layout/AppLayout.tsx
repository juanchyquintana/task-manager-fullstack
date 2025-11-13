import { Outlet } from 'react-router-dom'
import Navbar from '../components/commons/Navbar'
import Footer from '../components/commons/Footer'

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white">
      <Navbar />

      <main className="flex-1 container mx-auto py-[100px]">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
