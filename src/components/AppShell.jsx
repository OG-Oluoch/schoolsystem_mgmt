export default function AppShell() { 
    return ( 
    <div className="flex h-screen bg-gray-50"> 
    <Sidebar /> 
    <div className="flex-1 flex flex-col overflow-hidden"> 
        <Topbar /> 
        <main className="flex-1 overflow-auto p-6"> <Outlet /> 
        {/* child routes render here */} 
        </main> 
        </div> 
        </div> 
        ) 
    }