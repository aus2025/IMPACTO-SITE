'use client'

import React from 'react'
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet,
  Image
} from '@react-pdf/renderer'
import { format } from 'date-fns'

// Types
import type { Lead } from '@/app/admin/leads/page'

interface LeadReportPDFProps {
  leads: Lead[]
  metrics: {
    totalLeads: number
    newLeads: number
    conversionRate: number
    averageResponseTime: number
    serviceDistribution: {name: string, value: number}[]
    sourceDistribution: {name: string, value: number}[]
  }
  dateRange: {
    startDate: Date
    endDate: Date
  }
  timeSeriesData: any[]
}

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30
  },
  header: {
    marginBottom: 20,
    borderBottom: '1px solid #4f46e5',
    paddingBottom: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 10
  },
  section: {
    marginTop: 20,
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: 5
  },
  metricsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 15
  },
  metricCard: {
    width: '48%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f3f4f6',
    borderRadius: 5
  },
  metricTitle: {
    fontSize: 12,
    color: '#4b5563',
    marginBottom: 5
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827'
  },
  metricSubtitle: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 5
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    borderBottomStyle: 'solid',
    paddingBottom: 5,
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 12,
    color: '#374151'
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    borderBottomStyle: 'solid',
    paddingBottom: 5,
    paddingTop: 5,
    fontSize: 10,
    color: '#4b5563'
  },
  col10: { width: '10%' },
  col15: { width: '15%' },
  col20: { width: '20%' },
  col25: { width: '25%' },
  col30: { width: '30%' },
  col40: { width: '40%' },
  chart: {
    marginTop: 10,
    marginBottom: 15,
    height: 200,
    backgroundColor: '#f9fafb',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  chartText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center'
  },
  distributionSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
  },
  distributionItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    fontSize: 10
  },
  colorBox: {
    width: 10,
    height: 10,
    marginRight: 5
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#9ca3af',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    borderTopStyle: 'solid',
    paddingTop: 10
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    fontSize: 10,
    color: '#9ca3af'
  }
})

// Sample chart colors (these won't show in the actual PDF)
const COLORS = ['#4f46e5', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899']

const LeadReportPDF = ({ leads, metrics, dateRange, timeSeriesData }: LeadReportPDFProps) => {
  const formattedStartDate = format(dateRange.startDate, 'MMMM d, yyyy')
  const formattedEndDate = format(dateRange.endDate, 'MMMM d, yyyy')
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Lead Analytics Report</Text>
          <Text style={styles.subtitle}>
            Period: {formattedStartDate} to {formattedEndDate}
          </Text>
          <Text style={styles.subtitle}>
            Generated on: {format(new Date(), 'MMMM d, yyyy')}
          </Text>
        </View>
        
        {/* Summary Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary Metrics</Text>
          <View style={styles.metricsWrapper}>
            <View style={styles.metricCard}>
              <Text style={styles.metricTitle}>Total Leads</Text>
              <Text style={styles.metricValue}>{metrics.totalLeads}</Text>
              <Text style={styles.metricSubtitle}>Total leads in selected period</Text>
            </View>
            
            <View style={styles.metricCard}>
              <Text style={styles.metricTitle}>New Leads</Text>
              <Text style={styles.metricValue}>{metrics.newLeads}</Text>
              <Text style={styles.metricSubtitle}>New leads in selected period</Text>
            </View>
            
            <View style={styles.metricCard}>
              <Text style={styles.metricTitle}>Conversion Rate</Text>
              <Text style={styles.metricValue}>{metrics.conversionRate}%</Text>
              <Text style={styles.metricSubtitle}>Lead to qualified conversion</Text>
            </View>
            
            <View style={styles.metricCard}>
              <Text style={styles.metricTitle}>Avg. Response Time</Text>
              <Text style={styles.metricValue}>{metrics.averageResponseTime} hrs</Text>
              <Text style={styles.metricSubtitle}>Time to first contact</Text>
            </View>
          </View>
        </View>
        
        {/* Lead Sources */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lead Sources</Text>
          <Text style={{ fontSize: 12, marginBottom: 10, color: '#4b5563' }}>
            Distribution of leads by acquisition channel
          </Text>
          
          {/* Chart representation (simplified for PDF) */}
          <View style={styles.distributionSection}>
            {metrics.sourceDistribution.map((source, index) => {
              const total = metrics.sourceDistribution.reduce((sum, item) => sum + item.value, 0)
              const percentage = total > 0 ? Math.round((source.value / total) * 100) : 0
              
              return (
                <View key={index} style={styles.distributionItem}>
                  <View
                    style={{
                      ...styles.colorBox,
                      backgroundColor: COLORS[index % COLORS.length]
                    }}
                  />
                  <Text>
                    {source.name}: {source.value} ({percentage}%)
                  </Text>
                </View>
              )
            })}
          </View>
        </View>
        
        {/* Service Interests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Interests</Text>
          <Text style={{ fontSize: 12, marginBottom: 10, color: '#4b5563' }}>
            Types of services leads are interested in
          </Text>
          
          <View style={styles.distributionSection}>
            {metrics.serviceDistribution.map((service, index) => {
              const total = metrics.serviceDistribution.reduce((sum, item) => sum + item.value, 0)
              const percentage = total > 0 ? Math.round((service.value / total) * 100) : 0
              
              return (
                <View key={index} style={styles.distributionItem}>
                  <View
                    style={{
                      ...styles.colorBox,
                      backgroundColor: COLORS[(index + 3) % COLORS.length]
                    }}
                  />
                  <Text>
                    {service.name}: {service.value} ({percentage}%)
                  </Text>
                </View>
              )
            })}
          </View>
        </View>
        
        {/* Lead List (Top 10) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Leads (Top 10)</Text>
          
          <View style={styles.tableHeader}>
            <Text style={styles.col20}>Name</Text>
            <Text style={styles.col30}>Email</Text>
            <Text style={styles.col20}>Service Interest</Text>
            <Text style={styles.col15}>Status</Text>
            <Text style={styles.col15}>Date</Text>
          </View>
          
          {leads.slice(0, 10).map((lead, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.col20}>{lead.name}</Text>
              <Text style={styles.col30}>{lead.email}</Text>
              <Text style={styles.col20}>{lead.service_interest || 'Not specified'}</Text>
              <Text style={styles.col15}>{lead.status || 'New'}</Text>
              <Text style={styles.col15}>
                {format(new Date(lead.created_at), 'MMM d, yyyy')}
              </Text>
            </View>
          ))}
        </View>
        
        {/* Footer */}
        <View style={styles.footer}>
          <Text>Impacto Lead Analytics Report • Confidential</Text>
        </View>
        
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>
    </Document>
  )
}

export default LeadReportPDF 