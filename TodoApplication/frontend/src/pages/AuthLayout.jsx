import React from "react";

function AuthLayout({ title, children, popup }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">

      {/* POPU */}
      {popup && (
        <div className="absolute top-5 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg shadow-lg text-sm">
          {popup}
        </div>
      )}

      <div className="bg-white/10 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-white/20">

        <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6">
          {title}
        </h2>

        {children}

      </div>
    </div>
  );
}

export default AuthLayout;