from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field, ConfigDict

# --- Product Schemas ---
class ProductBase(BaseModel):
    product_id: str
    name: str
    category: str
    price: float
    description: Optional[str] = None
    stock: int
    returnable: bool

class ProductResponse(ProductBase):
    model_config = ConfigDict(from_attributes=True)


class ProductSearchRequest(BaseModel):
    query: str = Field(..., description="Search query string e.g. wireless headphones, shirts")
    max_price: Optional[float] = Field(None, description="Optional maximum price budget")
    category: Optional[str] = Field(None, description="Optional product category filter")


# --- Customer Schemas ---
class CustomerBase(BaseModel):
    customer_id: str
    name: str
    phone: str
    email: str

class CustomerResponse(CustomerBase):
    model_config = ConfigDict(from_attributes=True)


# --- Order Schemas ---
class OrderResponse(BaseModel):
    order_id: str
    status: str
    expected_delivery: Optional[str] = None
    tracking_available: bool = True
    product_name: str
    product_id: str
    customer_id: str
    quantity: int
    amount: float
    order_date: datetime
    delivered_date: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


class OrderLookupRequest(BaseModel):
    order_id: str = Field(..., description="Order ID to lookup e.g. ORD1002")


class OrderCancelRequest(BaseModel):
    order_id: str = Field(..., description="Order ID to cancel e.g. ORD1005")


class OrderCancelResponse(BaseModel):
    success: bool = True
    order_id: str
    status: str
    message: str


class ReturnEligibilityRequest(BaseModel):
    order_id: str = Field(..., description="Order ID to check return eligibility e.g. ORD1003")


class ReturnEligibilityResponse(BaseModel):
    order_id: str
    eligible: bool
    reason: str
    days_since_delivery: Optional[int] = None
    returnable_policy: bool


class CreateReturnRequest(BaseModel):
    order_id: str = Field(..., description="Order ID to be returned e.g. ORD1003")
    reason: str = Field(..., description="Reason for return request")


class ReturnResponse(BaseModel):
    success: bool = True
    return_id: str
    order_id: str
    reason: str
    status: str
    created_at: datetime
    message: str

    model_config = ConfigDict(from_attributes=True)


# --- Refund Schemas ---
class RefundStatusRequest(BaseModel):
    order_id: str = Field(..., description="Order ID to check refund status e.g. ORD1004")


class RefundResponse(BaseModel):
    order_id: str
    refund_status: str
    amount: float
    expected_date: Optional[str] = None
    refund_id: str
    initiated_at: datetime
    message: str

    model_config = ConfigDict(from_attributes=True)


# --- Support Ticket Schemas ---
class CreateSupportTicketRequest(BaseModel):
    customer_id: str = Field(..., description="Customer ID creating the ticket e.g. CUST101")
    description: str = Field(..., description="Detailed issue description")
    subject: Optional[str] = Field(None, description="Ticket subject e.g. Issue with order ORD1001")
    category: Optional[str] = Field(None, description="Issue category e.g. Payment Issue, Shipping Delay, Return Dispute")
    priority: Optional[str] = Field("Medium", description="Ticket priority: Low, Medium, High, Critical")
    order_id: Optional[str] = Field(None, description="Associated Order ID if applicable")


class SupportTicketResponse(BaseModel):
    success: bool = True
    ticket_id: str
    customer_id: str
    subject: Optional[str] = None
    category: str
    priority: str
    description: str
    status: str
    assigned_to: str
    order_id: Optional[str] = None
    reason_for_escalation: Optional[str] = None
    escalated_at: Optional[datetime] = None
    created_at: datetime
    message: str

    model_config = ConfigDict(from_attributes=True)


class EscalateTicketRequest(BaseModel):
    reason: Optional[str] = Field("Escalated by AI Agent due to unresolved complex issue", description="Reason for escalating to human agent")


class EscalateTicketPostRequest(BaseModel):
    ticket_id: str = Field(..., description="Ticket ID to escalate e.g. TKT9001")
    reason: Optional[str] = Field("Escalated by AI Agent due to unresolved complex issue", description="Reason for escalating to human agent")


# --- Observability / Analytics Schemas ---
class AnalyticsSummaryResponse(BaseModel):
    total_requests: int
    resolved_by_ai: int
    escalated_to_human: int
    returns_created: int
    refunds_checked: int
    cancellations: int
    avg_response_time_ms: float
    recent_logs: List[dict]
