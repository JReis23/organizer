<script lang="ts">
	import type { ActionData } from './$types';
	import Form from '$lib/components/ui/Form.svelte';

	let { form }: { form: ActionData } = $props();
	let suggestions = $state([]);
	let street = $state('');
	let postalCode = $state('');
	let city = $state('');
	let fields = $state([
		{
			input_name: 'patient_name',
			label_name: 'Nom',
			input_type: 'text'
		},
		{
			input_name: 'patient_phone_number',
			label_name: 'Numéro Téléphone',
			input_type: 'text'
		},
		{
			input_name: 'age',
			label_name: 'Age',
			input_type: 'text'
		},
		{
			input_name: 'patient_email',
			label_name: 'Email',
			input_type: 'email'
		},
		{
			input_name: 'street',
			label_name: 'Adresse',
			input_type: 'text',
			value: '',
			onInput: (e: Event) => {
				const target = e.target as HTMLInputElement;
				street = target.value;
				debouncedSearch(target.value);
			}
		},
		{
			input_name: 'postal_code',
			label_name: 'Code Postal',
			input_type: 'text',
			value: ''
		},
		{
			input_name: 'city',
			label_name: 'Ville',
			input_type: 'text',
			value: ''
		},
		{
			input_name: 'country',
			label_name: 'Pays',
			input_type: 'text',
			value: 'France'
		}
	]);

	function debounce(func: Function, wait: number) {
		let timeout: NodeJS.Timeout;

		return function executedFunction(...args: any[]) {
			const later = () => {
				clearTimeout(timeout);
				func(...args);
			};

			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
		};
	}

	async function searchAddress(query: string) {
		if (query.length < 3) {
			suggestions = [];
			return;
		}

		try {
			const response = await fetch(`/api?q=${encodeURIComponent(query)}`);
			const data = await response.json();
			suggestions = data.features || [];
		} catch (error) {
			console.error("Erreur lors de la recherche d'adresse:", error);
			suggestions = [];
		}
	}

	const debouncedSearch = debounce(searchAddress, 300);

	function selectAddress(feature: any) {
		const properties = feature.properties;
		street = properties.name;
		postalCode = properties.postcode;
		city = properties.city;
		suggestions = [];

		// Mettre à jour les champs directement
		fields = fields.map((field) => {
			if (field.input_name === 'street') return { ...field, value: street };
			if (field.input_name === 'postal_code') return { ...field, value: postalCode };
			if (field.input_name === 'city') return { ...field, value: city };
			return field;
		});
	}

	const buttons = [
		{
			type: 'submit' as const,
			name: 'Enregistrer',
			class_name:
				'bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200'
		}
	];
</script>

<div class="relative mx-auto w-full max-w-2xl p-6">
	<Form {fields} {buttons} action="?/patients" />

	{#if suggestions.length > 0}
		<div
			class="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg"
		>
			{#each suggestions as suggestion}
				<button
					type="button"
					class="w-full px-4 py-2 text-left transition-colors duration-200 hover:bg-gray-100"
					onclick={() => selectAddress(suggestion)}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							selectAddress(suggestion);
						}
					}}
				>
					{suggestion.properties.label}
				</button>
			{/each}
		</div>
	{/if}
</div>
