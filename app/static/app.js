document.addEventListener('DOMContentLoaded', () => {
    const functionSelect = document.getElementById('function-select');
    const inputsContainer = document.getElementById('function-inputs');
    const btnExecute = document.getElementById('btn-execute');
    const jsonOutput = document.getElementById('json-output');
    const btnRefresh = document.getElementById('btn-refresh');

    const inputsMap = {
        check_order_status: `
            <div class="form-group">
                <label>Order ID:</label>
                <input type="text" id="input-order-id" class="form-control" value="ORD1001" placeholder="e.g. ORD1001, ORD1002, ORD1003">
            </div>
        `,
        check_order_status_post: `
            <div class="form-group">
                <label>Order ID (JSON Body):</label>
                <input type="text" id="input-order-id" class="form-control" value="ORD1002" placeholder="e.g. ORD1002, ORD1001, ORD1003">
            </div>
        `,
        check_return_eligibility: `
            <div class="form-group">
                <label>Order ID:</label>
                <input type="text" id="input-order-id" class="form-control" value="ORD1003" placeholder="e.g. ORD1003 (Eligible) or ORD1002 (Expired)">
            </div>
        `,
        check_return_eligibility_post: `
            <div class="form-group">
                <label>Order ID (JSON Body):</label>
                <input type="text" id="input-order-id" class="form-control" value="ORD1003" placeholder="e.g. ORD1003 (Eligible) or ORD1002 (Expired)">
            </div>
        `,
        create_return_request: `
            <div class="form-group">
                <label>Order ID:</label>
                <input type="text" id="input-order-id" class="form-control" value="ORD1003" placeholder="e.g. ORD1003">
            </div>
            <div class="form-group">
                <label>Reason for Return:</label>
                <input type="text" id="input-reason" class="form-control" value="Size is too small, need one size larger" placeholder="Enter return reason">
            </div>
        `,
        check_refund_status: `
            <div class="form-group">
                <label>Order ID:</label>
                <input type="text" id="input-order-id" class="form-control" value="ORD1004" placeholder="e.g. ORD1004">
            </div>
        `,
        search_products: `
            <div class="form-group">
                <label>Search Query:</label>
                <input type="text" id="input-query" class="form-control" value="running shoes" placeholder="e.g. shoes, headphones, shirt">
            </div>
            <div class="form-group">
                <label>Max Price Budget (₹):</label>
                <input type="number" id="input-max-price" class="form-control" value="2500" placeholder="e.g. 2000">
            </div>
            <div class="form-group">
                <label>Category (Optional):</label>
                <input type="text" id="input-category" class="form-control" value="Footwear" placeholder="Electronics, Footwear, Fashion, Home">
            </div>
        `,
        cancel_order: `
            <div class="form-group">
                <label>Order ID:</label>
                <input type="text" id="input-order-id" class="form-control" value="ORD1005" placeholder="e.g. ORD1005">
            </div>
        `,
        cancel_order_post: `
            <div class="form-group">
                <label>Order ID (JSON Body):</label>
                <input type="text" id="input-order-id" class="form-control" value="ORD1005" placeholder="e.g. ORD1005">
            </div>
        `,
        create_support_ticket: `
            <div class="form-group">
                <label>Customer ID:</label>
                <input type="text" id="input-customer-id" class="form-control" value="CUST101" placeholder="e.g. CUST101">
            </div>
            <div class="form-group">
                <label>Category:</label>
                <input type="text" id="input-category" class="form-control" value="Payment Issue" placeholder="Payment Issue, Shipping Delay">
            </div>
            <div class="form-group">
                <label>Description:</label>
                <input type="text" id="input-description" class="form-control" value="Payment deducted ₹1499 via UPI but order status unconfirmed" placeholder="Issue details">
            </div>
            <div class="form-group">
                <label>Order ID (Optional):</label>
                <input type="text" id="input-order-id" class="form-control" value="ORD1005" placeholder="e.g. ORD1005">
            </div>
        `,
        escalate_support_ticket: `
            <div class="form-group">
                <label>Ticket ID:</label>
                <input type="text" id="input-ticket-id" class="form-control" value="TKT9001" placeholder="e.g. TKT9001">
            </div>
            <div class="form-group">
                <label>Reason for Escalation:</label>
                <input type="text" id="input-reason" class="form-control" value="Unresolved payment gateway confirmation failure - customer requesting human assistance" placeholder="Escalation reason">
            </div>
        `
    };

    function updateInputs() {
        const selected = functionSelect.value;
        inputsContainer.innerHTML = inputsMap[selected] || '';
    }

    async function loadAnalytics() {
        try {
            const res = await fetch('/analytics/summary');
            if (!res.ok) return;
            const data = await res.json();

            document.getElementById('metric-total').textContent = data.total_requests;
            document.getElementById('metric-resolved').textContent = data.resolved_by_ai;
            document.getElementById('metric-escalated').textContent = data.escalated_to_human;
            document.getElementById('metric-returns').textContent = data.returns_created;
            document.getElementById('metric-latency').textContent = `${data.avg_response_time_ms}ms`;

            const rowsHtml = data.recent_logs.map(log => `
                <tr>
                    <td><strong>${log.intent || log.function_called}</strong><br><small style="color:#94a3b8">${log.function_called}</small></td>
                    <td><span class="tag ${log.success ? 'tag-success' : 'tag-danger'}">${log.success ? 'Success' : 'Error'}</span></td>
                    <td><span class="tag ${log.escalation ? 'tag-warning' : 'tag-success'}">${log.escalation ? 'Yes (Human)' : 'No (AI)'}</span></td>
                    <td>${log.response_time_ms} ms</td>
                    <td><small style="color:#94a3b8">${new Date(log.timestamp).toLocaleTimeString()}</small></td>
                </tr>
            `).join('');

            document.getElementById('audit-log-rows').innerHTML = rowsHtml || '<tr><td colspan="5" class="text-center">No audit logs recorded yet.</td></tr>';
        } catch (e) {
            console.error('Failed to load analytics', e);
        }
    }

    async function executeFunction() {
        const fn = functionSelect.value;
        jsonOutput.textContent = 'Executing call...';

        let url = '';
        let method = 'GET';
        let body = null;

        try {
            if (fn === 'check_order_status') {
                const id = document.getElementById('input-order-id').value.trim();
                url = `/orders/${id}`;
            } else if (fn === 'check_order_status_post') {
                url = '/orders/lookup';
                method = 'POST';
                body = JSON.stringify({
                    order_id: document.getElementById('input-order-id').value.trim()
                });
            } else if (fn === 'check_return_eligibility') {
                const id = document.getElementById('input-order-id').value.trim();
                url = `/orders/${id}/return-eligibility`;
            } else if (fn === 'check_return_eligibility_post') {
                url = '/orders/return-eligibility';
                method = 'POST';
                body = JSON.stringify({
                    order_id: document.getElementById('input-order-id').value.trim()
                });
            } else if (fn === 'create_return_request') {
                url = '/returns';
                method = 'POST';
                body = JSON.stringify({
                    order_id: document.getElementById('input-order-id').value.trim(),
                    reason: document.getElementById('input-reason').value.trim()
                });
            } else if (fn === 'check_refund_status') {
                const id = document.getElementById('input-order-id').value.trim();
                url = `/orders/${id}/refund`;
            } else if (fn === 'search_products') {
                const q = encodeURIComponent(document.getElementById('input-query').value.trim());
                const price = document.getElementById('input-max-price').value.trim();
                const cat = encodeURIComponent(document.getElementById('input-category').value.trim());
                url = `/products/search?query=${q}&max_price=${price}&category=${cat}`;
            } else if (fn === 'cancel_order') {
                const id = document.getElementById('input-order-id').value.trim();
                url = `/orders/${id}/cancel`;
                method = 'POST';
            } else if (fn === 'cancel_order_post') {
                url = '/orders/cancel';
                method = 'POST';
                body = JSON.stringify({
                    order_id: document.getElementById('input-order-id').value.trim()
                });
            } else if (fn === 'create_support_ticket') {
                url = '/support/tickets';
                method = 'POST';
                body = JSON.stringify({
                    customer_id: document.getElementById('input-customer-id').value.trim(),
                    category: document.getElementById('input-category').value.trim(),
                    description: document.getElementById('input-description').value.trim(),
                    order_id: document.getElementById('input-order-id').value.trim() || null
                });
            } else if (fn === 'escalate_support_ticket') {
                const tId = document.getElementById('input-ticket-id').value.trim();
                url = `/support/tickets/${tId}/escalate`;
                method = 'POST';
                body = JSON.stringify({
                    reason: document.getElementById('input-reason').value.trim()
                });
            }

            const options = {
                method,
                headers: { 'Content-Type': 'application/json' }
            };
            if (body) options.body = body;

            const res = await fetch(url, options);
            const resJson = await res.json();
            jsonOutput.textContent = JSON.stringify(resJson, null, 2);

            // Refresh dashboard analytics
            setTimeout(loadAnalytics, 300);
        } catch (err) {
            jsonOutput.textContent = JSON.stringify({ error: err.message }, null, 2);
        }
    }

    functionSelect.addEventListener('change', updateInputs);
    btnExecute.addEventListener('click', executeFunction);
    btnRefresh.addEventListener('click', loadAnalytics);

    // Initial setup
    updateInputs();
    loadAnalytics();
});
