import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts' 

export default function PerformanceChart({ data, subjects }) { 
    const COLORS = ['#2563EB','#16A34A','#D97706','#7C3AED','#DC2626'] 
    return 
    ( 
    <ResponsiveContainer width="100%" height={320}> 
    <LineChart data={data}> 
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /> 
        <XAxis dataKey="term" /> 
        <YAxis domain={[0,100]} unit="%"/> 
        <Tooltip formatter={(v)=>`${v.toFixed(1)}%`}/> 
            <Legend /> 
            {subjects.map((s, i) => ( <Line key={s} 
            type="monotone" dataKey={s} 
            stroke={COLORS[i % COLORS.length]} 
            strokeWidth={2} 
            dot={{ r:4 }} />
             ))} 
            </LineChart> 
            </ResponsiveContainer> 
            ) }