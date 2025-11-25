export const monthsConfig: Record<number, string> = {
	1: 'Janeiro',
	2: 'Fevereiro',
	3: 'Março',
	4: 'Abril',
	5: 'Maio',
	6: 'Junho',
	7: 'Julho',
	8: 'Agosto',
	9: 'Setembro',
	10: 'Outubro',
	11: 'Novembro',
	12: 'Dezembro',
};

export function formatMonth(month: number): string {
	return monthsConfig[month] || '';
}

export function formatCurrency(value: number): string {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	}).format(value);
}

export function formatNumber(value: number): string {
	return new Intl.NumberFormat('pt-BR').format(value);
}

export function formatPercent(value: number | null | undefined): string {
	if (value === null || value === undefined) return '-';
	return `${value.toFixed(1)}%`;
}
