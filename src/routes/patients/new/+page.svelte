<script lang="ts">
	import type { ActionData } from './$types';
	import Form from '$lib/components/ui/Form.svelte';

	let { form }: { form: ActionData } = $props();

	const fields = [
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
			input_type: 'text'
		},
		{
			input_name: 'postal_code',
			label_name: 'Code Postal',
			input_type: 'text'
		},
		{
			input_name: 'city',
			label_name: 'Ville',
			input_type: 'text'
		},
		{
			input_name: 'country',
			label_name: 'Pays',
			input_type: 'text'
		}
	];

	const buttons = [
		{
			type: 'submit' as const,
			name: 'Enregistrer',
			class_name: '' // Mise à jour pour cohérence avec le reste
		}
	];
</script>

<div>
	<Form {fields} {buttons} action="?/patients" />
</div>
