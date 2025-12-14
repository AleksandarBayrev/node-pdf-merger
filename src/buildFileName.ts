export const buildFileName = (): string => {
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

    const options: Intl.DateTimeFormatOptions = {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    const timestamp = new Date().toLocaleString('sv', options).replace(/[-: ]/g, '');

    return `merged-${timestamp}.pdf`;
}