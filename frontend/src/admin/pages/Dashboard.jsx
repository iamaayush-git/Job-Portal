import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  return (
    <div className='w-[90vw] mx-auto min-h-screen flex items-start gap-10 pt-10 '>
      <div className=''><Sidebar /></div>
      <div className='flex-1'><Outlet /> </div>
    </div>
  )
}

export default Dashboard