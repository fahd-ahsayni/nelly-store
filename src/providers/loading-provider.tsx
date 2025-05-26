"use client";

import { createContext, useState, useContext, useEffect, useRef, ReactNode } from "react";
import { useProductsLoading } from "@/stores/productStore";
import LoadingScreen from "@/components/global/loading-screen";

interface LoadingContextType {
  showPageContent: boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const isDataLoading = useProductsLoading();
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [showPageContent, setShowPageContent] = useState(false);
  
  // Use refs to track state changes
  const loadingFinishedRef = useRef(false);
  const animationCompleteRef = useRef(false);
  
  // Track when loading is done
  useEffect(() => {
    if (!isDataLoading && !initialLoadComplete) {
      loadingFinishedRef.current = true;
      
      // Add a small delay to ensure data is processed
      const timer = setTimeout(() => {
        setInitialLoadComplete(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isDataLoading, initialLoadComplete]);

  // Handle animation completion
  const handleLoadingAnimationComplete = () => {
    animationCompleteRef.current = true;
    // Only show content when animation is complete
    setShowPageContent(true);
  };

  return (
    <LoadingContext.Provider value={{ showPageContent }}>
      {/* Only render loading screen during initial load */}
      {!showPageContent && (
        <LoadingScreen 
          isLoading={!initialLoadComplete} 
          onLoadingComplete={handleLoadingAnimationComplete} 
        />
      )}

      {/* Apply fade-in transition to main content */}
      <div 
        className="transition-opacity duration-800 ease-in-out"
        style={{ 
          opacity: showPageContent ? 1 : 0,
          visibility: showPageContent ? "visible" : "hidden"
        }}
      >
        {children}
      </div>
    </LoadingContext.Provider>
  );
}

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
