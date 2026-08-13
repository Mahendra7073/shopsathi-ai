# ShopSathi AI — E-Commerce Knowledge Base & Customer Support Policy

---

## 1. Shipping Policy

* **Standard Delivery**: Orders are processed within 24 hours. Standard delivery takes 3 to 5 business days across India.
* **Express Delivery**: Available in select metro cities (Delhi, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata) within 24–48 hours.
* **Order Tracking**: Customers can check live order status at any time by providing their Order ID (formatted as `ORDxxxx`).
* **Delivery Delays**: If an order is delayed beyond the expected date by more than 48 hours, customers are eligible for free priority dispatch or order cancellation.

---

## 2. Return Policy

* **Return Window**: Customers can return eligible items within **7 calendar days** of delivery.
* **Return Conditions**: Items must be unused, in original packaging with intact tags and invoices.
* **Non-Returnable Items**:
  * Personal care & hygiene products (e.g. water bottles, innerwear).
  * Clearance sale items explicitly marked as non-returnable.
  * Customized or personalized merchandise.
* **Return Process**: Once a return request is submitted, a pickup is scheduled within 24 to 48 hours. Upon pickup inspection, refund processing is initiated.

---

## 3. Refund Policy

* **Refund Initiation**: Refunds are initiated automatically upon successful pickup and quality check of returned products.
* **Payout Timelines**:
  * **UPI / Net Banking / Credit Card / Debit Card**: 2 to 3 business days after initiation.
  * **Cash on Delivery (COD)**: Refund transferred via UPI link or Bank IMPS within 3 business days after customer provides bank details.
* **Failed Refunds**: If a refund fails due to bank server issues, an automated retry occurs within 24 hours. If unresolved after 3 days, escalate to human support.

---

## 4. Cancellation Policy

* **Eligible Cancellation Period**: Orders in status `Processing` or `Order Placed` can be cancelled immediately without penalty.
* **Ineligible Cancellation**: Orders that are already `Out for Delivery` or `Delivered` cannot be cancelled. The customer must wait for delivery and submit a Return Request instead.
* **Refund on Cancellation**: Prepaid orders will have refunds credited back to original payment methods within 3 to 5 business days.

---

## 5. Payment FAQs & Discrepancies

* **Payment Deducted but Order Not Confirmed**:
  * This is usually a temporary bank gateway hold.
  * If order status is unconfirmed after 1 hour, create a Support Ticket with category `Payment Issue` and priority `High`.
  * Money is automatically reversed by the bank within 24 to 48 hours if transaction failed.
* **Accepted Payment Methods**: Credit Cards, Debit Cards, UPI (Google Pay, PhonePe, Paytm), Net Banking, and Cash on Delivery (COD).

---

## 6. Human Escalation Rules

The AI Agent MUST escalate the ticket to a human support agent (`POST /support/tickets/{ticket_id}/escalate`) when:
1. Customer explicitly demands a human representative (e.g., "Mujhe human agent se baat karni hai").
2. Unresolved payment disputes exceeding ₹1,000 where money was deducted without order placement.
3. Delayed refunds exceeding 5 business days past expected date.
4. Complex damage disputes where customer receives broken items and demands special compensation.
5. High customer frustration or repeated negative sentiments.

---

## 7. Security & Privacy Rules

* **CRITICAL SAFETY RULE**: Never ask for or accept OTPs, credit/debit card numbers, CVVs, UPI PINs, online banking passwords, or account passwords.
* **Identity Verification**: Always verify Order ID (`ORDxxxx`) and Customer ID (`CUSTxxxx`) before taking account actions.
* **Confidentiality**: Customer personal information (phone number, address) must never be shared with third parties.

---

## 8. Supported Languages & Tone

* **Languages**: English, Hindi, Hinglish (Hindi written in Roman script).
* **Tone**: Polite, empathetic, prompt, professional, and clear.
* **Guideline**: Respond in the exact language used by the customer. Function arguments (Order IDs, amounts) remain standard alphanumeric strings regardless of conversation language.
