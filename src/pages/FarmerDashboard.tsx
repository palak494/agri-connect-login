import { useState } from "react";
import { Leaf, Package, QrCode, TrendingUp, DollarSign, Eye, Edit3, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function FarmerDashboard() {
  const [selectedTab, setSelectedTab] = useState("batches");

  const tabs = [
    { id: "batches", label: "My Batches", icon: Package },
    { id: "create", label: "Create Batch", icon: QrCode },
    { id: "payments", label: "Payments", icon: DollarSign },
    { id: "prices", label: "Market Prices", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Leaf className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">AgriChain Farmer</h1>
                <p className="text-sm text-muted-foreground">Manage your produce batches</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              👤 Profile
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    selectedTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent text-foreground"
                  }`}
                >
                  <Icon size={20} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {selectedTab === "batches" && <BatchesTab />}
            {selectedTab === "create" && <CreateBatchTab />}
            {selectedTab === "payments" && <PaymentsTab />}
            {selectedTab === "prices" && <PricesTab />}
          </div>
        </div>
      </div>
    </div>
  );
}

function BatchesTab() {
  const batches = [
    { id: "BCH001", crop: "Rice", quantity: "500 kg", status: "Ready", date: "2024-03-15" },
    { id: "BCH002", crop: "Wheat", quantity: "750 kg", status: "Transferred", date: "2024-03-10" },
    { id: "BCH003", crop: "Tomato", quantity: "200 kg", status: "In Storage", date: "2024-03-12" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">My Batches</h2>
      
      <div className="grid gap-4">
        {batches.map((batch) => (
          <Card key={batch.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-foreground">Batch ID: {batch.id}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${
                    batch.status === "Ready" ? "bg-nature-light text-nature" :
                    batch.status === "Transferred" ? "bg-harvest text-foreground" :
                    "bg-secondary text-secondary-foreground"
                  }`}>
                    {batch.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {batch.crop} • {batch.quantity} • Harvested: {batch.date}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye size={16} className="mr-1" />
                  View
                </Button>
                {batch.status === "Ready" && (
                  <>
                    <Button variant="outline" size="sm">
                      <Edit3 size={16} className="mr-1" />
                      Edit
                    </Button>
                    <Button variant="default" size="sm">
                      <Send size={16} className="mr-1" />
                      Transfer
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CreateBatchTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Create New Batch</h2>
      
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Crop Type</label>
            <input
              type="text"
              placeholder="Enter crop name"
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Quantity (kg)</label>
              <input
                type="number"
                placeholder="0"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Harvest Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Upload Photos</label>
            <input
              type="file"
              multiple
              accept="image/*"
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
            />
          </div>
          
          <Button className="w-full">
            <QrCode size={16} className="mr-2" />
            Generate Batch & QR Code
          </Button>
        </div>
      </Card>
    </div>
  );
}

function PaymentsTab() {
  const payments = [
    { batchId: "BCH002", buyer: "Green Valley Distributors", amount: "₹15,000", status: "Paid", date: "2024-03-10" },
    { batchId: "BCH001", buyer: "Farm Fresh Co.", amount: "₹12,500", status: "Pending", date: "2024-03-08" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Payment History</h2>
      
      <div className="grid gap-4">
        {payments.map((payment, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-medium text-foreground">Batch: {payment.batchId}</h3>
                <p className="text-sm text-muted-foreground">Buyer: {payment.buyer}</p>
                <p className="text-sm text-muted-foreground">Date: {payment.date}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">{payment.amount}</p>
                <span className={`px-2 py-1 rounded text-xs ${
                  payment.status === "Paid" ? "bg-nature-light text-nature" : "bg-harvest text-foreground"
                }`}>
                  {payment.status}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function PricesTab() {
  const prices = [
    { crop: "Rice", msp: "₹21/kg", market: "₹23/kg", trend: "up" },
    { crop: "Wheat", msp: "₹20/kg", market: "₹19/kg", trend: "down" },
    { crop: "Tomato", msp: "₹8/kg", market: "₹12/kg", trend: "up" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Market Prices</h2>
      
      <div className="grid gap-4">
        {prices.map((price, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-foreground">{price.crop}</h3>
                <p className="text-sm text-muted-foreground">MSP: {price.msp}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">{price.market}</p>
                <div className="flex items-center gap-1">
                  <TrendingUp 
                    size={16} 
                    className={price.trend === "up" ? "text-nature" : "text-destructive rotate-180"} 
                  />
                  <span className="text-sm text-muted-foreground">Market Rate</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}