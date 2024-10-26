import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

declare global {
  interface Window {
    PaystackPop: any;
  }
}

export default function DonateButton() {
  const { user } = useAuthStore();

  useEffect(() => {
    // Load Paystack script only if it hasn't been loaded yet
    if (!document.querySelector('script[src="https://js.paystack.co/v1/inline.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleDonation = () => {
    if (!user) {
      alert('Please log in to make a donation');
      return;
    }

    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: user.email,
      amount: 1000 * 100, // Amount in kobo (₦1,000)
      currency: 'NGN',
      ref: '' + Math.floor(Math.random() * 1000000000),
      callback: (response: any) => {
        alert('Thanks for your donation! Reference: ' + response.reference);
      },
      onClose: () => {
        alert('Window closed.');
      },
    });
    handler.openIframe();
  };

  return (
    <button
      onClick={handleDonation}
      className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
    >
      Donate ₦1,000
    </button>
  );
}
