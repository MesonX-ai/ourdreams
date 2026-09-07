"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type CartItem = {
  product_id: number;
  quantity: number;
};

type PaymentMethod = {
  id: string;
  title: string;
  enabled: boolean;
};

type CheckoutValues = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  address1: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  paymentMethod: string;
  agree: boolean;
};

type WooOrderResponse = {
  id: number;
  status: string;
  order_key: string;
};

type WooCommerceCheckoutFormProps = {
  cartItems: CartItem[];
  onOrderCreated?: (order: WooOrderResponse) => void;
  endpointBasePaths?: string[];
};

const DEFAULT_ENDPOINTS = ["/api/api.php", "/api/api", "/php/api.php", "/api.php"];

const initialValues: CheckoutValues = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  address1: "",
  city: "",
  state: "",
  postcode: "",
  country: "US",
  paymentMethod: "",
  agree: false,
};

export default function WooCommerceCheckoutForm({
  cartItems,
  onOrderCreated,
  endpointBasePaths = DEFAULT_ENDPOINTS,
}: WooCommerceCheckoutFormProps) {
  const [form, setForm] = useState<CheckoutValues>(initialValues);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoadingMethods, setIsLoadingMethods] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const hasItems = cartItems.length > 0;

  const enabledMethods = useMemo(
    () => paymentMethods.filter((method) => method.enabled),
    [paymentMethods]
  );

  useEffect(() => {
    let active = true;

    async function loadPaymentMethods() {
      setIsLoadingMethods(true);
      setError(null);

      try {
        let loaded: PaymentMethod[] | null = null;

        for (const endpoint of endpointBasePaths) {
          const response = await fetch(`${endpoint}?path=payment_gateways`, { cache: "no-store" });
          if (!response.ok) {
            continue;
          }

          const data = (await response.json()) as PaymentMethod[];
          loaded = Array.isArray(data) ? data : [];
          break;
        }

        if (!loaded) {
          throw new Error("Unable to load payment methods from WooCommerce.");
        }

        if (active) {
          setPaymentMethods(loaded);
        }
      } catch (loadError) {
        if (active) {
          const message =
            loadError instanceof Error
              ? loadError.message
              : "Unable to load payment methods.";
          setError(message);
        }
      } finally {
        if (active) {
          setIsLoadingMethods(false);
        }
      }
    }

    loadPaymentMethods();

    return () => {
      active = false;
    };
  }, [endpointBasePaths]);

  useEffect(() => {
    if (!form.paymentMethod && enabledMethods.length > 0) {
      setForm((current) => ({ ...current, paymentMethod: enabledMethods[0].id }));
    }
  }, [enabledMethods, form.paymentMethod]);

  const onInput = (field: keyof CheckoutValues, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const validate = (): string | null => {
    if (!hasItems) {
      return "Your cart is empty.";
    }
    if (!form.firstName.trim() || !form.lastName.trim()) {
      return "Please enter first and last name.";
    }
    if (!form.email.trim() || !form.email.includes("@")) {
      return "Please enter a valid email address.";
    }
    if (!form.phone.trim()) {
      return "Please enter phone number.";
    }
    if (!form.address1.trim() || !form.city.trim() || !form.state.trim() || !form.postcode.trim()) {
      return "Please complete shipping address fields.";
    }
    if (!form.paymentMethod) {
      return "Please choose a payment method.";
    }
    if (!form.agree) {
      return "You must accept the agreement before placing the order.";
    }
    return null;
  };

  const submitOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccess(null);

    const invalidReason = validate();
    if (invalidReason) {
      setError(invalidReason);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const selectedMethod = enabledMethods.find((item) => item.id === form.paymentMethod);

    const payload = {
      payment_method: form.paymentMethod,
      payment_method_title: selectedMethod?.title || form.paymentMethod,
      set_paid: false,
      billing: {
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        company: form.company.trim(),
        address_1: form.address1.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        postcode: form.postcode.trim(),
        country: form.country.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      },
      shipping: {
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        company: form.company.trim(),
        address_1: form.address1.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        postcode: form.postcode.trim(),
        country: form.country.trim(),
      },
      line_items: cartItems,
    };

    try {
      let created: WooOrderResponse | null = null;

      for (const endpoint of endpointBasePaths) {
        const response = await fetch(`${endpoint}?path=orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          continue;
        }

        const data = (await response.json()) as WooOrderResponse;
        created = data;
        break;
      }

      if (!created) {
        throw new Error("Order submission failed on all configured WooCommerce proxy endpoints.");
      }

      setSuccess(`Order #${created.id} created successfully.`);
      setForm((current) => ({
        ...initialValues,
        paymentMethod: current.paymentMethod,
      }));

      if (onOrderCreated) {
        onOrderCreated(created);
      }
    } catch (submitError) {
      const message =
        submitError instanceof Error ? submitError.message : "Unable to place order.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={submitOrder} style={{ display: "grid", gap: 12, maxWidth: 760 }}>
      <h2 style={{ margin: 0 }}>Checkout</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <input placeholder="First name" value={form.firstName} onChange={(e) => onInput("firstName", e.target.value)} />
        <input placeholder="Last name" value={form.lastName} onChange={(e) => onInput("lastName", e.target.value)} />
      </div>

      <input placeholder="Company" value={form.company} onChange={(e) => onInput("company", e.target.value)} />
      <input placeholder="Email" type="email" value={form.email} onChange={(e) => onInput("email", e.target.value)} />
      <input placeholder="Phone" value={form.phone} onChange={(e) => onInput("phone", e.target.value)} />
      <input placeholder="Address" value={form.address1} onChange={(e) => onInput("address1", e.target.value)} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        <input placeholder="City" value={form.city} onChange={(e) => onInput("city", e.target.value)} />
        <input placeholder="State" value={form.state} onChange={(e) => onInput("state", e.target.value)} />
        <input placeholder="Postal code" value={form.postcode} onChange={(e) => onInput("postcode", e.target.value)} />
      </div>

      <select
        value={form.country}
        onChange={(e) => onInput("country", e.target.value)}
        aria-label="Country"
      >
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="GB">United Kingdom</option>
        <option value="AU">Australia</option>
      </select>

      <label style={{ display: "grid", gap: 6 }}>
        <span>Payment method</span>
        <select
          value={form.paymentMethod}
          onChange={(e) => onInput("paymentMethod", e.target.value)}
          disabled={isLoadingMethods}
        >
          {isLoadingMethods ? <option>Loading methods...</option> : null}
          {!isLoadingMethods && enabledMethods.length === 0 ? <option>No payment methods</option> : null}
          {!isLoadingMethods
            ? enabledMethods.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.title}
                </option>
              ))
            : null}
        </select>
      </label>

      <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input
          type="checkbox"
          checked={form.agree}
          onChange={(e) => onInput("agree", e.target.checked)}
        />
        I have read and agree to the checkout terms.
      </label>

      {error ? <p style={{ margin: 0, color: "#b91c1c" }}>{error}</p> : null}
      {success ? <p style={{ margin: 0, color: "#047857" }}>{success}</p> : null}

      <button type="submit" disabled={isSubmitting || isLoadingMethods}>
        {isSubmitting ? "Placing order..." : "Place order"}
      </button>
    </form>
  );
}
