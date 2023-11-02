import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryCLient = new QueryClient();

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryCLient}>{children}</QueryClientProvider>
  );
};
