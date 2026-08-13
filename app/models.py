from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.database import Base

class Product(Base):
    __tablename__ = "products"

    product_id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    category = Column(String, nullable=False, index=True)
    price = Column(Float, nullable=False)
    description = Column(Text, nullable=True)
    stock = Column(Integer, default=0)
    returnable = Column(Boolean, default=True)

    orders = relationship("Order", back_populates="product")


class Customer(Base):
    __tablename__ = "customers"

    customer_id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=False)

    orders = relationship("Order", back_populates="customer")
    tickets = relationship("SupportTicket", back_populates="customer")


class Order(Base):
    __tablename__ = "orders"

    order_id = Column(String, primary_key=True, index=True)
    customer_id = Column(String, ForeignKey("customers.customer_id"), nullable=False)
    product_id = Column(String, ForeignKey("products.product_id"), nullable=False)
    quantity = Column(Integer, default=1)
    amount = Column(Float, nullable=False)
    status = Column(String, nullable=False)  # e.g., "Out for Delivery", "Delivered", "Processing", "Cancelled"
    order_date = Column(DateTime, default=datetime.utcnow)
    expected_delivery = Column(String, nullable=True)
    delivered_date = Column(DateTime, nullable=True)

    customer = relationship("Customer", back_populates="orders")
    product = relationship("Product", back_populates="orders")
    returns = relationship("ReturnRequest", back_populates="order", uselist=False)
    refund = relationship("Refund", back_populates="order", uselist=False)
    tickets = relationship("SupportTicket", back_populates="order")


class ReturnRequest(Base):
    __tablename__ = "returns"

    return_id = Column(String, primary_key=True, index=True)
    order_id = Column(String, ForeignKey("orders.order_id"), nullable=False, unique=True)
    reason = Column(Text, nullable=False)
    status = Column(String, nullable=False, default="Requested")  # Requested, Approved, Processing, Completed, Rejected
    created_at = Column(DateTime, default=datetime.utcnow)

    order = relationship("Order", back_populates="returns")


class Refund(Base):
    __tablename__ = "refunds"

    refund_id = Column(String, primary_key=True, index=True)
    order_id = Column(String, ForeignKey("orders.order_id"), nullable=False, unique=True)
    amount = Column(Float, nullable=False)
    status = Column(String, nullable=False)  # Initiated, Processing, Completed, Failed
    initiated_at = Column(DateTime, default=datetime.utcnow)
    expected_date = Column(String, nullable=True)

    order = relationship("Order", back_populates="refund")


class SupportTicket(Base):
    __tablename__ = "support_tickets"

    ticket_id = Column(String, primary_key=True, index=True)
    customer_id = Column(String, ForeignKey("customers.customer_id"), nullable=False)
    order_id = Column(String, ForeignKey("orders.order_id"), nullable=True)
    category = Column(String, nullable=False)  # Payment Issue, Return Dispute, Shipping Delay, Cancellation, General
    priority = Column(String, nullable=False, default="Medium")  # Low, Medium, High, Critical
    description = Column(Text, nullable=False)
    status = Column(String, nullable=False, default="Open")  # Open, Escalated, In Progress, Resolved
    assigned_to = Column(String, default="AI Agent")
    reason_for_escalation = Column(Text, nullable=True)
    escalated_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    customer = relationship("Customer", back_populates="tickets")
    order = relationship("Order", back_populates="tickets")


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    request_id = Column(String, index=True)
    customer_id = Column(String, nullable=True)
    intent = Column(String, nullable=True)
    function_called = Column(String, nullable=False)
    api_result = Column(Text, nullable=True)
    success = Column(Boolean, default=True)
    escalation = Column(Boolean, default=False)
    response_time_ms = Column(Float, default=0.0)
    timestamp = Column(DateTime, default=datetime.utcnow)
