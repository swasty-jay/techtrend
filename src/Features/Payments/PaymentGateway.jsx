import { useEffect } from "react";
import PropTypes from "prop-types";

const PaymentGateway = ({
  isProcessing,
  setIsProcessing,
  amount,
  email,
  metadata,
  onSuccess,
  onCancel,
  className,
  children,
}) => {
  // Load Paystack script when component mounts
  useEffect(() => {
    // Check if Paystack script is already loaded
    if (!document.getElementById("paystack-script")) {
      const script = document.createElement("script");
      script.id = "paystack-script";
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;

      document.body.appendChild(script);
    }

    // Clean up script on component unmount
    return () => {
      // We won't remove the script on unmount because other components might need it
      // If necessary, implement a more sophisticated script management approach
    };
  }, []);

  // Initialize Paystack payment
  const initializePaystack = () => {
    if (isProcessing) return;

    setIsProcessing(true);

    // Check if PaystackPop is available
    if (!window.PaystackPop) {
      alert("Paystack SDK is not loaded yet. Please try again in a moment.");
      setIsProcessing(false);
      return;
    }

    // Paystack public key - replace with your actual public key
    const publicKey = "pk_test_9b90f7b54daff08e369a006adc73a82cac9e11e4";

    // Create a new instance of Paystack
    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: email,
      amount: amount * 100, // Paystack expects amount in kobo (pesewas)
      currency: "GHS",
      ref: `order_${new Date().getTime()}`,
      metadata: metadata,
      callback: (response) => {
        // Handle successful payment
        setIsProcessing(false);
        if (onSuccess) onSuccess(response);
      },
      onClose: () => {
        // Handle when user closes payment modal
        setIsProcessing(false);
        if (onCancel) onCancel();
      },
    });

    // Open Paystack payment portal
    handler.openIframe();
  };

  return (
    <button
      type="button"
      onClick={initializePaystack}
      disabled={isProcessing}
      className={
        className ||
        `bg-red-500 text-white py-2 px-4 rounded ${
          isProcessing ? "opacity-70 cursor-not-allowed" : "hover:bg-red-600"
        }`
      }
    >
      {children || (isProcessing ? "Processing..." : "Pay Now")}
    </button>
  );
};

PaymentGateway.propTypes = {
  isProcessing: PropTypes.bool.isRequired,
  setIsProcessing: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  metadata: PropTypes.object,
  onSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
};

PaymentGateway.defaultProps = {
  metadata: {},
  onCancel: () => {},
  className: "",
};

export default PaymentGateway;
