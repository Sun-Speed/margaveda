import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import AvatarSelector from "./AvatarSelector";

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {

  // console.log(onAuthSuccess?.());

  if (!isOpen) return null;

  const { setUser } = useAuth();
  const [step, setStep] = useState(1);
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyError, setVerifyError] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [userData, setUserData] = useState(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

 useEffect(() => {
  if (cooldown <= 0) return;

  const timer = setTimeout(() => {
    setCooldown(prev => prev - 1);
  }, 1000);

  return () => clearTimeout(timer);
}, [cooldown]);


  const handleSendOtp = async () => {
    try {
      setLoading(true);
      setError("");

      if (!identifier.trim()) {
        setError("Please enter email or phone");
        return;
      }

      const res = await fetch("https://margaveda.onrender.com/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setStep(3); // go to OTP screen
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setVerifyLoading(true);
      setVerifyError("");

      // ✅ STEP 1: Verify OTP
      const res = await fetch("https://margaveda.onrender.com/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // ==============================
      // 🟢 SIGNUP FLOW
      // ==============================
      if (!isLogin) {
        // 👉 DON'T check DB
        setStep(4); // go to name + avatar
        return;
      }

      // ==============================
      // 🔵 LOGIN FLOW
      // ==============================
      const loginRes = await fetch("https://margaveda.onrender.com/api/auth/otp-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier }),
      });

      const loginData = await loginRes.json();

      if (!loginRes.ok) {
        throw new Error(loginData.message || "User not found");
      }

      // OPTIONAL: store user for step 5 preview
      setUserData(loginData.user);
      setUser(loginData.user);

      localStorage.setItem("token", loginData.token);
      localStorage.setItem("user", JSON.stringify(loginData.user));

      // 👉 go to confirmation page (your step 5)
      setStep(5);
    } catch (err) {
      setVerifyError(err.message);
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleSignup = async () => {
    try {
      setSignupLoading(true);
      setSignupError("");

      const finalAvatar =
        avatar ||
        "https://api.dicebear.com/9.x/avataaars/svg?seed=user-id-121&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf";

      const res = await fetch("https://margaveda.onrender.com/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          name,
          avatar: finalAvatar,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // 🔐 Store token
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // 🔥 Store user data (IMPORTANT)
      setUserData(data.user);
      setUser(data.user);

      // 👉 Move to Step 5 (confirmation screen)
      setStep(5);
    } catch (err) {
      setSignupError(err.message);
    } finally {
      setSignupLoading(false);
    }
  };

  const handleResendOtp = async () => {
  try {
    setResendLoading(true);

    const res = await fetch("https://margaveda.onrender.com/api/auth/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    // start cooldown (e.g., 30 sec)
    setCooldown(30);

  } catch (err) {
    console.error(err.message);
  } finally {
    setResendLoading(false);
  }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* 1. THE HIGH-END BACKDROP BLUR */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xl transition-opacity duration-300"
        onClick={onClose}
      />

      {/* 2. THE AUTH CARD CONTAINER */}
      <div
        className="relative w-full max-w-[420px] bg-[#0a0a0a] border border-white/10 rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-500 transform scale-100"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
      >
        {/* TOP ACCENT LINE (Cyan) */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#00F2FF] to-transparent opacity-50" />

        <div className="p-8">
          <>
            {/* signup entry page which asks email or phone */}
            {step === 1 && (
              <div className="flex flex-col items-center text-center">
                <h2 className="text-2xl font-black text-white tracking-tight mb-2">
                  {isLogin ? "Welcome Back" : "Join Marga Veda"}
                </h2>

                <p className="text-gray-500 text-xs uppercase tracking-[0.2em] mb-8">
                  {isLogin
                    ? "Access your career roadmap"
                    : "Select your authentication protocol"}
                </p>

                <div className="w-full space-y-4">
                  {/* GOOGLE OPTION */}
                  <button className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-3 hover:bg-white/10 transition-all active:scale-95">
                    <img
                      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/keyboard_arrow_right_white_24dp.png"
                      className="w-5 h-5 invert"
                      alt=""
                    />
                    {isLogin ? "Login with Google" : "Continue with Google"}
                  </button>

                  <div className="flex items-center gap-4 py-2">
                    <div className="h-[1px] flex-1 bg-white/5"></div>
                    <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                      OR
                    </span>
                    <div className="h-[1px] flex-1 bg-white/5"></div>
                  </div>

                  {/* EMAIL/PHONE OPTION */}
                  <button
                    onClick={() => setStep(2)}
                    className="w-full py-3 px-4 bg-[#00F2FF]/5 border border-[#00F2FF]/20 rounded-xl text-[#00F2FF] font-black text-sm hover:bg-[#00F2FF]/10 transition-all active:scale-95 shadow-[0_0_15px_rgba(0,242,255,0.05)]"
                  >
                    {isLogin
                      ? "Login with Email or Phone"
                      : "Use Email or Phone"}
                  </button>
                </div>

                <p className="mt-8 text-[11px] text-gray-500">
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}

                  <span
                    className="text-[#00F2FF] cursor-pointer hover:underline ml-1"
                    onClick={() => {
                      setIsLogin(!isLogin); // ONLY TOGGLE
                    }}
                  >
                    {isLogin ? "Create Account" : "Login"}
                  </span>
                </p>
              </div>
            )}

            {/* signup page mail entry and requesting otp page */}
            {step === 2 && (
              <div className="flex flex-col">
                {/* BACK BUTTON */}
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-6 group"
                >
                  <svg
                    className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span className="text-[10px] uppercase tracking-widest font-bold">
                    Back
                  </span>
                </button>

                <h2 className="text-xl font-black text-white tracking-tight mb-2">
                  Verification Method
                </h2>
                <p className="text-gray-500 text-xs mb-8">
                  Enter your credentials to receive a secure access code.
                </p>

                <div className="space-y-6">
                  {/* INPUT FIELD CONTAINER */}
                  <div className="relative group">
                    <label className="absolute -top-2.5 left-4 px-2 bg-[#0a0a0a] text-[10px] font-black text-[#00F2FF] uppercase tracking-widest z-10">
                      Identity Port
                    </label>
                    <input
                      type="text"
                      placeholder="Email or Phone Number"
                      className="w-full bg-transparent border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-[#00F2FF]/50 transition-all placeholder:text-gray-700"
                      onChange={(e) => setIdentifier(e.target.value)}
                    />
                    {/* Subtle Bottom Line Glow on Focus */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#00F2FF] group-focus-within:w-[80%] transition-all duration-500 shadow-[0_0_10px_#00F2FF]"></div>
                  </div>

                  {/* SEND OTP BUTTON */}
                  <button
                    onClick={handleSendOtp}
                    disabled={loading}
                    className="w-full py-4 bg-[#00F2FF] text-black font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:shadow-[0_0_20px_rgba(0,242,255,0.3)] transition-all active:scale-95 disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Request Access Code"}
                  </button>
                </div>

                <p className="mt-8 text-[10px] text-center text-gray-600 leading-relaxed">
                  By proceeding, you agree to our 
                  <span className="text-white border-b border-gray-700">
                    Terms of Service
                  </span> 
                  and 
                  <span className="text-white border-b border-gray-700">
                    Privacy Protocol
                  </span>
                  .
                </p>
              </div>
            )}

            {/* signup page which gets otp entered and verification */}
            {step === 3 && (
              <div className="flex flex-col">
                {/* BACK BUTTON */}
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-6 group"
                >
                  <svg
                    className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span className="text-[10px] uppercase tracking-widest font-bold">
                    Reselect Method
                  </span>
                </button>

                <h2 className="text-xl font-black text-white tracking-tight mb-2 uppercase italic">
                  Confirm Access
                </h2>
                <p className="text-gray-500 text-xs mb-8">
                  Enter the 6-digit decryption code sent to 
                  <span className="text-[#00F2FF]">{identifier}</span>
                </p>

                <div className="space-y-8">
                  {/* OTP INPUT FIELD */}
                  <div className="relative group">
                    <input
                      type="text"
                      maxLength="6"
                      placeholder="· · · · · ·"
                      className="w-full bg-[#0a0a0a] border-b-2 border-white/10 py-4 text-center text-3xl font-black tracking-[0.5em] text-[#00F2FF] focus:outline-none focus:border-[#00F2FF] transition-all placeholder:text-gray-800"
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    {verifyError && (
                      <div className="flex items-center justify-center gap-2 mt-4 animate-in fade-in slide-in-from-top-1 duration-300">
                        {/* Pulsing Dot */}
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]"></div>
                        
                        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-red-500/90 italic">
                          {verifyError}
                        </p>
                        
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]"></div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-[#00F2FF]/5 blur-2xl -z-10 group-focus-within:opacity-100 opacity-0 transition-opacity"></div>
                  </div>

                  {/* VERIFY BUTTON */}
                  <button
                    onClick={handleVerifyOtp}
                    disabled={verifyLoading}
                    className="w-full py-4 bg-gradient-to-r from-[#00F2FF] to-[#00A3FF] text-black font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:shadow-[0_0_25px_rgba(0,242,255,0.4)] transition-all active:scale-95"
                  >
                    {verifyLoading ? "Verifying..." : "Authorize Session"}
                  </button>

                  {/* RESEND LOGIC */}
                  <div className="flex justify-center flex-col items-center gap-2">
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">
                      Didn't receive the signal?
                    </p>
                    <button
  onClick={handleResendOtp}
  disabled={resendLoading || cooldown > 0}
  className="text-[10px] text-[#00F2FF] font-black uppercase tracking-widest hover:underline decoration-1 underline-offset-4 disabled:opacity-50"
>
  {resendLoading
    ? "Sending..."
    : cooldown > 0
    ? `Resend in ${cooldown}s`
    : "Resend Code"}
</button>
                  </div>
                </div>
              </div>
            )}

            {/* signup last page avatar pickicng and name setting */}
            {step === 4 && !isLogin && (
              <div className="flex flex-col items-center">
                <div className="absolute top-6 left-6">
                  <button
                    onClick={() => setStep(3)}
                    className="group flex items-center gap-2 py-2 px-3 rounded-lg bg-white/5 border border-white/5 hover:border-[#00F2FF]/30 hover:bg-[#00F2FF]/5 transition-all duration-300"
                  >
                    <div className="relative">
                      {/* Subtle background pulse for the icon */}
                      <div className="absolute inset-0 bg-[#00F2FF] opacity-0 group-hover:opacity-20 blur-md rounded-full transition-opacity" />

                      <svg
                        className="relative w-4 h-4 text-gray-500 group-hover:text-[#00F2FF] transition-colors transition-transform group-hover:-translate-x-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </div>
                    <span className="text-[9px] uppercase tracking-[0.2em] font-black text-gray-500 group-hover:text-white transition-colors">
                      Verification
                    </span>
                  </button>
                </div>
                <h2 className="text-xl font-black text-white tracking-tight mb-2 mt-5 uppercase">
                  Initialize Profile
                </h2>
                <p className="text-gray-500 text-xs mb-8 text-center">
                  Complete your digital identity to begin your journey.
                </p>

                <div className="w-full space-y-8">
                  {/* AVATAR SELECTION AREA */}
                  <div className="flex flex-col items-center gap-4">
                    <div
                      className="relative group cursor-pointer"
                      onClick={() => setShowAvatarPicker(true)}
                    >
                      <div className="absolute inset-0 rounded-full bg-[#00F2FF] opacity-20 blur-md group-hover:opacity-40 transition-opacity"></div>

                      <div className="relative w-24 h-24 rounded-full bg-[#111] border-2 border-[#00F2FF] flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                        {avatar ? (
                          <img
                            src={avatar}
                            alt="Selected"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <svg
                            className="w-10 h-10 text-gray-700"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        )}

                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-[8px] font-black text-white uppercase tracking-widest">
                            Click to Select
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="text-[9px] text-[#00F2FF] font-black uppercase tracking-[0.2em]">
                      Select Avatar
                    </span>
                  </div>

                  {/* AVATAR PICKER */}
                  {showAvatarPicker && (
                    <AvatarSelector
                      onSelect={(url) => setAvatar(url)} // ✅ FIXED
                      onClose={() => setShowAvatarPicker(false)}
                    />
                  )}

                  {/* NAME INPUT */}
                  <div className="relative group">
                    <label className="absolute -top-2.5 left-4 px-2 bg-[#0a0a0a] text-[10px] font-black text-[#00F2FF] uppercase tracking-widest z-10">
                      Display Name
                    </label>
                    <input
                      type="text"
                      placeholder="How should we call you?"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-[#00F2FF]/50 transition-all placeholder:text-gray-700"
                    />
                    {signupError && (
                      <p className="text-red-500 text-xs text-center mt-2">
                        {signupError}
                      </p>
                    )}
                  </div>

                  {/* FINAL BUTTON */}
                  <button
                    onClick={handleSignup}
                    disabled={signupLoading || !name} // ✅ UX FIX
                    className="w-full py-4 bg-[#00F2FF] text-black font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:shadow-[0_0_30px_rgba(0,242,255,0.5)] transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    {signupLoading ? "Creating..." : "Complete Setup"}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="flex flex-col items-center">
                {/* SUCCESS INDICATOR */}
                <div className="mb-6 flex flex-col items-center">
                  <div className="w-12 h-12 bg-[#00F2FF]/10 rounded-full flex items-center justify-center mb-2">
                    <svg
                      className="w-6 h-6 text-[#00F2FF]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-black text-white tracking-tight uppercase">
                    Identity Verified
                  </h2>
                </div>

                {/* THE PROFILE PREVIEW CARD */}
                <div className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-8 relative overflow-hidden">
                  {/* Subtle Glow behind the card */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00F2FF]/5 blur-3xl"></div>

                  <div className="flex items-center gap-5">
                    {/* Fetched Avatar */}
                    <div className="relative">
                      <img
                        src={
                          userData?.avatar ||
                          "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                        }
                        alt="User Avatar"
                        className="w-16 h-16 rounded-full border-2 border-[#00F2FF] p-0.5 object-cover bg-[#111]"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#0a0a0a] rounded-full"></div>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs text-[#00F2FF] font-black uppercase tracking-widest opacity-70">
                        Authenticated As
                      </span>
                      <h3 className="text-lg font-bold text-white truncate max-w-[180px]">
                        {userData.name || "Access User"}
                      </h3>
                      <p className="text-xs text-gray-500 font-medium">
                        {identifier || "user@network.com"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CONFIRMATION CONTROLS */}
                <div className="w-full space-y-4">
                  <button
                    onClick={() => {
                      // Here you would trigger your final login logic/redirect
                      onAuthSuccess?.();
                      onClose();
                      window.location.reload();
                    }}
                    className="w-full py-4 bg-[#00F2FF] text-black font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:shadow-[0_0_30px_rgba(0,242,255,0.5)] transition-all active:scale-95"
                  >
                    Confirm & Enter System
                  </button>

                  <button
                    onClick={() => setStep(1)}
                    className="w-full py-2 text-[10px] text-gray-600 font-bold uppercase tracking-widest hover:text-white transition-colors"
                  >
                    Not you? Switch Account
                  </button>
                </div>

                {/* FOOTER DECORATION */}
                <div className="mt-6 flex items-center gap-2">
                  <div className="w-1 h-1 bg-[#00F2FF] rounded-full animate-pulse"></div>
                  <span className="text-[9px] text-gray-700 font-bold uppercase tracking-[0.3em]">
                    Marga Darshika Secure Link
                  </span>
                </div>
              </div>
            )}
          </>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </div>
    </div>
  );
};

export default AuthModal;
