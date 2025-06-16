import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  return (
    <div className='w-[90vw] mx-auto min-h-screen flex flex-col py-5 md:flex-row md:items-start md:gap-10 md:pt-10 '>
      <div className='ml-auto'><Sidebar /></div>
      <div className='flex-1'><Outlet /> </div>
    </div>
  )
}

export default Dashboard