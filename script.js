let items = [];
let totalAmount = 0;

// Add item
function addItem() {
  const name = document.getElementById('itemName').value;
  const qty = parseInt(document.getElementById('itemQty').value);
  const rate = parseFloat(document.getElementById('itemRate').value);

  if (!name || !qty || !rate) {
    alert("Please enter item details!");
    return;
  }

  const amount = qty * rate;
  items.push({ name, qty, rate, amount });
  totalAmount += amount;

  document.getElementById('totalAmount').value = totalAmount.toFixed(2);

  updateBillPreview();
}

// Update bill preview
function updateBillPreview() {
  const previewItems = document.getElementById('previewItems');
  previewItems.innerHTML = '';

  items.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.name}</td>
      <td>${item.qty}</td>
      <td>${item.rate}</td>
      <td>${item.amount}</td>
    `;
    previewItems.appendChild(row);
  });

  document.getElementById('previewTotal').textContent = totalAmount.toFixed(2);
  calculateBalance();
}

// Calculate balance
function calculateBalance() {
  const paid = parseFloat(document.getElementById('paidAmount').value) || 0;
  const balance = paid - totalAmount;

  document.getElementById('balanceAmount').value = balance.toFixed(2);
  document.getElementById('previewPaid').textContent = paid.toFixed(2);
  document.getElementById('previewBalance').textContent = balance.toFixed(2);
}

// Save bill to history
function saveBill() {
  const name = document.getElementById('customerName').value;
  const mobile = document.getElementById('customerMobile').value;
  const address = document.getElementById('customerAddress').value;
  const paid = parseFloat(document.getElementById('paidAmount').value) || 0;
  const balance = paid - totalAmount;

  const bill = {
    id: Date.now(),
    customerName: name,
    mobile,
    address,
    items,
    total: totalAmount,
    paid,
    balance
  };

  const history = document.getElementById('billHistory');
  const li = document.createElement('li');
  li.innerHTML = `<strong>${bill.customerName}</strong> - Total: ₹${bill.total}, Paid: ₹${bill.paid}, Balance: ₹${bill.balance}`;
  history.appendChild(li);

  // Reset form
  items = [];
  totalAmount = 0;
  document.getElementById('customerName').value = '';
  document.getElementById('customerMobile').value = '';
  document.getElementById('customerAddress').value = '';
  document.getElementById('itemName').value = '';
  document.getElementById('itemQty').value = '';
  document.getElementById('itemRate').value = '';
  document.getElementById('totalAmount').value = '0';
  document.getElementById('paidAmount').value = '';
  document.getElementById('balanceAmount').value = '0';
  document.getElementById('previewItems').innerHTML = '';
  document.getElementById('previewTotal').textContent = '0';
  document.getElementById('previewPaid').textContent = '0';
  document.getElementById('previewBalance').textContent = '0';
}
