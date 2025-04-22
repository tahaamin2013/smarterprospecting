"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  TrendingUp,
  PhoneCall,
  Calendar,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Calculator,
} from "lucide-react"
import { ChangeEvent } from 'react';
export default function SalesCalculatorPage() {
  // Form inputs with default values
  const [formData, setFormData] = useState({
    marketingSpend: 80000,
    leads: 745,
    inboundCalls: 197,
    missedCalls: 0,
    appointments: 89,
    sales: 35,
    averageSale: 12000,
    newLTA: 25,
  })

  // Calculated results
  const [results, setResults] = useState({
    // Current metrics
    currentMonthlyRevenue: 0,
    monthlyMissedCallRevenue: 0,
    leadToAppointmentRatio: 0,
    costPerLead: 0,
    costPerAppointment: 0,
    costPerSale: 0,
    salesClosingRatio: 0,
    valuePerCall: 0,
    valuePerAppointment: 0,

    // New metrics
    increasedAppointmentsTotal: 0,
    increasedSalesTotal: 0,
    totalNewAppointments: 0,
    totalNewSales: 0,
    lowerCostPerSale: 0,
    lowerCostPerAppointment: 0,
    savedPerSale: 0,
    savedPerAppointment: 0,
    missedCallsRecovered: 0,
    newMonthlyRevenue: 0,
    revenueIncreaseMonthly: 0,
    revenueIncreaseYearly: 0,
    revenueIncreasePercent: 0,
  })

  // Calculate all results when form data changes
  useEffect(() => {
    calculateResults()
  }, [formData])

  const calculateResults = () => {
    const { marketingSpend, leads,  missedCalls, appointments, sales, averageSale, newLTA } = formData

    // Current metrics calculations
    const currentMonthlyRevenue = sales * averageSale
    const leadToAppointmentRatio = leads === 0 ? 0 : appointments / leads
    const costPerLead = leads === 0 ? 0 : marketingSpend / leads
    const costPerAppointment = appointments === 0 ? 0 : marketingSpend / appointments
    const costPerSale = sales === 0 ? 0 : marketingSpend / sales
    const salesClosingRatio = appointments === 0 ? 0 : sales / appointments
    const valuePerCall = salesClosingRatio * averageSale * leadToAppointmentRatio
    const monthlyMissedCallRevenue = missedCalls * valuePerCall
    const valuePerAppointment = salesClosingRatio * averageSale

    // New metrics calculations
    const increasedAppointmentsTotal = (newLTA / 100) * leads
    const increasedSalesTotal = increasedAppointmentsTotal * salesClosingRatio
    const totalNewAppointments = appointments - increasedAppointmentsTotal
    const totalNewSales = increasedSalesTotal - sales
    const lowerCostPerSale = increasedSalesTotal === 0 ? 0 : marketingSpend / increasedSalesTotal
    const lowerCostPerAppointment = increasedAppointmentsTotal === 0 ? 0 : marketingSpend / increasedAppointmentsTotal
    const savedPerSale = costPerSale - lowerCostPerSale
    const savedPerAppointment = costPerAppointment - lowerCostPerAppointment
    const missedCallsRecovered = missedCalls * valuePerCall
    const newMonthlyRevenue = averageSale * increasedSalesTotal + missedCallsRecovered
    const revenueIncreaseMonthly = newMonthlyRevenue - currentMonthlyRevenue
    const revenueIncreaseYearly = revenueIncreaseMonthly * 12
    const revenueIncreasePercent =
      currentMonthlyRevenue === 0 ? 0 : (newMonthlyRevenue - currentMonthlyRevenue) / currentMonthlyRevenue

    setResults({
      currentMonthlyRevenue,
      monthlyMissedCallRevenue,
      leadToAppointmentRatio,
      costPerLead,
      costPerAppointment,
      costPerSale,
      salesClosingRatio,
      valuePerCall,
      valuePerAppointment,
      increasedAppointmentsTotal,
      increasedSalesTotal,
      totalNewAppointments,
      totalNewSales,
      lowerCostPerSale,
      lowerCostPerAppointment,
      savedPerSale,
      savedPerAppointment,
      missedCallsRecovered,
      newMonthlyRevenue,
      revenueIncreaseMonthly,
      revenueIncreaseYearly,
      revenueIncreasePercent,
    })
  }



  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: Number(value) || 0,
    });
  }
  
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  }
  
  const formatPercent = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <header className="bg-white shadow-md py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-amber-700">SMARTER Prospecting ROI Calculator</h1>
          <p className="text-gray-600 mt-2">
            See How Much More You&apos;d Make From Your &apos;Front End Sales&apos; If You Converted More Leads To Appointments!
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="form" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="form" className="text-lg py-3">
              <Calculator className="mr-2 h-5 w-5" />
              Input Your Data
            </TabsTrigger>
            <TabsTrigger value="results" className="text-lg py-3">
              <BarChart3 className="mr-2 h-5 w-5" />
              View Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form">
            <Card className="border-2 border-amber-200 shadow-lg">
              <CardHeader className="bg-amber-50">
                <CardTitle className="text-2xl text-center">Step 1: Fill All Fields Below</CardTitle>
                <CardDescription className="text-center text-lg">
                  Enter your current business metrics to calculate your potential revenue increase
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="marketingSpend" className="text-base font-medium">
                        Monthly Marketing Spend
                      </Label>
                      <div className="relative mt-1">
                        <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="marketingSpend"
                          name="marketingSpend"
                          type="number"
                          value={formData.marketingSpend}
                          onChange={handleInputChange}
                          className="pl-10 bg-amber-50"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="leads" className="text-base font-medium">
                        Leads
                      </Label>
                      <Input
                        id="leads"
                        name="leads"
                        type="number"
                        value={formData.leads}
                        onChange={handleInputChange}
                        className="bg-amber-50"
                      />
                    </div>

                    <div>
                      <Label htmlFor="inboundCalls" className="text-base font-medium">
                        # of Inbound Calls per mo
                      </Label>
                      <div className="relative mt-1">
                        <PhoneCall className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="inboundCalls"
                          name="inboundCalls"
                          type="number"
                          value={formData.inboundCalls}
                          onChange={handleInputChange}
                          className="pl-10 bg-amber-50"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="missedCalls" className="text-base font-medium">
                        Missed Calls per mo (vm, after hours, etc)
                      </Label>
                      <div className="relative mt-1">
                        <PhoneCall className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="missedCalls"
                          name="missedCalls"
                          type="number"
                          value={formData.missedCalls}
                          onChange={handleInputChange}
                          className="pl-10 bg-amber-50"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="appointments" className="text-base font-medium">
                        Appointments
                      </Label>
                      <div className="relative mt-1">
                        <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="appointments"
                          name="appointments"
                          type="number"
                          value={formData.appointments}
                          onChange={handleInputChange}
                          className="pl-10 bg-amber-50"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="sales" className="text-base font-medium">
                        Sales
                      </Label>
                      <div className="relative mt-1">
                        <CheckCircle className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="sales"
                          name="sales"
                          type="number"
                          value={formData.sales}
                          onChange={handleInputChange}
                          className="pl-10 bg-amber-50"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="averageSale" className="text-base font-medium">
                        Average Sale
                      </Label>
                      <div className="relative mt-1">
                        <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="averageSale"
                          name="averageSale"
                          type="number"
                          value={formData.averageSale}
                          onChange={handleInputChange}
                          className="pl-10 bg-amber-50"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="newLTA" className="text-base font-medium">
                        NEW LTA% (Lead to Appointment Ratio)
                      </Label>
                      <div className="relative mt-1">
                        <TrendingUp className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="newLTA"
                          name="newLTA"
                          type="number"
                          value={formData.newLTA}
                          onChange={handleInputChange}
                          className="pl-10 bg-amber-50"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <Button
                    onClick={() => {
                      const resultsTab = document.querySelector('[data-value="results"]');
                      if (resultsTab instanceof HTMLElement) resultsTab.click();
                    }}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-2 text-lg"
                  >
                    Calculate Results <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results">
            <Card className="border-2 border-amber-200 shadow-lg mb-8">
              <CardHeader className="bg-amber-50">
                <CardTitle className="text-2xl text-center">Your Results</CardTitle>
                <CardDescription className="text-center text-lg">
                  See how much more you could make by improving your lead-to-appointment ratio
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Current Numbers */}
                  <Card className="border-amber-200">
                    <CardHeader className="bg-amber-50 pb-2">
                      <CardTitle>Your Current Numbers</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Current Monthly Revenue:</span>
                          <span className="font-semibold">{formatCurrency(results.currentMonthlyRevenue)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Monthly Missed Call Revenue:</span>
                          <span className="font-semibold">{formatCurrency(results.monthlyMissedCallRevenue)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Lead to Appointment Ratio:</span>
                          <span className="font-semibold">{formatPercent(results.leadToAppointmentRatio)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Cost Per Lead:</span>
                          <span className="font-semibold">{formatCurrency(results.costPerLead)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Cost Per Appointment:</span>
                          <span className="font-semibold">{formatCurrency(results.costPerAppointment)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Cost Per Sale:</span>
                          <span className="font-semibold">{formatCurrency(results.costPerSale)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Sales Closing Ratio:</span>
                          <span className="font-semibold">{formatPercent(results.salesClosingRatio)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Value Per Call:</span>
                          <span className="font-semibold">{formatCurrency(results.valuePerCall)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Value Per Appointment:</span>
                          <span className="font-semibold">{formatCurrency(results.valuePerAppointment)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Improved Numbers */}
                  <Card className="border-green-200">
                    <CardHeader className="bg-green-50 pb-2">
                      <CardTitle>Your IMPROVED Numbers</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">NEW LTA%:</span>
                          <span className="font-semibold text-green-600">{formData.newLTA}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">INCREASED APPOINTMENTS (Total):</span>
                          <span className="font-semibold text-green-600">
                            {Math.round(results.increasedAppointmentsTotal)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">INCREASED Sales (Total):</span>
                          <span className="font-semibold text-green-600">
                            {Math.round(results.increasedSalesTotal)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">LOWER Cost Per Sales:</span>
                          <span className="font-semibold text-green-600">
                            {formatCurrency(results.lowerCostPerSale)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Saved per Sale:</span>
                          <span className="font-semibold text-green-600">{formatCurrency(results.savedPerSale)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">LOWER Cost Per Appointment:</span>
                          <span className="font-semibold text-green-600">
                            {formatCurrency(results.lowerCostPerAppointment)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Saved per Appointment:</span>
                          <span className="font-semibold text-green-600">
                            {formatCurrency(results.savedPerAppointment)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total New Appointments:</span>
                          <span className="font-semibold text-green-600">
                            {Math.round(Math.abs(results.totalNewAppointments))}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total New Sales:</span>
                          <span className="font-semibold text-green-600">
                            {Math.round(Math.abs(results.totalNewSales))}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Revenue Impact */}
                  <Card className="border-green-200">
                    <CardHeader className="bg-green-50 pb-2">
                      <CardTitle>Revenue Impact</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Current Monthly Revenue:</span>
                          <span className="font-semibold">{formatCurrency(results.currentMonthlyRevenue)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">New Monthly Revenue:</span>
                          <span className="font-semibold text-green-600">
                            {formatCurrency(results.newMonthlyRevenue)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">100% Missed Calls Recovered:</span>
                          <span className="font-semibold text-green-600">
                            {formatCurrency(results.missedCallsRecovered)}
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                          <span className="text-gray-700 font-medium">Revenue Increase (Monthly):</span>
                          <span className="font-bold text-green-600">
                            {formatCurrency(results.revenueIncreaseMonthly)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700 font-medium">Revenue Increase (Yearly):</span>
                          <span className="font-bold text-green-600">
                            {formatCurrency(results.revenueIncreaseYearly)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700 font-medium">Revenue Increase %:</span>
                          <span className="font-bold text-green-600">
                            {formatPercent(results.revenueIncreasePercent)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500 text-center">
                        * These numbers do not include your New Back End Sales!
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Summary Card */}
                <Card className="mt-8 border-2 border-green-300 bg-green-50">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-white rounded-lg shadow">
                        <h3 className="text-lg font-medium text-gray-700">Monthly Increase</h3>
                        <p className="text-3xl font-bold text-green-600 mt-2">
                          {formatCurrency(results.revenueIncreaseMonthly)}
                        </p>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg shadow">
                        <h3 className="text-lg font-medium text-gray-700">Yearly Increase</h3>
                        <p className="text-3xl font-bold text-green-600 mt-2">
                          {formatCurrency(results.revenueIncreaseYearly)}
                        </p>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg shadow">
                        <h3 className="text-lg font-medium text-gray-700">Percentage Increase</h3>
                        <p className="text-3xl font-bold text-green-600 mt-2">
                          {formatPercent(results.revenueIncreasePercent)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-8 text-center">
                  <Button
                    onClick={() => {
                      const formTab = document.querySelector('[data-value="form"]');
                      if (formTab instanceof HTMLElement) formTab.click();
                    }}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-2 text-lg"
                  >
                    Modify Your Data
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-amber-600 text-white">
              <CardContent className="pt-6 pb-6 text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to Boost Your Revenue?</h2>
                <p className="text-lg mb-6">For SUPERIOR Increased Sales Results, contact us today!</p>
                <Button className="bg-white text-amber-600 hover:bg-amber-50 text-lg px-8 py-2">
                  Visit SMARTERProspecting.com
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-gray-100 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} SMARTER Prospecting. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
