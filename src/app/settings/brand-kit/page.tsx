"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ColorPicker } from "@/components/ui/color-picker";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";

interface BrandKitData {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  watermarkText: string;
  watermarkEnabled: boolean;
  logoUrl?: string;
}

export default function BrandKitPage() {
  const [brandKit, setBrandKit] = React.useState<BrandKitData>({
    primaryColor: "#000000",
    secondaryColor: "#666666",
    accentColor: "#3B82F6",
    fontFamily: "Inter",
    watermarkText: "My Brand",
    watermarkEnabled: true,
  });

  const [isLoading, setIsLoading] = React.useState(false);

  // Load existing brand kit data on mount
  React.useEffect(() => {
    const loadBrandKit = async () => {
      try {
        const response = await fetch("/api/brand-kit");
        if (response.ok) {
          const data = await response.json();
          setBrandKit(data.data);
        }
      } catch (error) {
        console.error("Failed to load brand kit:", error);
      }
    };

    loadBrandKit();
  }, []);

  const handleColorChange = (key: keyof BrandKitData, value: string) => {
    setBrandKit((prev) => ({ ...prev, [key]: value }));
  };

  const handleInputChange = (key: keyof BrandKitData, value: string | boolean) => {
    setBrandKit((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Create a preview URL
    const previewUrl = URL.createObjectURL(file);
    setBrandKit((prev) => ({ ...prev, logoUrl: previewUrl }));

    try {
      const formData = new FormData();
      formData.append("logo", file);

      const response = await fetch("/api/uploads/logo", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setBrandKit((prev) => ({ ...prev, logoUrl: data.url }));
      }
    } catch (error) {
      console.error("Failed to upload logo:", error);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/brand-kit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(brandKit),
      });

      if (response.ok) {
        alert("Brand kit saved successfully!");
      }
    } catch (error) {
      console.error("Failed to save brand kit:", error);
      alert("Failed to save brand kit");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Brand Kit</h1>
        <p className="text-muted-foreground">
          Configure your brand colors, font, watermark, and logo with live preview.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-8">
          {/* Color Settings */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Colors</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <ColorPicker
                  color={brandKit.primaryColor}
                  onChange={(color) => handleColorChange("primaryColor", color)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondary-color">Secondary Color</Label>
                <ColorPicker
                  color={brandKit.secondaryColor}
                  onChange={(color) => handleColorChange("secondaryColor", color)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accent-color">Accent Color</Label>
                <ColorPicker
                  color={brandKit.accentColor}
                  onChange={(color) => handleColorChange("accentColor", color)}
                />
              </div>
            </div>
          </div>

          {/* Font Settings */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Typography</h2>
            <div className="space-y-2">
              <Label htmlFor="font-family">Font Family</Label>
              <Input
                id="font-family"
                value={brandKit.fontFamily}
                onChange={(e) => handleInputChange("fontFamily", e.target.value)}
                placeholder="Enter font family name"
              />
            </div>
          </div>

          {/* Watermark Settings */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Watermark</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="watermark-enabled"
                  checked={brandKit.watermarkEnabled}
                  onCheckedChange={(checked) => handleInputChange("watermarkEnabled", checked)}
                />
                <Label htmlFor="watermark-enabled">Enable Watermark</Label>
              </div>

              {brandKit.watermarkEnabled && (
                <div className="space-y-2">
                  <Label htmlFor="watermark-text">Watermark Text</Label>
                  <Input
                    id="watermark-text"
                    value={brandKit.watermarkText}
                    onChange={(e) => handleInputChange("watermarkText", e.target.value)}
                    placeholder="Enter watermark text"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Logo Upload */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Logo</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  {brandKit.logoUrl ? (
                    <AvatarImage src={brandKit.logoUrl} alt="Logo" />
                  ) : (
                    <AvatarFallback>
                      <Upload className="h-8 w-8" />
                    </AvatarFallback>
                  )}
                </Avatar>
                
                <div>
                  <Label htmlFor="logo-upload" className="cursor-pointer">
                    <Button variant="outline" type="button">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Logo
                    </Button>
                  </Label>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoUpload}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    PNG, JPG, or SVG up to 2MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? "Saving..." : "Save Brand Kit"}
          </Button>
        </div>

        {/* Live Preview Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Live Preview</h2>
          
          <div
            className="relative p-8 rounded-lg border-2 min-h-[400px] flex flex-col justify-center items-center text-center"
            style={{ 
              backgroundColor: brandKit.primaryColor + "10",
              borderColor: brandKit.accentColor
            }}
          >
            {/* Logo */}
            {brandKit.logoUrl && (
              <div className="mb-6">
                <Avatar className="h-20 w-20 mx-auto">
                  <AvatarImage src={brandKit.logoUrl} alt="Logo" />
                </Avatar>
              </div>
            )}

            {/* Sample Quote */}
            <div className="space-y-4 max-w-md">
              <blockquote
                className="text-2xl font-bold italic"
                style={{ 
                  color: brandKit.primaryColor,
                  fontFamily: brandKit.fontFamily
                }}
              >
                Success is not final, failure is not fatal: it is the courage to continue that counts.
              </blockquote>
              
              <p
                className="text-lg font-medium"
                style={{ color: brandKit.secondaryColor }}
              >
                — Winston Churchill
              </p>

              <div
                className="inline-block px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: brandKit.accentColor,
                  color: "white",
                }}
              >
                Motivational
              </div>
            </div>

            {/* Watermark */}
            {brandKit.watermarkEnabled && brandKit.watermarkText && (
              <div
                className="absolute bottom-4 right-4 text-sm font-medium opacity-60"
                style={{ 
                  color: brandKit.secondaryColor,
                  fontFamily: brandKit.fontFamily
                }}
              >
                {brandKit.watermarkText}
              </div>
            )}
          </div>

          {/* Preview Details */}
          <div className="space-y-3 p-4 bg-muted rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Primary:</span>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 rounded border"
                  style={{ backgroundColor: brandKit.primaryColor }}
                />
                <span className="text-sm font-mono">{brandKit.primaryColor}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Secondary:</span>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 rounded border"
                  style={{ backgroundColor: brandKit.secondaryColor }}
                />
                <span className="text-sm font-mono">{brandKit.secondaryColor}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Accent:</span>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 rounded border"
                  style={{ backgroundColor: brandKit.accentColor }}
                />
                <span className="text-sm font-mono">{brandKit.accentColor}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Font:</span>
              <span className="text-sm">{brandKit.fontFamily}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}