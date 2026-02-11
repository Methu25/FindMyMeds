import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Store, ShieldCheck, ArrowLeft } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState('civilian'); // 'civilian' or 'pharmacy'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const endpoint = accountType === 'civilian'
        ? 'http://localhost:8080/api/v1/civilian/auth/login'
        : 'http://localhost:8080/api/v1/pharmacy/auth/login';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('userFullName', data.fullName);

        if (accountType === 'civilian') {
          navigate('/civilian');
        } else {
          navigate('/pharmacy');
        }
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Is the backend running?');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 items-center justify-center p-4 relative">

      {/* Back Button - Outside the box */}
      {/* Back Button - Outside the box */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:bg-gradient-to-r hover:from-[#2FA4A9] hover:to-[#258a8e] hover:border-transparent transition-all duration-300 group z-10 text-gray-600 hover:text-white"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="font-medium text-sm">Back to Home</span>
      </button>

      <div className="flex w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[450px] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transform hover:-translate-y-1">

        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center relative">

          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome back</h2>
            <p className="text-gray-800 text-sm mt-2 font-medium">Please enter your details to sign in.</p>
          </div>

          <div className="mb-6">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAccountType('civilian')}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 group relative overflow-hidden ${accountType === 'civilian'
                  ? 'border-[#2FA4A9] bg-[#2FA4A9]/10 text-[#2FA4A9] shadow-md ring-1 ring-[#2FA4A9] scale-[1.02]'
                  : 'border-gray-100 text-gray-400 hover:border-[#2FA4A9]/50 hover:bg-[#2FA4A9]/5 hover:text-[#2FA4A9] hover:shadow-lg hover:scale-[1.02]'
                  }`}
              >
                <div className={`p-2 rounded-full mb-2 transition-colors duration-300 ${accountType === 'civilian' ? 'bg-[#2FA4A9]/20' : 'bg-gray-50 group-hover:bg-[#2FA4A9]/10'}`}>
                  <User size={20} className={`transition-colors duration-300 ${accountType === 'civilian' ? 'text-[#2FA4A9]' : 'group-hover:text-[#2FA4A9]'}`} />
                </div>
                <span className="text-sm font-bold">Civilian</span>
              </button>

              <button
                type="button"
                onClick={() => setAccountType('pharmacy')}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 group relative overflow-hidden ${accountType === 'pharmacy'
                  ? 'border-[#2FA4A9] bg-[#2FA4A9]/10 text-[#2FA4A9] shadow-md ring-1 ring-[#2FA4A9] scale-[1.02]'
                  : 'border-gray-100 text-gray-400 hover:border-[#2FA4A9]/50 hover:bg-[#2FA4A9]/5 hover:text-[#2FA4A9] hover:shadow-lg hover:scale-[1.02]'
                  }`}
              >
                <div className={`p-2 rounded-full mb-2 transition-colors duration-300 ${accountType === 'pharmacy' ? 'bg-[#2FA4A9]/20' : 'bg-gray-50 group-hover:bg-[#2FA4A9]/10'}`}>
                  <Store size={20} className={`transition-colors duration-300 ${accountType === 'pharmacy' ? 'text-[#2FA4A9]' : 'group-hover:text-[#2FA4A9]'}`} />
                </div>
                <span className="text-sm font-bold">Pharmacy</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-100 outline-none transition-all duration-200 bg-gray-50/50 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-100 outline-none transition-all duration-200 bg-gray-50/50 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-gray-900/20 mt-2"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Don't have an account?{' '}
              <button className="text-[#2FA4A9] font-bold hover:text-[#258a8e] hover:underline transition-colors">
                Sign up for free
              </button>
            </p>
          </div>
        </div>

        {/* Right Side - Visual */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#4CD7D0] to-[#2FA4A9] p-10 flex-col justify-center items-center text-center relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10 w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-inner ring-1 ring-white/30">
            <ShieldCheck size={32} className="text-white drop-shadow-md" />
          </div>

          <h3 className="relative z-10 text-2xl font-bold text-white mb-3 text-shadow-sm">
            Secure & Reliable
          </h3>

          <p className="relative z-10 text-white/95 text-base leading-relaxed max-w-xs font-medium">
            Access the nation's most comprehensive medicine registry with real-time stock updates.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
