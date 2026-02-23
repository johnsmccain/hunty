# Soroban / Stellar integration

- **`client.ts`** – Creates the Soroban RPC `Server` (from `@stellar/stellar-sdk`, same API as deprecated `soroban-client`) and reads RPC URL / network passphrase from env.
- **`SorobanContext.tsx`** – React context and `useSoroban()` hook. Runs a connection test (`getHealth`) on app init and exposes the Server and network details.

## Setup

1. Copy `.env.local.example` to `.env.local`.
2. Optionally adjust `NEXT_PUBLIC_SOROBAN_RPC_URL` and `NEXT_PUBLIC_SOROBAN_NETWORK_PASSPHRASE` (defaults are Futurenet).

## Usage

```tsx
import { useSoroban } from "@/lib/soroban/SorobanContext"

function MyComponent() {
  const { server, networkPassphrase, connectionStatus, connectionError, reconnect } = useSoroban()

  if (connectionStatus === "connecting") return <div>Connecting to Stellar...</div>
  if (connectionStatus === "error") return <div>Error: {connectionError?.message}</div>
  if (!server) return null

  // Use server for contract calls, getAccount, etc.
  return <div>Connected to {networkPassphrase}</div>
}
```
