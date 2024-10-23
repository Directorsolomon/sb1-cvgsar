import React, { useRef, useEffect, useState } from 'react';

interface ReCaptchaProps {
  sitekey: string;
  onChange: (token: string | null) => void;
}

declare global {
  interface Window {
    grecaptcha: any;
    onRecaptchaLoad: () => void;
  }
}

export const ReCaptcha: React.FC<ReCaptchaProps> = ({ sitekey, onChange }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [widgetId, setWidgetId] = useState<number | null>(null);

  useEffect(() => {
    // Load ReCaptcha script if it's not already loaded
    if (typeof window.grecaptcha === 'undefined') {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      window.onRecaptchaLoad = initReCaptcha;
    } else {
      initReCaptcha();
    }

    return () => {
      // Clean up the widget when component unmounts
      if (widgetId !== null && window.grecaptcha) {
        window.grecaptcha.reset(widgetId);
        setWidgetId(null);
      }
    };
  }, [sitekey]);

  const initReCaptcha = () => {
    if (divRef.current && window.grecaptcha && widgetId === null) {
      try {
        const id = window.grecaptcha.render(divRef.current, {
          sitekey: sitekey,
          callback: onChange,
          'expired-callback': () => onChange(null),
        });
        setWidgetId(id);
      } catch (error) {
        if (error instanceof Error && error.message.includes('reCAPTCHA has already been rendered')) {
          console.warn('ReCaptcha is already rendered. Skipping re-render.');
        } else {
          console.error('Error rendering ReCaptcha:', error);
        }
      }
    }
  };

  return <div ref={divRef}></div>;
};