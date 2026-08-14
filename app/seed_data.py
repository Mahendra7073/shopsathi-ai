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
        # Check if already seeded with full dataset (>= 50 orders)
        order_count = db.query(Order).count()
        if order_count >= 50:
            print(f"Database already seeded with {order_count} orders.")
            return

        # If partial seed exists, re-seed cleanly
        if db.query(Product).first():
            print("Refreshing database with full ~50 order dataset...")
            db.query(AuditLog).delete()
            db.query(SupportTicket).delete()
            db.query(Refund).delete()
            db.query(ReturnRequest).delete()
            db.query(Order).delete()
            db.query(Customer).delete()
            db.query(Product).delete()
            db.commit()

        print("Seeding database with realistic demo dataset (52 orders)...")

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
            Customer(
                customer_id="CUST104",
                name="Sneha Gupta",
                phone="9765432109",
                email="sneha.gupta@example.com"
            ),
            Customer(
                customer_id="CUST105",
                name="Vikram Malhotra",
                phone="9823456781",
                email="vikram.m@example.com"
            ),
        ]
        db.add_all(customers)

        # 3. Seed Orders (Preserve ORD1001-ORD1005 + Expanded to ORD1052)
        now = datetime.now(timezone.utc).replace(tzinfo=None)

        orders_data = [
            # --- CRITICAL DEMO ORDERS (1-5) ---
            ("ORD1001", "CUST101", "PRD101", 1, 4999.0, "Out for Delivery", 1, 0, "Today by 7:00 PM", None),
            ("ORD1002", "CUST102", "PRD104", 1, 1299.0, "Delivered", 15, 0, "Delivered 12 days ago", 12),
            ("ORD1003", "CUST103", "PRD102", 1, 1899.0, "Delivered", 4, 0, "Delivered 2 days ago", 2),
            ("ORD1004", "CUST101", "PRD103", 1, 2499.0, "Returned", 10, 0, "Returned on " + (now - timedelta(days=2)).strftime("%Y-%m-%d"), 8),
            ("ORD1005", "CUST102", "PRD106", 1, 1499.0, "Processing", 0, 3, "Pending Payment Verification", None),

            # --- EXPANDED ORDERS (ORD1006 - ORD1052) ---
            # Processing (8 orders)
            ("ORD1006", "CUST101", "PRD104", 2, 2598.0, "Processing", 0, 4, "Payment Confirmed - Order in queue", None),
            ("ORD1007", "CUST103", "PRD101", 1, 4999.0, "Processing", 0, 6, "Payment Confirmed - Processing invoice", None),
            ("ORD1008", "CUST104", "PRD102", 1, 1899.0, "Processing", 0, 8, "Awaiting warehouse allocation", None),
            ("ORD1009", "CUST105", "PRD105", 2, 1598.0, "Processing", 0, 10, "Order Placed - Awaiting fulfillment", None),
            ("ORD1010", "CUST101", "PRD106", 1, 1499.0, "Processing", 0, 12, "Verification in progress", None),
            ("ORD1011", "CUST102", "PRD103", 1, 2499.0, "Processing", 0, 14, "Order Placed - Stock reserved", None),
            ("ORD1012", "CUST103", "PRD104", 1, 1299.0, "Processing", 0, 16, "Processing order details", None),

            # Confirmed (5 orders)
            ("ORD1013", "CUST101", "PRD102", 1, 1899.0, "Confirmed", 1, 2, "Confirmed - Delivery expected in 3 days", None),
            ("ORD1014", "CUST104", "PRD101", 1, 4999.0, "Confirmed", 1, 4, "Confirmed - Dispatching soon", None),
            ("ORD1015", "CUST102", "PRD105", 3, 2397.0, "Confirmed", 1, 6, "Confirmed - Expected delivery in 4 days", None),
            ("ORD1016", "CUST105", "PRD104", 2, 2598.0, "Confirmed", 1, 8, "Confirmed - Ready for warehouse pick", None),
            ("ORD1017", "CUST103", "PRD106", 2, 2998.0, "Confirmed", 1, 10, "Confirmed - Expected delivery in 3 days", None),

            # Packed (5 orders)
            ("ORD1018", "CUST101", "PRD103", 1, 2499.0, "Packed", 2, 0, "Packed - Courier pickup scheduled", None),
            ("ORD1019", "CUST102", "PRD102", 2, 3798.0, "Packed", 2, 2, "Packed at Mumbai Fulfillment Center", None),
            ("ORD1020", "CUST104", "PRD104", 1, 1299.0, "Packed", 2, 4, "Packed - Awaiting courier handover", None),
            ("ORD1021", "CUST103", "PRD101", 1, 4999.0, "Packed", 2, 6, "Packed at Delhi Hub", None),
            ("ORD1022", "CUST105", "PRD106", 1, 1499.0, "Packed", 2, 8, "Packed - Shipping label created", None),

            # Shipped (7 orders)
            ("ORD1023", "CUST101", "PRD105", 1, 799.0, "Shipped", 3, 0, "In Transit - Expected in 2 days", None),
            ("ORD1024", "CUST102", "PRD101", 1, 4999.0, "Shipped", 3, 2, "Shipped via BlueDart - Tracking #BD8921", None),
            ("ORD1025", "CUST103", "PRD103", 1, 2499.0, "Shipped", 3, 4, "In Transit via Delhivery #DL7721", None),
            ("ORD1026", "CUST104", "PRD106", 1, 1499.0, "Shipped", 3, 6, "In Transit to Destination Hub", None),
            ("ORD1027", "CUST105", "PRD102", 1, 1899.0, "Shipped", 4, 0, "Shipped - Arrived at Regional Center", None),
            ("ORD1028", "CUST101", "PRD104", 3, 3897.0, "Shipped", 4, 2, "In Transit via Express Courier", None),
            ("ORD1029", "CUST102", "PRD105", 2, 1598.0, "Shipped", 4, 4, "In Transit - Reaching local hub soon", None),

            # Out for Delivery (6 orders)
            ("ORD1030", "CUST102", "PRD102", 1, 1899.0, "Out for Delivery", 1, 0, "Out for delivery by Courier Partner", None),
            ("ORD1031", "CUST103", "PRD106", 1, 1499.0, "Out for Delivery", 1, 0, "Delivery boy assigned - Arriving by 5 PM", None),
            ("ORD1032", "CUST104", "PRD103", 1, 2499.0, "Out for Delivery", 1, 0, "Out for delivery today", None),
            ("ORD1033", "CUST105", "PRD101", 1, 4999.0, "Out for Delivery", 1, 0, "Delivery scheduled before 8 PM", None),
            ("ORD1034", "CUST101", "PRD102", 1, 1899.0, "Out for Delivery", 1, 0, "Out for delivery in your area", None),
            ("ORD1035", "CUST103", "PRD105", 1, 799.0, "Out for Delivery", 1, 0, "Out for delivery - OTP sent", None),

            # Delivered (12 orders)
            ("ORD1036", "CUST101", "PRD101", 1, 4999.0, "Delivered", 5, 0, "Delivered 3 days ago", 3),
            ("ORD1037", "CUST102", "PRD103", 1, 2499.0, "Delivered", 6, 0, "Delivered 4 days ago", 4),
            ("ORD1038", "CUST103", "PRD104", 2, 2598.0, "Delivered", 7, 0, "Delivered 5 days ago", 5),
            ("ORD1039", "CUST104", "PRD102", 1, 1899.0, "Delivered", 8, 0, "Delivered 6 days ago", 6),
            ("ORD1040", "CUST105", "PRD106", 2, 2998.0, "Delivered", 10, 0, "Delivered 8 days ago", 8),
            ("ORD1041", "CUST101", "PRD105", 1, 799.0, "Delivered", 12, 0, "Delivered 10 days ago", 10),
            ("ORD1042", "CUST102", "PRD106", 1, 1499.0, "Delivered", 14, 0, "Delivered 11 days ago", 11),
            ("ORD1043", "CUST103", "PRD101", 1, 4999.0, "Delivered", 16, 0, "Delivered 13 days ago", 13),
            ("ORD1044", "CUST104", "PRD104", 1, 1299.0, "Delivered", 18, 0, "Delivered 15 days ago", 15),
            ("ORD1045", "CUST105", "PRD103", 1, 2499.0, "Delivered", 20, 0, "Delivered 17 days ago", 17),
            ("ORD1046", "CUST101", "PRD102", 2, 3798.0, "Delivered", 22, 0, "Delivered 19 days ago", 19),
            ("ORD1047", "CUST102", "PRD101", 1, 4999.0, "Delivered", 25, 0, "Delivered 21 days ago", 21),

            # Cancelled (3 orders)
            ("ORD1048", "CUST101", "PRD103", 1, 2499.0, "Cancelled", 3, 0, "Order cancelled by customer", None),
            ("ORD1049", "CUST103", "PRD101", 1, 4999.0, "Cancelled", 5, 0, "Order cancelled - Refund processed", None),
            ("ORD1050", "CUST104", "PRD106", 1, 1499.0, "Cancelled", 7, 0, "Cancelled prior to dispatch", None),

            # Return Requested & Returned (2 orders)
            ("ORD1051", "CUST105", "PRD102", 1, 1899.0, "Return Requested", 6, 0, "Return requested - Pickup scheduled", 4),
            ("ORD1052", "CUST102", "PRD104", 1, 1299.0, "Returned", 12, 0, "Returned on " + (now - timedelta(days=3)).strftime("%Y-%m-%d"), 9),
        ]

        orders = []
        for (oid, cid, pid, qty, amt, stat, days_ago, hours_ago, exp_del, del_days_ago) in orders_data:
            odate = now - timedelta(days=days_ago, hours=hours_ago)
            ddate = (now - timedelta(days=del_days_ago)) if del_days_ago is not None else None
            orders.append(
                Order(
                    order_id=oid,
                    customer_id=cid,
                    product_id=pid,
                    quantity=qty,
                    amount=amt,
                    status=stat,
                    order_date=odate,
                    expected_delivery=exp_del,
                    delivered_date=ddate
                )
            )
        db.add_all(orders)

        # 4. Seed Refunds
        refunds = [
            Refund(
                refund_id="REF7001",
                order_id="ORD1004",
                amount=2499.0,
                status="Initiated",
                initiated_at=now - timedelta(days=1),
                expected_date="Within 2-3 business days to original payment method (Bank AC ending 4091)"
            ),
            Refund(
                refund_id="REF7002",
                order_id="ORD1049",
                amount=4999.0,
                status="Completed",
                initiated_at=now - timedelta(days=4),
                expected_date="Completed on " + (now - timedelta(days=2)).strftime("%Y-%m-%d")
            ),
            Refund(
                refund_id="REF7003",
                order_id="ORD1052",
                amount=1299.0,
                status="Processing",
                initiated_at=now - timedelta(days=2),
                expected_date="Expected within 24 hours to UPI VPA"
            )
        ]
        db.add_all(refunds)

        # 5. Seed Return Requests
        returns = [
            ReturnRequest(
                return_id="RET6001",
                order_id="ORD1004",
                reason="Wrong color received (ordered Black, received Silver)",
                status="Completed",
                created_at=now - timedelta(days=2)
            ),
            ReturnRequest(
                return_id="RET6002",
                order_id="ORD1051",
                reason="Shoe size too small (Need UK 10 instead of UK 9)",
                status="Requested",
                created_at=now - timedelta(days=1)
            ),
            ReturnRequest(
                return_id="RET6003",
                order_id="ORD1052",
                reason="Fabric material quality not as expected",
                status="Completed",
                created_at=now - timedelta(days=3)
            )
        ]
        db.add_all(returns)

        # 6. Seed Support Tickets
        tickets = [
            SupportTicket(
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
            ),
            SupportTicket(
                ticket_id="TKT9002",
                customer_id="CUST101",
                order_id="ORD1001",
                category="Shipping Delay",
                priority="Medium",
                description="Package out for delivery since 8 AM. Need delivery before 6 PM.",
                status="Open",
                assigned_to="AI Agent",
                created_at=now - timedelta(hours=3)
            ),
            SupportTicket(
                ticket_id="TKT9003",
                customer_id="CUST103",
                order_id="ORD1003",
                category="Return Dispute",
                priority="Low",
                description="Inquiry regarding pickup window for returned shoes.",
                status="Resolved",
                assigned_to="AI Agent",
                created_at=now - timedelta(days=1)
            )
        ]
        db.add_all(tickets)

        db.commit()
        print(f"Database successfully seeded! {len(orders)} orders, {len(customers)} customers, {len(products)} products, {len(refunds)} refunds, {len(tickets)} tickets.")
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        if should_close:
            db.close()

if __name__ == "__main__":
    seed_db()
