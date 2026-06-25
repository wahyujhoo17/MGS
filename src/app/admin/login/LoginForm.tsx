"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="w-full max-w-md p-8 bg-white border border-concrete shadow-xl rounded-lg">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-navy tracking-wide">
          MGS JAYA ABADI
        </h1>
        <p className="text-sm text-iron mt-2">
          Gated Admin Authorization Panel
        </p>
      </div>

      <form action={formAction} className="space-y-6">
        {state?.error && (
          <div className="p-3 text-sm text-danger bg-red-50 border border-red-200 rounded-md">
            {state.error}
          </div>
        )}

        <div>
          <label
            htmlFor="username"
            className="block text-sm font-semibold text-navy mb-2"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            disabled={isPending}
            className="w-full px-4 py-3 border border-concrete rounded-md focus:outline-none focus:ring-2 focus:ring-royal focus:border-royal transition-colors disabled:opacity-50 text-navy bg-offwhite"
            placeholder="Masukkan username"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-navy mb-2"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            disabled={isPending}
            className="w-full px-4 py-3 border border-concrete rounded-md focus:outline-none focus:ring-2 focus:ring-royal focus:border-royal transition-colors disabled:opacity-50 text-navy bg-offwhite"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 px-4 bg-navy hover:bg-royal text-white font-bold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal disabled:opacity-50 cursor-pointer flex items-center justify-center"
        >
          {isPending ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Authorize & Enter"
          )}
        </button>
      </form>
    </div>
  );
}
