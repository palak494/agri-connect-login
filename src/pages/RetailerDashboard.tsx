import { useState } from "react";
import { Store, QrCode, DollarSign, AlertTriangle, History, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function RetailerDashboard() {
  const [selectedTab, setSelectedTab] = useState("inventory");

  const tabs = [
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "receive", label: "Receive Batch", icon: QrCode },
    { id: "pricing", label: "Pricing", icon: DollarSign },
    { id: "sales", label: "Sales", icon: Store },
    { id: "history", label: "Traceability", icon: History },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Store className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">AgriChain Retailer</h1>
                <p className="text-sm text-muted-foreground">Manage retail operations</p>
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
            {selectedTab === "inventory" && <InventoryTab />}
            {selectedTab === "receive" && <ReceiveTab />}
            {selectedTab === "pricing" && <PricingTab />}
            {selectedTab === "sales" && <SalesTab />}
            {selectedTab === "history" && <HistoryTab />}
          </div>
        </div>
      </div>
    </div>
  );
}

function InventoryTab() {
  const inventory = [
    { id: "BCH001", crop: "Rice", quantity: "500 kg", retailPrice: "₹25/kg", supplier: "Green Valley Distributors", received: "2024-03-15", status: "Available" },
    { id: "BCH002", crop: "Wheat", quantity: "750 kg", retailPrice: "₹22/kg", supplier: "Farm Fresh Co.", received: "2024-03-14", status: "Low Stock" },
    { id: "BCH003", crop: "Tomato", quantity: "200 kg", retailPrice: "₹15/kg", supplier: "Organic Distributors", received: "2024-03-13", status: "Sold Out" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Current Inventory</h2>
      
      <div className="grid gap-4">
        {inventory.map((batch) => (
          <Card key={batch.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-foreground">Batch ID: {batch.id}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${
                    batch.status === "Available" ? "bg-nature-light text-nature" :
                    batch.status === "Low Stock" ? "bg-harvest text-foreground" :
                    "bg-destructive/10 text-destructive"
                  }`}>
                    {batch.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {batch.crop} • {batch.quantity} • {batch.retailPrice}
                </p>
                <p className="text-xs text-muted-foreground">
                  From: {batch.supplier} • Received: {batch.received}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <History size={16} className="mr-1" />
                  View Timeline
                </Button>
                {batch.status !== "Sold Out" && (
                  <Button variant="default" size="sm">
                    Update Price
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ReceiveTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Receive New Batch</h2>
      
      <Card className="p-6">
        <div className="space-y-4">
          <div className="text-center">
            <QrCode size={64} className="mx-auto text-primary mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Scan QR Code</h3>
            <p className="text-muted-foreground">Scan the batch QR code to receive and verify details</p>
          </div>
          
          <div className="border-t border-border pt-4">
            <p className="text-sm text-muted-foreground mb-4">Or enter Batch ID manually:</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Batch ID"
                className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              />
              <Button>Verify</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Batch Details for Verification */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Batch Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Batch ID</label>
            <p className="text-sm text-muted-foreground">BCH001</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Crop</label>
            <p className="text-sm text-muted-foreground">Rice</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Quantity</label>
            <p className="text-sm text-muted-foreground">500 kg</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Quality Grade</label>
            <p className="text-sm text-muted-foreground">Grade A</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Distributor</label>
            <p className="text-sm text-muted-foreground">Green Valley Distributors</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Purchase Price</label>
            <p className="text-sm text-muted-foreground">₹20/kg</p>
          </div>
        </div>
        
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Actual Quantity Received (kg)</label>
            <input
              type="number"
              placeholder="500"
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
            />
          </div>
          
          <Button className="w-full">
            ✓ Confirm Receipt
          </Button>
        </div>
      </Card>
    </div>
  );
}

function PricingTab() {
  const pricingData = [
    { id: "BCH001", crop: "Rice", costPrice: "₹20/kg", currentRetailPrice: "₹25/kg", suggestedPrice: "₹26/kg", margin: "25%" },
    { id: "BCH002", crop: "Wheat", costPrice: "₹18/kg", currentRetailPrice: "₹22/kg", suggestedPrice: "₹23/kg", margin: "22%" },
    { id: "BCH003", crop: "Tomato", costPrice: "₹12/kg", currentRetailPrice: "₹15/kg", suggestedPrice: "₹16/kg", margin: "25%" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Pricing Management</h2>
      
      <div className="grid gap-4">
        {pricingData.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-medium text-foreground">{item.crop} - {item.id}</h3>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>Cost: {item.costPrice}</span>
                  <span>Current: {item.currentRetailPrice}</span>
                  <span>Suggested: {item.suggestedPrice}</span>
                  <span className="text-nature">Margin: {item.margin}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="New Price"
                  className="w-24 px-2 py-1 border border-border rounded text-sm bg-background text-foreground"
                />
                <Button size="sm">Update</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function SalesTab() {
  const salesData = [
    { id: "BCH001", crop: "Rice", totalQty: "500 kg", soldQty: "350 kg", remaining: "150 kg", revenue: "₹8,750" },
    { id: "BCH002", crop: "Wheat", totalQty: "750 kg", soldQty: "600 kg", remaining: "150 kg", revenue: "₹13,200" },
    { id: "BCH003", crop: "Tomato", totalQty: "200 kg", soldQty: "200 kg", remaining: "0 kg", revenue: "₹3,000" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Sales Tracking</h2>
      
      <div className="grid gap-4">
        {salesData.map((sale) => (
          <Card key={sale.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-medium text-foreground">{sale.crop} - {sale.id}</h3>
                <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                  <span>Total: {sale.totalQty}</span>
                  <span>Sold: {sale.soldQty}</span>
                  <span>Remaining: {sale.remaining}</span>
                </div>
                <p className="text-lg font-bold text-nature">Revenue: {sale.revenue}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Mark as Sold
                </Button>
                {sale.remaining !== "0 kg" && (
                  <Button variant="outline" size="sm">
                    <AlertTriangle size={16} className="mr-1" />
                    Report Issue
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function HistoryTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Batch Traceability</h2>
      
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Enter Batch ID</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Batch ID to view timeline"
                className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              />
              <Button>View Timeline</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Timeline Display */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Batch BCH001 Timeline</h3>
        
        <div className="space-y-4">
          <div className="flex gap-4 pb-4 border-b border-border">
            <div className="w-3 h-3 bg-primary rounded-full mt-1" />
            <div className="flex-1">
              <h4 className="font-medium text-foreground">Harvested</h4>
              <p className="text-sm text-muted-foreground">Farmer: Raj Kumar • Date: 15 Mar 2024</p>
              <p className="text-sm text-muted-foreground">Location: Village Rampur, Punjab</p>
            </div>
          </div>
          
          <div className="flex gap-4 pb-4 border-b border-border">
            <div className="w-3 h-3 bg-primary rounded-full mt-1" />
            <div className="flex-1">
              <h4 className="font-medium text-foreground">Quality Check</h4>
              <p className="text-sm text-muted-foreground">Distributor: Green Valley Distributors</p>
              <p className="text-sm text-muted-foreground">Grade: A • Certified Organic</p>
            </div>
          </div>
          
          <div className="flex gap-4 pb-4 border-b border-border">
            <div className="w-3 h-3 bg-primary rounded-full mt-1" />
            <div className="flex-1">
              <h4 className="font-medium text-foreground">Cold Storage</h4>
              <p className="text-sm text-muted-foreground">Duration: 2 days at 4°C</p>
              <p className="text-sm text-muted-foreground">Location: Central Cold Storage, Delhi</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-3 h-3 bg-nature rounded-full mt-1" />
            <div className="flex-1">
              <h4 className="font-medium text-foreground">Received at Retail</h4>
              <p className="text-sm text-muted-foreground">Fresh Mart Store • Today</p>
              <p className="text-sm text-muted-foreground">Ready for Sale</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}