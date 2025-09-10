import { useState } from "react";
import { QrCode, MapPin, Shield, DollarSign, Star, AlertTriangle, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ConsumerView() {
  const [batchId, setBatchId] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const handleScan = () => {
    // Simulate QR scan
    setBatchId("BCH001");
    setShowDetails(true);
  };

  const handleSearch = () => {
    if (batchId.trim()) {
      setShowDetails(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Leaf className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">AgriChain Verify</h1>
              <p className="text-sm text-muted-foreground">Trace your food from farm to table</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {!showDetails ? (
          <ScanSection onScan={handleScan} batchId={batchId} setBatchId={setBatchId} onSearch={handleSearch} />
        ) : (
          <ProductDetails batchId={batchId} onBack={() => setShowDetails(false)} />
        )}
      </div>
    </div>
  );
}

function ScanSection({ onScan, batchId, setBatchId, onSearch }: {
  onScan: () => void;
  batchId: string;
  setBatchId: (id: string) => void;
  onSearch: () => void;
}) {
  return (
    <div className="space-y-6">
      {/* QR Scanner */}
      <Card className="p-8">
        <div className="text-center space-y-4">
          <QrCode size={80} className="mx-auto text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Scan Product QR Code</h2>
          <p className="text-muted-foreground">
            Scan the QR code on your product package to view its complete journey
          </p>
          <Button onClick={onScan} className="w-full">
            📱 Open QR Scanner
          </Button>
        </div>
      </Card>

      {/* Manual Entry */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Or Enter Batch ID Manually</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Batch ID (e.g., BCH001)"
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
              className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
            />
            <Button onClick={onSearch}>Search</Button>
          </div>
        </div>
      </Card>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <Shield className="w-8 h-8 mx-auto text-primary mb-2" />
          <h4 className="font-medium text-foreground">Verified</h4>
          <p className="text-xs text-muted-foreground">Blockchain secured</p>
        </Card>
        <Card className="p-4 text-center">
          <MapPin className="w-8 h-8 mx-auto text-primary mb-2" />
          <h4 className="font-medium text-foreground">Traceable</h4>
          <p className="text-xs text-muted-foreground">Farm to table</p>
        </Card>
        <Card className="p-4 text-center">
          <Leaf className="w-8 h-8 mx-auto text-primary mb-2" />
          <h4 className="font-medium text-foreground">Fresh</h4>
          <p className="text-xs text-muted-foreground">Quality assured</p>
        </Card>
      </div>
    </div>
  );
}

function ProductDetails({ batchId, onBack }: { batchId: string; onBack: () => void }) {
  const [rating, setRating] = useState(0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>← Back</Button>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Batch ID: {batchId}</h2>
          <p className="text-sm text-muted-foreground">Premium Organic Rice</p>
        </div>
      </div>

      {/* Product Summary */}
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-nature/20 rounded-lg flex items-center justify-center">
            <Leaf className="w-8 h-8 text-nature" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">Premium Basmati Rice</h3>
            <p className="text-sm text-muted-foreground">Grade A • Organic Certified</p>
            <div className="flex items-center gap-2 mt-1">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Verified on Blockchain</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 p-4 bg-accent/50 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Harvest Date</p>
            <p className="font-medium text-foreground">15 Mar 2024</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Quantity</p>
            <p className="font-medium text-foreground">500 kg batch</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Freshness</p>
            <p className="font-medium text-nature">Farm Fresh</p>
          </div>
        </div>
      </Card>

      {/* Journey Timeline */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Journey from Farm to You</h3>
        
        <div className="space-y-4">
          <div className="flex gap-4 pb-4 border-b border-border">
            <div className="w-3 h-3 bg-primary rounded-full mt-1" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground">🌱 Farm Harvest</h4>
                <span className="text-xs text-muted-foreground">Mar 15, 2024</span>
              </div>
              <p className="text-sm text-muted-foreground">Farmer: Raj Kumar</p>
              <p className="text-sm text-muted-foreground">📍 Village Rampur, Punjab, India</p>
            </div>
          </div>
          
          <div className="flex gap-4 pb-4 border-b border-border">
            <div className="w-3 h-3 bg-primary rounded-full mt-1" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground">🏭 Quality Processing</h4>
                <span className="text-xs text-muted-foreground">Mar 16, 2024</span>
              </div>
              <p className="text-sm text-muted-foreground">Green Valley Distributors</p>
              <p className="text-sm text-muted-foreground">✅ Grade A Certified • Lab Tested</p>
            </div>
          </div>
          
          <div className="flex gap-4 pb-4 border-b border-border">
            <div className="w-3 h-3 bg-primary rounded-full mt-1" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground">🧊 Cold Storage</h4>
                <span className="text-xs text-muted-foreground">Mar 16-18, 2024</span>
              </div>
              <p className="text-sm text-muted-foreground">2 days at 4°C optimal temperature</p>
              <p className="text-sm text-muted-foreground">📍 Central Cold Storage, Delhi</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-3 h-3 bg-nature rounded-full mt-1" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground">🏪 Your Store</h4>
                <span className="text-xs text-muted-foreground">Mar 19, 2024</span>
              </div>
              <p className="text-sm text-muted-foreground">Fresh Mart - Downtown Store</p>
              <p className="text-sm text-muted-foreground">📍 Ready for your table!</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Price Breakdown */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Price Transparency</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">👨‍🌾 Farmer Price</span>
            <span className="font-medium text-foreground">₹18/kg</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">🏭 Processing & Quality</span>
            <span className="font-medium text-foreground">₹2/kg</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">🚚 Transportation</span>
            <span className="font-medium text-foreground">₹2/kg</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">🏪 Retail Margin</span>
            <span className="font-medium text-foreground">₹3/kg</span>
          </div>
          <hr className="border-border" />
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold text-foreground">💰 Your Price</span>
            <span className="font-bold text-primary">₹25/kg</span>
          </div>
        </div>
      </Card>

      {/* Quality Reports */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quality Certifications</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-nature" />
            <span className="text-sm text-foreground">Organic Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-nature" />
            <span className="text-sm text-foreground">Pesticide Free</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-nature" />
            <span className="text-sm text-foreground">Lab Tested</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-nature" />
            <span className="text-sm text-foreground">Grade A Quality</span>
          </div>
        </div>
        
        <Button variant="outline" className="w-full mt-4">
          📄 View Lab Certificate
        </Button>
      </Card>

      {/* Rating & Feedback */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Rate This Product</h3>
        
        <div className="space-y-4">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl ${star <= rating ? "text-harvest" : "text-muted-foreground"}`}
              >
                ⭐
              </button>
            ))}
          </div>
          
          <textarea
            placeholder="Share your experience with this product..."
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
          />
          
          <div className="flex gap-2">
            <Button className="flex-1">
              <Star className="w-4 h-4 mr-2" />
              Submit Rating
            </Button>
            <Button variant="outline">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Report Issue
            </Button>
          </div>
        </div>
      </Card>

      {/* Blockchain Verification */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Blockchain Proof</h3>
        
        <div className="bg-accent/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Verified on Blockchain</span>
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            TX Hash: 0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t
          </p>
        </div>
        
        <Button variant="outline" className="w-full mt-4">
          🔗 View on Blockchain Explorer
        </Button>
      </Card>
    </div>
  );
}