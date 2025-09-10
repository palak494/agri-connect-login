import { useState } from "react";
import { Truck, Package, QrCode, FileText, Archive, Split } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function DistributorDashboard() {
  const [selectedTab, setSelectedTab] = useState("inventory");

  const tabs = [
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "receive", label: "Receive Batch", icon: QrCode },
    { id: "storage", label: "Storage", icon: Archive },
    { id: "quality", label: "Quality Reports", icon: FileText },
    { id: "transfer", label: "Transfer", icon: Truck },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Truck className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">AgriChain Distributor</h1>
                <p className="text-sm text-muted-foreground">Manage supply chain operations</p>
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
            {selectedTab === "storage" && <StorageTab />}
            {selectedTab === "quality" && <QualityTab />}
            {selectedTab === "transfer" && <TransferTab />}
          </div>
        </div>
      </div>
    </div>
  );
}

function InventoryTab() {
  const inventory = [
    { id: "BCH001", crop: "Rice", quantity: "500 kg", farmer: "Raj Kumar", received: "2024-03-15", status: "In Storage" },
    { id: "BCH002", crop: "Wheat", quantity: "750 kg", farmer: "Sunita Devi", received: "2024-03-14", status: "Quality Check" },
    { id: "BCH003", crop: "Tomato", quantity: "200 kg", farmer: "Ramesh Singh", received: "2024-03-13", status: "Ready to Transfer" },
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
                    batch.status === "Ready to Transfer" ? "bg-nature-light text-nature" :
                    batch.status === "Quality Check" ? "bg-harvest text-foreground" :
                    "bg-secondary text-secondary-foreground"
                  }`}>
                    {batch.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {batch.crop} • {batch.quantity} • From: {batch.farmer}
                </p>
                <p className="text-xs text-muted-foreground">Received: {batch.received}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Split size={16} className="mr-1" />
                  Split Batch
                </Button>
                <Button variant="default" size="sm">
                  View Details
                </Button>
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

      {/* Verification Details (shown after scanning/entering ID) */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Batch Verification</h3>
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
            <label className="block text-sm font-medium text-foreground mb-1">Farmer</label>
            <p className="text-sm text-muted-foreground">Raj Kumar</p>
          </div>
        </div>
        
        <div className="mt-6">
          <Button className="w-full">
            ✓ Confirm Receipt & Sign Digitally
          </Button>
        </div>
      </Card>
    </div>
  );
}

function StorageTab() {
  const storageItems = [
    { id: "BCH001", crop: "Rice", quantity: "500 kg", location: "Cold Storage A", temp: "4°C", since: "2024-03-15" },
    { id: "BCH003", crop: "Tomato", quantity: "200 kg", location: "Cold Storage B", temp: "2°C", since: "2024-03-13" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Storage Management</h2>
      
      <div className="grid gap-4">
        {storageItems.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-medium text-foreground">Batch ID: {item.id}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.crop} • {item.quantity} • {item.location}
                </p>
                <p className="text-xs text-muted-foreground">
                  Temperature: {item.temp} • Since: {item.since}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Update Conditions
                </Button>
                <Button variant="outline" size="sm">
                  End Storage
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function QualityTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Quality Reports</h2>
      
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Select Batch</label>
            <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground">
              <option>BCH001 - Rice (500 kg)</option>
              <option>BCH002 - Wheat (750 kg)</option>
              <option>BCH003 - Tomato (200 kg)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Quality Grade</label>
            <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground">
              <option>Grade A - Premium</option>
              <option>Grade B - Standard</option>
              <option>Grade C - Below Standard</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Upload Lab Certificate</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Additional Notes</label>
            <textarea
              rows={3}
              placeholder="Enter quality assessment notes..."
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
            />
          </div>
          
          <Button className="w-full">
            <FileText size={16} className="mr-2" />
            Submit Quality Report
          </Button>
        </div>
      </Card>
    </div>
  );
}

function TransferTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Transfer to Retailer</h2>
      
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Select Batch to Transfer</label>
            <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground">
              <option>BCH001 - Rice (500 kg) - Grade A</option>
              <option>BCH003 - Tomato (200 kg) - Grade B</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Select Retailer</label>
            <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground">
              <option>Fresh Mart Retail Chain</option>
              <option>Green Valley Stores</option>
              <option>Organic Market Co.</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Transfer Price (per kg)</label>
              <input
                type="number"
                placeholder="0"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Transport Method</label>
              <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                <option>Refrigerated Truck</option>
                <option>Standard Truck</option>
                <option>Rail Transport</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Upload Invoice</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
            />
          </div>
          
          <Button className="w-full">
            <Truck size={16} className="mr-2" />
            Confirm Transfer
          </Button>
        </div>
      </Card>
    </div>
  );
}