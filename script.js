

        const inputElement = document.getElementById('myInput');
        const spanElement = document.getElementById('mySpan');
        const spanElement1 = document.getElementById('mySpan1');
        // Add an event listener to update the span whenever the input changes
        inputElement.addEventListener('input', function() {
            spanElement.value = inputElement.value;
            spanElement1.value = inputElement.value;
        });

        const inputElementM = document.getElementById('mynumberinput');
        const spanElementM = document.getElementById('mynumber');
        inputElementM.addEventListener('input', function() {
            spanElementM.value = inputElementM.value;
        });

    let totalAmount = 0;
    document.getElementById('date').textContent = new Date().toLocaleDateString();

    // Update quantity function
    function changeQuantity(amount) {
        const qtyInput = document.getElementById('itemQty');
        const currentQty = parseInt(qtyInput.value);
        qtyInput.value = Math.max(1, currentQty + amount);
    }
  
    function addItem() {
        const itemName = document.getElementById('itemDropdown').value;
        const itemQty = parseInt(document.getElementById('itemQty').value);
        const itemPrice = parseFloat(document.getElementById('itemPrice').value);
        if(itemName && itemQty > 0 && itemPrice > 0) {
            const itemTotal = itemQty * itemPrice;
            totalAmount += itemTotal;

            // const itemsBody = document.getElementById('itemBody');
            // const newRow = document.createElement('tr');
           
            const table = document.getElementById("itemBody");
            const newRow = table.insertRow();

            newRow.innerHTML =
            `<td><input name="itemName[]" id="IN" value="${itemName}"  class="hiddeninput"></td>
            <td><input name="itemQty[]" id="IQ" value="${itemQty}"  class="hiddeninput"></td>
            <td><input name="itemPrice[]" id="IP" value="${itemPrice}"  class="hiddeninput"></td>
            <td><input name="itemTotal[]" id="IT" value="${itemTotal.toFixed(2)}"  class="hiddeninput"></td>`;
          
            // itemsBody.appendChild(newRow);
            document.getElementById('total').value = totalAmount.toFixed(2);
            document.getElementById('itemPrice').value = '';
        } 
        
        else {
            alert('Please fill out all fields with valid values.');
        }
    }

    function printDiv() {
    var divToPrint = document.getElementById('printableDiv');
    var newWin = window.open('', 'Print-Window');
    
    newWin.document.open();
    newWin.document.write('<html><head><title>Print Div</title>');
    newWin.document.write('<link rel="stylesheet" type="text/css" href="styles.css">');
    newWin.document.write('<html><head><title>Print Div</title></head><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');
    newWin.document.close();
    setTimeout(function() { newWin.close(); }, 10);
    return true;
}

//submitting form using button which is actually outside of a form..
    document.getElementById('submitprint').addEventListener('click', function() {
    document.getElementById('submitbtn').click();});


// New item on hitting enter key..
document.getElementById('itemPrice').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addItem();
    }
});

