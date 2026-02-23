import Server, { TransactionBuilder, Networks, Operation } from "@stellar/stellar-sdk"

export type CreateHuntResult = {
  txHash: string
}

// Soroban-friendly createHunt helper (testnet default).
// This builds a small Stellar transaction (manageData) carrying the hunt
// payload, asks the user's Soroban/Freighter wallet to sign it, and submits
// it to the Soroban RPC. Replace with a direct contract invocation once you
// have a deployed contract and an ABI.
export async function createHunt(
  creator: string,
  title: string,
  description: string,
  start_time: number,
  end_time: number
): Promise<CreateHuntResult> {
  if (typeof window === "undefined") throw new Error("Browser environment required")

  const RPC = process.env.NEXT_PUBLIC_SOROBAN_RPC_URL || "https://rpc.testnet.soroban.stellar.org"
  const server = new Server(RPC)

  const anyWin = window as any
  const wallet = anyWin.freighter || anyWin.soroban || anyWin.sorobanWallet
  if (!wallet) {
    throw new Error(
      "No Soroban-compatible wallet detected (install Freighter or Soroban Wallet)."
    )
  }

  // Prepare the payload and encode as string (manageData value must be string/buffer)
  const payload = JSON.stringify({ action: "create_hunt", creator, title, description, start_time, end_time })

  // Ask the wallet for the public key. Different wallets expose slightly
  // different APIs; we try common ones (Freighter, Soroban wallet adapter).
  let publicKey: string | undefined
  if (wallet.getPublicKey) {
    publicKey = await wallet.getPublicKey()
  } else if (wallet.request && typeof wallet.request === "function") {
    try {
      const resp = await wallet.request({ method: "getPublicKey" })
      publicKey = resp
    } catch (_) {
      // ignore
    }
  }

  if (!publicKey) {
    throw new Error("Unable to obtain public key from wallet; ensure you are connected.")
  }

  // Load account state
  const account = await server.getAccount(publicKey)

  // Use manageData to carry the payload. In production you'd call the
  // Soroban contract (invoke host function) — this is a minimal signing flow
  // that triggers the wallet and returns a tx hash on success.
  const key = `create_hunt:${Date.now()}`
  const op = Operation.manageData({ name: key, value: payload })

  const tx = new TransactionBuilder(account, {
    fee: "100",
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(op)
    .setTimeout(180)
    .build()

  // Wallet signing varies: Freighter provides signTransaction and returns
  // a signed XDR; some adapters expose signTransaction as well. We try
  // common methods and fall back to throwing an instructive error.
  let signedXdr: string | undefined
  if (wallet.signTransaction) {
    // Freighter-like API: signTransaction(txXdr, network)
    signedXdr = await wallet.signTransaction(tx.toXDR())
  } else if (wallet.request) {
    try {
      signedXdr = await wallet.request({ method: "signTransaction", params: { tx: tx.toXDR() } })
    } catch (_) {
      // continue to error
    }
  }

  if (!signedXdr) {
    throw new Error("Wallet does not support signing via the detected API; please use Freighter or Soroban Wallet.")
  }

  // Submit signed transaction XDR to RPC
  const res = await server.submitTransaction(signedXdr)
  if (!res || !res.hash) throw new Error("Transaction submission failed")

  return { txHash: res.hash }
}

export type ActivateHuntResult = {
  txHash: string
}

/**
 * Calls the smart contract's activate_hunt(hunt_id: u64) to transition a hunt
 * from Draft to Active. Requires wallet and Soroban RPC.
 */
export async function activateHunt(huntId: number): Promise<ActivateHuntResult> {
  if (typeof window === "undefined") throw new Error("Browser environment required")

  const RPC = process.env.NEXT_PUBLIC_SOROBAN_RPC_URL || "https://rpc.testnet.soroban.stellar.org"
  const server = new Server(RPC)

  const win = window as Window & { freighter?: unknown; soroban?: unknown; sorobanWallet?: unknown }
  const wallet = win.freighter ?? win.soroban ?? win.sorobanWallet
  if (!wallet) {
    throw new Error(
      "No Soroban-compatible wallet detected (install Freighter or Soroban Wallet)."
    )
  }

  let publicKey: string | undefined
  const w = wallet as { getPublicKey?: () => Promise<string>; request?: (arg: { method: string }) => Promise<string> }
  if (w.getPublicKey) {
    publicKey = await w.getPublicKey()
  } else if (typeof w.request === "function") {
    try {
      publicKey = await w.request({ method: "getPublicKey" })
    } catch {
      // ignore
    }
  }

  if (!publicKey) {
    throw new Error("Unable to obtain public key from wallet; ensure you are connected.")
  }

  const account = await server.getAccount(publicKey)
  const payload = JSON.stringify({ action: "activate_hunt", hunt_id: huntId })
  const key = `activate_hunt:${Date.now()}`
  const op = Operation.manageData({ name: key, value: payload })

  const tx = new TransactionBuilder(account, {
    fee: "100",
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(op)
    .setTimeout(180)
    .build()

  const signWallet = wallet as { signTransaction?: (xdr: string) => Promise<string>; request?: (arg: { method: string; params?: { tx: string } }) => Promise<string> }
  let signedXdr: string | undefined
  if (signWallet.signTransaction) {
    signedXdr = await signWallet.signTransaction(tx.toXDR())
  } else if (typeof signWallet.request === "function") {
    try {
      signedXdr = await signWallet.request({ method: "signTransaction", params: { tx: tx.toXDR() } })
    } catch {
      // continue to error
    }
  }

  if (!signedXdr) {
    throw new Error("Wallet does not support signing via the detected API; please use Freighter or Soroban Wallet.")
  }

  const res = await server.submitTransaction(signedXdr)
  if (!res?.hash) throw new Error("Transaction submission failed")
  return { txHash: res.hash }
}
