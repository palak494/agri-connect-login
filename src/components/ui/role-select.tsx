import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface RoleOption {
  value: string;
  label: string;
  emoji: string;
  description: string;
}

export interface RoleSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

const roleOptions: RoleOption[] = [
  {
    value: "farmer",
    label: "Farmer",
    emoji: "👨‍🌾",
    description: "Grow and harvest crops"
  },
  {
    value: "distributor", 
    label: "Distributor",
    emoji: "🚚",
    description: "Transport and distribute goods"
  },
  {
    value: "retailer",
    label: "Retailer", 
    emoji: "🏬",
    description: "Sell products to consumers"
  },
  {
    value: "consumer",
    label: "Consumer",
    emoji: "🛒", 
    description: "Purchase and consume products"
  }
];

const RoleSelect = React.forwardRef<HTMLDivElement, RoleSelectProps>(
  ({ value, onValueChange, className }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const selectedOption = roleOptions.find(option => option.value === value);

    return (
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">
          Select Role
        </label>
        <div className="relative" ref={ref}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "flex h-12 w-full items-center justify-between rounded-lg border border-border bg-input px-4 py-3 text-sm transition-all",
              "hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none",
              isOpen && "border-primary ring-2 ring-primary/20",
              className
            )}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{selectedOption?.emoji}</span>
              <div className="text-left">
                <div className="font-medium">{selectedOption?.label}</div>
                <div className="text-xs text-muted-foreground">{selectedOption?.description}</div>
              </div>
            </div>
            <ChevronDown 
              className={cn(
                "h-4 w-4 text-muted-foreground transition-transform",
                isOpen && "rotate-180"
              )} 
            />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 animate-scale-in">
              <div className="glass-effect rounded-lg border border-border shadow-lg overflow-hidden">
                {roleOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onValueChange(option.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      value === option.value && "bg-primary/10 text-primary font-medium"
                    )}
                  >
                    <span className="text-lg">{option.emoji}</span>
                    <div className="text-left">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-muted-foreground">{option.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

RoleSelect.displayName = "RoleSelect";

export { RoleSelect };