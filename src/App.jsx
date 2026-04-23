import { Component } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/router'

// ─── Error Boundary ──────────────────────────────────────────────────────────
// React error boundaries must be class components (no hook equivalent yet).
// This catches any unhandled render errors anywhere in the tree and shows a
// recovery screen instead of a blank page.
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    // Swap this for Sentry / Datadog in production:
    console.error('[App ErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
          <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
            {/* Icon */}
            <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
              <svg
                className="w-7 h-7 text-red-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>

            <h1 className="text-lg font-semibold text-slate-800 mb-2">
              Something went wrong
            </h1>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              An unexpected error occurred. The details have been logged.
              Try refreshing — if the problem persists, contact support.
            </p>

            {/* Error detail (collapsed in prod) */}
            {import.meta.env.DEV && (
              <pre className="mb-6 text-left text-xs bg-slate-50 border border-slate-200 rounded-lg p-4 overflow-auto text-red-600 max-h-40">
                {this.state.error.message}
              </pre>
            )}

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => this.setState({ error: null })}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-200
                           text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Try again
              </button>
              <button
                onClick={() => window.location.assign('/')}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600
                           text-white hover:bg-indigo-700 transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// ─── App ─────────────────────────────────────────────────────────────────────
// App.jsx is now purely a thin wrapper.
// All routing is owned by router/index.jsx.
// All server state is owned by the QueryClient in main.jsx.
export default function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  )
}