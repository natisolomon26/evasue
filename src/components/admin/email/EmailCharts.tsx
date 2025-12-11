"use client";

import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
  Legend,
  ReferenceLine,
  Brush
} from "recharts";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  BarChart3, 
  PieChart as PieChartIcon, 
  Activity,
  Download,
  Filter,
  Calendar,
  Eye,
  EyeOff
} from "lucide-react";

interface EmailChartProps {
  data: { date: string; sent: number; opens?: number; clicks?: number; bounce?: number }[];
}

type ChartType = 'line' | 'bar' | 'area' | 'pie';
type TimeRange = '7d' | '30d' | '90d' | 'all';

export default function EmailChart({ data }: EmailChartProps) {
  const [chartType, setChartType] = useState<ChartType>('line');
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [visibleSeries, setVisibleSeries] = useState({
    sent: true,
    opens: true,
    clicks: true,
    bounce: false
  });

  // Process data based on time range
  const processedData = useMemo(() => {
    const now = new Date();
    let filteredData = [...data];

    if (timeRange === '7d') {
      const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
      filteredData = data.filter(d => new Date(d.date) >= sevenDaysAgo);
    } else if (timeRange === '30d') {
      const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
      filteredData = data.filter(d => new Date(d.date) >= thirtyDaysAgo);
    } else if (timeRange === '90d') {
      const ninetyDaysAgo = new Date(now.setDate(now.getDate() - 90));
      filteredData = data.filter(d => new Date(d.date) >= ninetyDaysAgo);
    }

    // Group by date for aggregated view
    const groupedData = filteredData.reduce((acc, curr) => {
      const dateKey = curr.date.split(' ')[0]; // Just date part
      if (!acc[dateKey]) {
        acc[dateKey] = { date: dateKey, sent: 0, opens: 0, clicks: 0, bounce: 0 };
      }
      acc[dateKey].sent += curr.sent || 0;
      acc[dateKey].opens += curr.opens || 0;
      acc[dateKey].clicks += curr.clicks || 0;
      acc[dateKey].bounce += curr.bounce || 0;
      return acc;
    }, {} as Record<string, any>);

    return Object.values(groupedData).slice(-15); // Last 15 days
  }, [data, timeRange]);

  // Calculate totals for summary
  const summary = useMemo(() => {
    const totals = processedData.reduce((acc, curr) => {
      acc.sent += curr.sent;
      acc.opens += curr.opens;
      acc.clicks += curr.clicks;
      acc.bounce += curr.bounce;
      return acc;
    }, { sent: 0, opens: 0, clicks: 0, bounce: 0 });

    return {
      ...totals,
      openRate: totals.sent > 0 ? ((totals.opens / totals.sent) * 100).toFixed(1) : '0.0',
      clickRate: totals.opens > 0 ? ((totals.clicks / totals.opens) * 100).toFixed(1) : '0.0',
      bounceRate: totals.sent > 0 ? ((totals.bounce / totals.sent) * 100).toFixed(1) : '0.0'
    };
  }, [processedData]);

  // Colors for charts
  const COLORS = {
    sent: '#3b82f6',     // Blue
    opens: '#10b981',    // Emerald
    clicks: '#8b5cf6',   // Violet
    bounce: '#ef4444',   // Red
    grid: '#f1f5f9',
    tooltip: '#ffffff'
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-2xl p-4">
          <p className="text-sm font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4 mb-1 last:mb-0">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {entry.dataKey}
                </span>
              </div>
              <span className="text-sm font-bold text-gray-900">
                {entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Chart components based on type
  const renderChart = () => {
    const commonProps = {
      data: processedData,
      margin: { top: 20, right: 30, left: 20, bottom: 10 }
    };

    switch (chartType) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} vertical={false} />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis 
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              height={36}
              iconType="circle"
              formatter={(value) => (
                <span className="text-sm font-medium text-gray-700 capitalize">{value}</span>
              )}
            />
            <ReferenceLine y={0} stroke="#e2e8f0" />
            {visibleSeries.sent && (
              <Line
                type="monotone"
                dataKey="sent"
                stroke={COLORS.sent}
                strokeWidth={3}
                dot={{ fill: COLORS.sent, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: COLORS.sent }}
                name="Sent"
              />
            )}
            {visibleSeries.opens && (
              <Line
                type="monotone"
                dataKey="opens"
                stroke={COLORS.opens}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: COLORS.opens, strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5, fill: COLORS.opens }}
                name="Opens"
              />
            )}
            {visibleSeries.clicks && (
              <Line
                type="monotone"
                dataKey="clicks"
                stroke={COLORS.clicks}
                strokeWidth={2}
                dot={{ fill: COLORS.clicks, strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5, fill: COLORS.clicks }}
                name="Clicks"
              />
            )}
            <Brush dataKey="date" height={30} stroke={COLORS.sent} />
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} vertical={false} />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis 
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              height={36}
              formatter={(value) => (
                <span className="text-sm font-medium text-gray-700 capitalize">{value}</span>
              )}
            />
            {visibleSeries.sent && (
              <Bar 
                dataKey="sent" 
                fill={COLORS.sent} 
                name="Sent"
                radius={[4, 4, 0, 0]}
              />
            )}
            {visibleSeries.opens && (
              <Bar 
                dataKey="opens" 
                fill={COLORS.opens} 
                name="Opens"
                radius={[4, 4, 0, 0]}
              />
            )}
            {visibleSeries.clicks && (
              <Bar 
                dataKey="clicks" 
                fill={COLORS.clicks} 
                name="Clicks"
                radius={[4, 4, 0, 0]}
              />
            )}
          </BarChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.sent} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={COLORS.sent} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorOpens" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.opens} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={COLORS.opens} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} vertical={false} />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis 
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              height={36}
              formatter={(value) => (
                <span className="text-sm font-medium text-gray-700 capitalize">{value}</span>
              )}
            />
            {visibleSeries.sent && (
              <Area
                type="monotone"
                dataKey="sent"
                stroke={COLORS.sent}
                fill="url(#colorSent)"
                strokeWidth={2}
                name="Sent"
              />
            )}
            {visibleSeries.opens && (
              <Area
                type="monotone"
                dataKey="opens"
                stroke={COLORS.opens}
                fill="url(#colorOpens)"
                strokeWidth={2}
                name="Opens"
              />
            )}
            <Brush dataKey="date" height={30} stroke={COLORS.sent} />
          </AreaChart>
        );

      case 'pie':
        const pieData = [
          { name: 'Sent', value: summary.sent, color: COLORS.sent },
          { name: 'Opened', value: summary.opens, color: COLORS.opens },
          { name: 'Clicked', value: summary.clicks, color: COLORS.clicks },
          { name: 'Bounced', value: summary.bounce, color: COLORS.bounce }
        ].filter(item => item.value > 0);

        return (
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [value.toLocaleString(), 'Emails']}
              contentStyle={{
                backgroundColor: COLORS.tooltip,
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value) => (
                <span className="text-sm font-medium text-gray-700">{value}</span>
              )}
            />
          </PieChart>
        );
    }
  };

  // Toggle series visibility
  const toggleSeries = (series: keyof typeof visibleSeries) => {
    setVisibleSeries(prev => ({ ...prev, [series]: !prev[series] }));
  };

  // Download chart as image
  const handleDownload = () => {
    // This would require html2canvas or similar library
    console.log('Download chart functionality');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Email Campaign Analytics</h3>
            </div>
            <p className="text-gray-600">Track performance metrics across all campaigns</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Chart Type Selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Chart Type:</span>
            <div className="flex bg-white border border-gray-200 rounded-lg p-1">
              {[
                { type: 'line' as ChartType, icon: TrendingUp, label: 'Line' },
                { type: 'bar' as ChartType, icon: BarChart3, label: 'Bar' },
                { type: 'area' as ChartType, icon: Activity, label: 'Area' },
                { type: 'pie' as ChartType, icon: PieChartIcon, label: 'Pie' }
              ].map(({ type, icon: Icon, label }) => (
                <button
                  key={type}
                  onClick={() => setChartType(type)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all ${
                    chartType === type
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <div className="flex bg-white border border-gray-200 rounded-lg p-1">
              {['7d', '30d', '90d', 'all'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range as TimeRange)}
                  className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                    timeRange === range
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {range.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Series Toggles */}
        <div className="flex flex-wrap items-center gap-3 mt-4">
          <span className="text-sm font-medium text-gray-700">Show/Hide:</span>
          {Object.entries(visibleSeries).map(([key, isVisible]) => (
            <button
              key={key}
              onClick={() => toggleSeries(key as keyof typeof visibleSeries)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                isVisible
                  ? 'bg-white border border-gray-200 shadow-sm'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {isVisible ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
              <span className="text-sm font-medium capitalize">{key}</span>
              <div 
                className="w-3 h-3 rounded-full"
                style={{ 
                  backgroundColor: COLORS[key as keyof typeof COLORS] || '#9ca3af' 
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Sent', value: summary.sent, change: '+12%', color: COLORS.sent },
            { label: 'Open Rate', value: `${summary.openRate}%`, change: '+2.5%', color: COLORS.opens },
            { label: 'Click Rate', value: `${summary.clickRate}%`, change: '+1.8%', color: COLORS.clicks },
            { label: 'Bounce Rate', value: `${summary.bounceRate}%`, change: '-0.5%', color: COLORS.bounce }
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </div>
              </div>
              <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full"
                  style={{ 
                    width: stat.label.includes('Rate') 
                      ? `${parseFloat(stat.value)}%` 
                      : '100%',
                    backgroundColor: stat.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chart */}
      <div className="px-6 py-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>
            Last updated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span>Data is aggregated daily</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}