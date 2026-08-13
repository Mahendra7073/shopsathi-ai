from datetime import datetime, timedelta, timezone
from app.database import SessionLocal, engine, Base
from app.models import Product, Customer, Order, ReturnRequest, Refund, SupportTicket, AuditLog

def seed_db(db_engine=None, db_session=None):
    """Initializes tables and inserts seed demo data if tables are empty."""
    target_engine = db_engine or engine
    Base.metadata.create_all(bind=target_engine)
    
    db = db_session or SessionLocal()
    should_close = db_session is None

    try:
        if db.query(Product).first():
            print("Database already seeded.")
            return

        print("Seeding database with realistic demo data...")

        # 1. Seed Products
        products = [
            Product(
                product_id="PRD101",
                name="AirPro Wireless Noise-Cancelling Headphones",
                category="Electronics",
                price=4999.0,
                description="Premium active noise cancellation headphones with 30hr battery life.",
                stock=45,
                returnable=True
            ),
            Product(
                product_id="PRD102",
                name="UltraFit Pro Running Shoes",
                category="Footwear",
                price=1899.0,
                description="Lightweight breathable mesh running shoes with shock-absorbing soles.",
                stock=20,
                returnable=True
            ),
            Product(
                product_id="PRD103",
                name="SmartWatch Active 4",
                category="Electronics",
                price=2499.0,
                description="Full touch AMOLED smartwatch with SpO2 and heart rate monitor.",
                stock=15,
                returnable=True
            ),
            Product(
                product_id="PRD104",
                name="Cotton Oxford Casual Shirt",
                category="Fashion",
                price=1299.0,
                description="100% pure breathable cotton slim fit casual shirt.",
                stock=80,
                returnable=True
            ),
            Product(
                product_id="PRD105",
                name="Stainless Steel Insulated Water Bottle 1L",
                category="Home",
                price=799.0,
                description="Double-walled vacuum insulated bottle (non-returnable due to hygiene policy).",
                stock=120,
                returnable=False
            ),
            Product(
                product_id="PRD106",
                name="Ergonomic Memory Foam Pillow",
                category="Home",
                price=1499.0,
                description="Orthopedic neck support memory foam pillow.",
                stock=30,
                returnable=True
            ),
        ]
        db.add_all(products)

        # 2. Seed Customers
        customers = [
            Customer(
                customer_id="CUST101",
                name="Rahul Sharma",
                phone="9876543210",
                email="rahul.sharma@example.com"
            ),
            Customer(
                customer_id="CUST102",
                name="Priya Patel",
                phone="9812345678",
                email="priya.patel@example.com"
            ),
            Customer(
                customer_id="CUST103",
                name="Amit Kumar",
                phone="9988776655",
                email="amit.kumar@example.com"
            ),
        ]
        db.add_all(customers)

        # 3. Seed Orders
        now = datetime.now(timezone.utc).replace(tzinfo=None)
        orders = [
            Order(
                order_id="ORD1001",
                customer_id="CUST101",
                product_id="PRD101",
                quantity=1,
                amount=4999.0,
                status="Out for Delivery",
                order_date=now - timedelta(days=1),
                expected_delivery="Today by 7:00 PM",
                delivered_date=None
            ),
            Order(
                order_id="ORD1002",
                customer_id="CUST102",
                product_id="PRD104",
                quantity=1,
                amount=1299.0,
                status="Delivered",
                order_date=now - timedelta(days=15),
                expected_delivery="Delivered 12 days ago",
                delivered_date=now - timedelta(days=12)
            ),
            Order(
                order_id="ORD1003",
                customer_id="CUST103",
                product_id="PRD102",
                quantity=1,
                amount=1899.0,
                status="Delivered",
                order_date=now - timedelta(days=4),
                expected_delivery="Delivered 2 days ago",
                delivered_date=now - timedelta(days=2)
            ),
            Order(
                order_id="ORD1004",
                customer_id="CUST101",
                product_id="PRD103",
                quantity=1,
                amount=2499.0,
                status="Returned",
                order_date=now - timedelta(days=10),
                expected_delivery="Returned on " + (now - timedelta(days=2)).strftime("%Y-%m-%d"),
                delivered_date=now - timedelta(days=8)
            ),
            Order(
                order_id="ORD1005",
                customer_id="CUST102",
                product_id="PRD106",
                quantity=1,
                amount=1499.0,
                status="Processing",
                order_date=now - timedelta(hours=3),
                expected_delivery="Pending Payment Verification",
                delivered_date=None
            ),
        ]
        db.add_all(orders)

        # 4. Seed Refund
        refund = Refund(
            refund_id="REF7001",
            order_id="ORD1004",
            amount=2499.0,
            status="Initiated",
            initiated_at=now - timedelta(days=1),
            expected_date="Within 2-3 business days to original payment method (Bank AC ending 4091)"
        )
        db.add(refund)

        # 5. Seed Support Ticket
        ticket = SupportTicket(
            ticket_id="TKT9001",
            customer_id="CUST102",
            order_id="ORD1005",
            category="Payment Issue",
            priority="High",
            description="Amount ₹1,499 deducted via UPI transaction #UPI89127391 but order status still shows processing.",
            status="Escalated",
            assigned_to="Tier 2 Human Agent",
            reason_for_escalation="Unresolved payment gateway confirmation failure",
            escalated_at=now - timedelta(hours=1),
            created_at=now - timedelta(hours=2)
        )
        db.add(ticket)

        db.commit()
        print("Database successfully seeded!")
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        if should_close:
            db.close()

if __name__ == "__main__":
    seed_db()
