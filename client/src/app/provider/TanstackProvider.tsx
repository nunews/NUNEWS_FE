"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const TanstackProvider = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient();
  return (
    <>
      <QueryClientProvider client={client}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
};

export default TanstackProvider;
