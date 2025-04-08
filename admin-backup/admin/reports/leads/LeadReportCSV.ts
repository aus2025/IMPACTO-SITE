import { Lead } from "@/app/admin/leads/page"
import { format } from "date-fns"

/**
 * Generate a CSV file from leads data
 */
export function generateLeadsCSV(leads: Lead[]): string {
  // Define CSV headers
  const headers = [
    'ID',
    'Name',
    'Email',
    'Phone',
    'Service Interest',
    'Source',
    'Status',
    'Created Date',
    'Last Updated',
    'Country',
    'Company',
    'Position',
    'Message'
  ]
  
  // Convert leads to CSV rows
  const rows = leads.map(lead => [
    lead.id,
    lead.name,
    lead.email,
    lead.phone || '',
    lead.service_interest || '',
    lead.source || '',
    lead.status || 'New',
    lead.created_at ? format(new Date(lead.created_at), 'yyyy-MM-dd HH:mm:ss') : '',
    lead.updated_at ? format(new Date(lead.updated_at), 'yyyy-MM-dd HH:mm:ss') : '',
    lead.country || '',
    lead.company || '',
    lead.position || '',
    (lead.message || '').replace(/"/g, '""').replace(/\n/g, ' ') // Escape quotes and remove newlines
  ])
  
  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => {
      // Wrap in quotes if the cell contains commas, quotes, or newlines
      if (typeof cell === 'string' && (cell.includes(',') || cell.includes('"') || cell.includes('\n'))) {
        return `"${cell}"`
      }
      return cell
    }).join(','))
  ].join('\n')
  
  return csvContent
}

/**
 * Download CSV data as a file
 */
export function downloadCSV(csvContent: string, filename: string): void {
  // Create a blob with the CSV data
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  
  // Create a link to download the blob
  const link = document.createElement('a')
  
  // Create a URL for the blob
  const url = URL.createObjectURL(blob)
  
  // Set the link properties
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  
  // Add the link to the DOM
  document.body.appendChild(link)
  
  // Click the link to download the file
  link.click()
  
  // Clean up
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Generate a summary metrics CSV for lead reports
 */
export function generateMetricsCSV(metrics: any, dateRange: { startDate: Date, endDate: Date }): string {
  const formattedStartDate = format(dateRange.startDate, 'yyyy-MM-dd')
  const formattedEndDate = format(dateRange.endDate, 'yyyy-MM-dd')
  
  // Basic metrics
  let csvContent = `"Leads Report Summary (${formattedStartDate} to ${formattedEndDate})"\n\n`
  
  // Add summary metrics
  csvContent += '"Metric","Value"\n'
  csvContent += `"Total Leads",${metrics.totalLeads}\n`
  csvContent += `"New Leads",${metrics.newLeads}\n`
  csvContent += `"Conversion Rate","${metrics.conversionRate}%"\n`
  csvContent += `"Average Response Time","${metrics.averageResponseTime} hours"\n\n`
  
  // Add source distribution
  csvContent += '"Source Distribution"\n'
  csvContent += '"Source","Count","Percentage"\n'
  
  const totalSources = metrics.sourceDistribution.reduce((sum: number, item: any) => sum + item.value, 0)
  
  metrics.sourceDistribution.forEach((source: any) => {
    const percentage = totalSources > 0 ? Math.round((source.value / totalSources) * 100) : 0
    csvContent += `"${source.name}",${source.value},"${percentage}%"\n`
  })
  
  csvContent += '\n'
  
  // Add service distribution
  csvContent += '"Service Interest Distribution"\n'
  csvContent += '"Service","Count","Percentage"\n'
  
  const totalServices = metrics.serviceDistribution.reduce((sum: number, item: any) => sum + item.value, 0)
  
  metrics.serviceDistribution.forEach((service: any) => {
    const percentage = totalServices > 0 ? Math.round((service.value / totalServices) * 100) : 0
    csvContent += `"${service.name}",${service.value},"${percentage}%"\n`
  })
  
  return csvContent
}

/**
 * Export both detailed lead data and summary metrics
 */
export function exportLeadReports(
  leads: Lead[], 
  metrics: any, 
  dateRange: { startDate: Date, endDate: Date }
): void {
  const formattedDate = format(new Date(), 'yyyy-MM-dd')
  
  // Export detailed lead data
  const leadsCSV = generateLeadsCSV(leads)
  downloadCSV(leadsCSV, `impacto-leads-data-${formattedDate}.csv`)
  
  // Export summary metrics
  const metricsCSV = generateMetricsCSV(metrics, dateRange)
  downloadCSV(metricsCSV, `impacto-leads-metrics-${formattedDate}.csv`)
} 