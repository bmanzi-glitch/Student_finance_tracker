// validators.js: Regex validation rules

// Description/title: no leading/trailing spaces, collapse doubles
export const descRegex = /^\S(?:.*\S)?$/;

// Numeric (amount): 0 or positive number with max 2 decimals
export const amountRegex = /^(0|[1-9]\d*)(\.\d{1,2})?$/;

// Date: YYYY-MM-DD
export const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

// Category/tag: letters, spaces, hyphens
export const categoryRegex = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;

// Advanced example: detect duplicate words
export const duplicateWordRegex = /\b(\w+)\s+\1\b/;

// Validation function
export const validateTransaction = ({ description, amount, date, category }) => {
    const errors = [];
    if (!descRegex.test(description)) errors.push('Invalid description');
    if (!amountRegex.test(amount)) errors.push('Invalid amount');
    if (!dateRegex.test(date)) errors.push('Invalid date');
    if (!categoryRegex.test(category)) errors.push('Invalid category');
    return errors;
};
