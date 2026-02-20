const SETTINGS_KEY = 'app:settings';

// Load settings from localStorage
export function loadSettings() {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
}

// Save settings to localStorage
export function saveSettings(data) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(data));
}

// Initialize settings form
export function initSettings() {
    const baseCurrency = document.getElementById('base-currency');
    const rateUSD = document.getElementById('rate-usd');
    const rateEUR = document.getElementById('rate-eur');
    const rateRWF = document.getElementById('rate-rwf');
    const saveBtn = document.getElementById('save-settings');
    const status = document.getElementById('settings-status');

    const settings = loadSettings();

    // Pre-fill the form if settings exist
    if (settings.baseCurrency) baseCurrency.value = settings.baseCurrency;
    if (settings.rateUSD) rateUSD.value = settings.rateUSD;
    if (settings.rateEUR) rateEUR.value = settings.rateEUR;
    if (settings.rateRWF) rateRWF.value = settings.rateRWF;

    saveBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const newSettings = {
            baseCurrency: baseCurrency.value,
            rateUSD: parseFloat(rateUSD.value) || 1,
            rateEUR: parseFloat(rateEUR.value) || 0.92,
            rateRWF: parseFloat(rateRWF.value) || 1300
        };

        saveSettings(newSettings);

        status.textContent = 'Settings saved successfully!';
        setTimeout(() => status.textContent = '', 3000);
    });
}
