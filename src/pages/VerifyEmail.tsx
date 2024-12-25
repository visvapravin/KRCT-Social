import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Shield, ArrowRight } from 'lucide-react';

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const email = location.state?.email || '';
  
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter the complete OTP');
      return;
    }

    setIsVerifying(true);
    setError('');

    // Simulate OTP verification
    setTimeout(() => {
      if (otpValue === '123456') { // Demo OTP
        navigate('/login');
      } else {
        setError('Invalid OTP. Please try again.');
        setIsVerifying(false);
      }
    }, 1500);
  };

  const handleResend = () => {
    // Simulate resending OTP
    setOtp(['', '', '', '', '', '']);
    setError('');
    alert('Demo OTP: 123456');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black flex items-center justify-center px-4"
    >
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 mx-auto mb-8 relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Shield className="w-10 h-10" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-2">Verify Your Email</h2>
          <p className="text-gray-400">
            We've sent a verification code to<br />
            <span className="text-white">{email}</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 rounded-2xl"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-4 text-center">
                Enter the 6-digit code
              </label>
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:border-transparent"
                  />
                ))}
              </div>
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm text-center mt-2"
                >
                  {error}
                </motion.p>
              )}
            </div>

            <button
              onClick={handleVerify}
              disabled={isVerifying}
              className="w-full relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 transform group-hover:translate-x-full transition-transform duration-500" />
              <div className="relative flex items-center justify-center bg-white/5 hover:bg-white/10 py-3 rounded-xl transition-all">
                {isVerifying ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    <span className="mr-2">Verify Email</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </button>

            <div className="text-center">
              <button
                onClick={handleResend}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Didn't receive the code? <span className="text-white">Resend</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}