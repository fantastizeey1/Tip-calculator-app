document.addEventListener('DOMContentLoaded', function () {
    // Get elements from the DOM
    const billAmount = document.getElementById('bill');
    const tipButtons = document.querySelectorAll('.tip-btns button');
    const customTipPercentage = document.getElementById('custom');
    const numOfPeople = document.getElementById('people');
    const tipEachElement = document.getElementById('tip-each');
    const totalTipElement = document.getElementById('total-tip');
    const resetButton = document.getElementById('resetBtn');
    const errorLabel = document.getElementById('error');
  
    function calculateTip(bill, tip, people) {
      if (isNaN(bill) || isNaN(tip) || isNaN(people) || bill <= 0 || people <= 0) {
        errorLabel.style.display = 'block';
        return;
      } else {
        errorLabel.style.display = 'none';
      }
  
      const tipPerPerson =  ((bill * tip)/100)/people;
      const totalPerPerson = (bill + ((bill * tip)/100))/ people ;
  
      tipEachElement.textContent = `$${tipPerPerson.toFixed(2)}`;
      totalTipElement.textContent = `$${totalPerPerson.toFixed(2)}`;
    }
  
    tipButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        tipButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const tipValue = parseInt(e.target.textContent);
        calculateTip(parseFloat(billAmount.value), tipValue, parseInt(numOfPeople.value));
      });
    });
  
    customTipPercentage.addEventListener('blur', () => {
      if (billAmount.value === "") {
        resetEverything();
        return;
      }
  
      const customTipValue = parseFloat(customTipPercentage.value);
      if (!isNaN(customTipValue)) {
        calculateTip(parseFloat(billAmount.value), customTipValue, parseInt(numOfPeople.value));
      }
    });
  
    resetButton.addEventListener('click', () => {
      resetEverything();
    });
  
    function resetEverything() {
      billAmount.value = '';
      customTipPercentage.value = '';
      numOfPeople.value = '';
      tipButtons.forEach(btn => btn.classList.remove('active'));
      errorLabel.style.display = 'none';
      tipEachElement.textContent = '$0.00';
      totalTipElement.textContent = '$0.00';
    }
  
    // Event listener for input changes
    billAmount.addEventListener('input', () => {
      calculateTip(parseFloat(billAmount.value), parseFloat(customTipPercentage.value), parseInt(numOfPeople.value));
    });
  
    numOfPeople.addEventListener('input', () => {
      calculateTip(parseFloat(billAmount.value), parseFloat(customTipPercentage.value), parseInt(numOfPeople.value));
    });
  });
  