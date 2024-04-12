
const ageDropdown = document.getElementById("age");
const incomeInput = document.getElementById("income");
const extraIncomeInput = document.getElementById("extraincome");
const deductionsInput = document.getElementById("deductions");
const submitBtn = document.querySelector("button[type='submit']");

const ageErrorIcon = document.getElementById("ageError");
const ageTooltip = document.getElementById("ageTooltip");
const incomeErrorIcon = document.getElementById("incomeError");
const extraIncomeErrorIcon = document.getElementById("extraIncomeError");
const deductionsErrorIcon = document.getElementById("deductionsError");

const showModalBtn = document.querySelector("[data-bs-dismiss='modal']");
const modalBody = document.querySelector(".modal-body p");


hideAllErrorIcons();

ageDropdown.addEventListener("change", function () {
    // Check if a valid age option is selected
    if (this.value) {
        // Hide the error icon associated with age
        ageErrorIcon.style.display = "none";
    }
});

ageErrorIcon.addEventListener("mouseover", function () {
    ageTooltip.style.display = "inline";
});

ageErrorIcon.addEventListener("mouseout", function () {
    ageTooltip.style.display = "none";
});

incomeInput.addEventListener("input", function () {
    const incomeValue = incomeInput.value.trim();
    const income = parseFloat(incomeValue);

    const containsNonNumeric = incomeValue.split('').some(char => isNaN(parseInt(char)) && char !== '.');

    if (incomeValue === '') {
        incomeErrorIcon.style.display = "none";
    } else if (containsNonNumeric) {
        displayErrorIcon(incomeErrorIcon);
    } else {
        incomeErrorIcon.style.display = "none";
    }
});
extraIncomeInput.addEventListener("input", function () {
    const incomeValue = extraIncomeInput.value.trim();
    const income = parseFloat(incomeValue);
    const containsNonNumeric = incomeValue.split('').some(char => isNaN(parseInt(char)) && char !== '.');
    if (incomeValue === '') {
        extraIncomeErrorIcon.style.display = "none";
    } else if (containsNonNumeric) {
        displayErrorIcon(extraIncomeErrorIcon);
    } else {
        extraIncomeErrorIcon.style.display = "none";
    }
});
deductionsInput.addEventListener("input", function () {
    const incomeValue = deductionsInput.value.trim();
    const income = parseFloat(incomeValue);
    const containsNonNumeric = incomeValue.split('').some(char => isNaN(parseInt(char)) && char !== '.');

    if (incomeValue === '') {
        deductionsErrorIcon.style.display = "none";
    } else if (containsNonNumeric) {
        displayErrorIcon(deductionsErrorIcon);
    } else {
        deductionsErrorIcon.style.display = "none";
    }
});

submitBtn.addEventListener("click", function (event) {
    event.preventDefault();


    const age = ageDropdown.value;
    const income = parseFloat(incomeInput.value);
    const extraIncome = parseFloat(extraIncomeInput.value) || 0;
    const deductions = parseFloat(deductionsInput.value) || 0;


    const incomeValue = incomeInput.value.trim();
    const containsNonNumericincome = incomeValue.split('').some(char => isNaN(parseInt(char)) && char !== '.');


    const extraincomeValue = extraIncomeInput.value.trim();
    const containsNonNumericExtraIncome = extraincomeValue.split('').some(char => isNaN(parseInt(char)) && char !== '.');

    const deductionincomeValue = deductionsInput.value.trim();
    const containsNonNumericDeductions = deductionincomeValue.split('').some(char => isNaN(parseInt(char)) && char !== '.');

    if (containsNonNumericincome || isNaN(income)) {
        displayErrorIcon(incomeErrorIcon);
        makeBlink(incomeErrorIcon);
        return
    }
    if (!age) {
        displayErrorIcon(ageErrorIcon);
        makeBlink(ageErrorIcon);
        return;
    }

    if (containsNonNumericExtraIncome) {
        displayErrorIcon(extraIncomeErrorIcon);
        makeBlink(extraIncomeErrorIcon);
        return
    }
    if (containsNonNumericDeductions) {
        displayErrorIcon(deductionsErrorIcon);
        return
    }

    const [tax, amountLeft] = calculateTax(age, income, extraIncome, deductions);

    showModal(formatTaxAmount(tax), amountLeft);
});

function calculateTax(age, income, extraIncome, deductions) {
    const taxableIncome = income + extraIncome - deductions;
    let tax = 0;
    let amountLeft = taxableIncome;


    if (taxableIncome > 800000) {
        switch (age) {
            case "below40":
                tax = 0.3 * (taxableIncome - 800000);
                amountLeft = taxableIncome - tax
                break;
            case "40to60":
                tax = 0.4 * (taxableIncome - 800000);
                amountLeft = taxableIncome - tax
                break;
            case "above60":
                tax = 0.1 * (taxableIncome - 800000);
                amountLeft = taxableIncome - tax
                break;
        }
    }

    return [tax, amountLeft];
}

function showModal(tax, amountLeft) {
    const modal = new bootstrap.Modal(document.querySelector(".modal"));
    modalBody.textContent = "Your tax amount is: " + tax + ".  Your amount left after tax is: " + amountLeft

    modal.show();
}


function formatTaxAmount(tax) {
    if (tax >= 10000000) {
        return (tax / 100000).toFixed(2) + " Lakhs ";
    } else if (tax >= 100000) {
        return (tax / 100000).toFixed(1) + " Lakhs ";
    } else if (tax >= 1000) {
        return (tax / 1000).toFixed(0) + " Thousand ";
    } else {
        return tax.toFixed(0);
    }
}

function hideAllErrorIcons() {
    ageErrorIcon.style.display = "none";
    incomeErrorIcon.style.display = "none";
    extraIncomeErrorIcon.style.display = "none";
    deductionsErrorIcon.style.display = "none";
}

function displayErrorIcon(icon) {
    icon.style.display = "inline";
}

function makeBlink(icon) {
    icon.classList.add("blink");
    setTimeout(() => icon.classList.remove("blink"), 2000); // Remove the "blink" class after 1 second
}
