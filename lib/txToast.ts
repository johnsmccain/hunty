import { toast } from "sonner"

type TxToastMessages = {
  loading?: string
  submitted?: string
  success?: string
}

function formatSorobanError(error: unknown): string {
  const base = "Error"

  if (error instanceof Error) {
    return `${base}: ${error.message}`
  }

  if (typeof error === "string") {
    return `${base}: ${error}`
  }

  // Try to surface common RPC / Soroban-style error objects
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anyErr = error as any

  if (anyErr?.response?.data) {
    try {
      const data = anyErr.response.data
      if (typeof data === "string") {
        return `${base}: ${data}`
      }
      if (data.error) {
        return `${base}: ${String(data.error)}`
      }
      if (data.detail) {
        return `${base}: ${String(data.detail)}`
      }
      if (data.message) {
        return `${base}: ${String(data.message)}`
      }
      if (data.extras?.result_codes?.transaction) {
        return `${base}: ${String(data.extras.result_codes.transaction)}`
      }
    } catch {
      // fall through to generic formatting
    }
  }

  try {
    return `${base}: ${JSON.stringify(error)}`
  } catch {
    return base
  }
}

/**
 * Wrap a blockchain transaction-like promise in standardized toast notifications.
 *
 * - loading: "Confirming in Wallet..."
 * - submitted: "Transaction Submitted"
 * - success: "Success!"
 * - error: parsed Soroban / RPC error when possible
 */
export async function withTransactionToast<T>(
  fn: () => Promise<T>,
  messages: TxToastMessages = {}
): Promise<T> {
  const {
    loading = "Confirming in Wallet...",
    submitted = "Transaction Submitted",
    success = "Success!",
  } = messages

  const result = await toast.promise(
    fn(),
    {
      loading,
      success: submitted,
      error: (err) => formatSorobanError(err),
    }
  )

  // Optionally show a follow-up success toast distinct from "Transaction Submitted"
  if (success && success !== submitted) {
    toast.success(success)
  }

  return result
}

