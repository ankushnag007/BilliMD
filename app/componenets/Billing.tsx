"use client"; // Ensures this component is rendered on the client side

import React, { useState, useEffect } from "react";
import { ComboboxDemo } from "./comboBox";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerClose,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead, TableCaption } from "@/components/ui/table";
import { Toast, ToastProvider, ToastViewport } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import Loader from "@/components/ui/loader"; // Import the Loader component

const basePrices = {
  Aetna: 100,
  Cigna: 200,
  Medicaid: 150,
  Medicare: 250,
  Mankind: 150,
  Genesis: 180,
};

const providerLogos = {
  Aetna: "/assets/Aetna-Logo.png",
  Cigna: "/assets/cigna.jpg",
  Medicaid: "/assets/medicaid.png",
  Medicare: "/assets/medicare.png",
  Mankind: "/assets/mankind.jpg",
  Genesis: "/assets/genesis.jpg",
};

const Billing = () => {
  const [providerSize, setProviderSize] = useState(0);
  const [locations, setLocations] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [price, setPrice] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true); // New state for loading
  const [showButton, setShowButton] = useState(true); // State for button visibility

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  useEffect(() => {
    // Handle scroll events to show/hide the button
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(false);
      } else {
        setShowButton(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCardClick = (providerName) => {
    setSelectedProvider(providerName);
    calculatePrice(providerSize, providerName);
  };

  const handleProviderSizeChange = (e) => {
    const size = parseInt(e.target.value);
    setProviderSize(size);
    if (selectedProvider) {
      calculatePrice(size, selectedProvider);
    }
  };

  const handleLocationChange = (e) => {
    setLocations(e.target.value);
  };

  const calculatePrice = (size, provider) => {
    const basePrice = basePrices[provider] || 0;
    const calculatedPrice = basePrice * size;
    setPrice(calculatedPrice);
  };

  const validate = () => {
    const newErrors = {};
    if (!selectedProvider) newErrors.selectedProvider = "Provider Type is required";
    if (providerSize <= 0) newErrors.providerSize = "Provider Size must be greater than 0";
    if (!locations) newErrors.locations = "Locations are required";
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data = {
      providerType: selectedProvider,
      providerSize,
      locations,
      price,
      logo: providerLogos[selectedProvider],
    };

    setSelectedItems((prevItems) => [...prevItems, data]);
    setShowToast(true);
    setErrors({});
    resetForm();
  };

  const resetForm = () => {
    setProviderSize(0);
    setLocations("");
    setSelectedProvider("");
    setPrice(0);
  };

  const updateItem = (index, newSize) => {
    const updatedItems = [...selectedItems];
    const updatedItem = updatedItems[index];
    updatedItem.providerSize = newSize;
    updatedItem.price = basePrices[updatedItem.providerType] * newSize;
    setSelectedItems(updatedItems);
  };

  const removeItem = (index) => {
    const updatedItems = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(updatedItems);
  };

  const totalPrice = selectedItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="flex h-screen overflow-hidden">
      <ToastProvider>
        {loading ? (
          <Loader /> // Show loader if loading is true
        ) : (
          <>
            {/* Left Section */}
            <div className="flex-1 overflow-auto p-8">
              <h2 className="text-xl font-semibold">Details of your practice</h2>
              <p className="text-sm font-thin">To give an accurate quote, please fill out the required information so we can get to know one another</p>

              <div className="pt-10">
                <ComboboxDemo />
                {errors.selectedProvider && (
                  <p className="text-red-500 text-sm">{errors.selectedProvider}</p>
                )}
              </div>

              <div className="pt-32">
                <p>Provider Size</p>
                <Input
                  type="number"
                  placeholder="Enter Provider Size"
                  onChange={handleProviderSizeChange}
                  className={cn(errors.providerSize && "border-red-500")}
                  value={providerSize}
                />
                {errors.providerSize && (
                  <p className="text-red-500 text-sm">{errors.providerSize}</p>
                )}
              </div>

              <div className="pt-32">
                <p>Locations</p>
                <Input
                  type="text"
                  placeholder="Enter Locations"
                  onChange={handleLocationChange}
                  className={cn(errors.locations && "border-red-500")}
                  value={locations}
                />
                {errors.locations && (
                  <p className="text-red-500 text-sm">{errors.locations}</p>
                )}
              </div>

              <div className="pt-10">
                <Button onClick={handleSubmit} className="bg-blue-500 text-white">
                  Submit
                </Button>
              </div>
            </div>

            {showToast && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <Toast onOpenChange={setShowToast}>
                  <div className="text-green-500">✔️</div>
                  <div>Details successfully submitted!</div>
                </Toast>
              </div>
            )}

            {/* Right Section */}
            <div className="flex-1 overflow-auto p-8 pl-10">
              <h2 className="text-xl font-semibold">Select Providers</h2>
              <p className="text-sm font-thin">Which insurance provider do you want to be credentialed with?</p>
              <div className="flex flex-wrap gap-10 pt-10">
                {Object.keys(basePrices).map((provider) => (
                  <Card
                    key={provider}
                    onClick={() => handleCardClick(provider)}
                    className="cursor-pointer hover:shadow-xl transition-transform transform hover:scale-105 bg-white p-4 rounded-lg border border-gray-200 flex flex-col items-center"
                  >
                    <CardHeader className="text-center">
                      <Image
                        alt={`${provider} logo`}
                        src={providerLogos[provider]}
                        height="120"
                        width="120"
                        className="mb-2 rounded-full border border-gray-300"
                      />
                      <CardTitle className="text-lg font-semibold">{provider}</CardTitle>
                      <p className="text-gray-600">Price: ${basePrices[provider]}</p>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              <div className="pt-10">
                <div className="p-4 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-lg">
                  <h3 className="text-lg font-bold">Selected Provider: {selectedProvider}</h3>
                  <h3 className="text-lg font-bold">Calculated Price: ${price}</h3>
                </div>
              </div>
            </div>

            {/* View Cart Button */}
            <div className={`fixed top-20 right-0 m-6 bg-white z-50 transition-transform ${showButton ? 'translate-y-0' : 'translate-y-full'}`}>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button className="bg-green-400">View Cart</Button>
                </DrawerTrigger>
                <DrawerContent style={{ background: "white" }}>
                  <DrawerHeader>
                    <DrawerTitle>Selected Policies List</DrawerTitle>
                    <Table>
                      <TableCaption>A list of your recent selections.</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Provider</TableHead>
                          <TableHead>Provider Size</TableHead>
                          <TableHead>Locations</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedItems.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Image
                                alt="logo"
                                src={item.logo}
                                height="50"
                                width="50"
                                className="h-8 w-20 rounded-md text-white bg-white"
                              />
                              {item.providerType}
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={item.providerSize}
                                onChange={(e) => updateItem(index, parseInt(e.target.value))}
                                className="w-24"
                              />
                            </TableCell>
                            <TableCell>{item.locations}</TableCell>
                            <TableCell className="text-right">${item.price}</TableCell>
                            <TableCell className="text-right">
                              <Button onClick={() => removeItem(index)} className="bg-red-500 text-white">
                                Remove
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell colSpan={3} className="text-right font-bold">Total:</TableCell>
                          <TableCell className="text-right font-bold">${totalPrice}</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </DrawerHeader>
                  <DrawerFooter>
                    <Button>Proceed Payment</Button>
                    <DrawerClose>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>

            <ToastViewport />
          </>
        )}
      </ToastProvider>
    </div>
  );
};

export default Billing;
