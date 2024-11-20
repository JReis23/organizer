<script lang="ts">
	import type { ActionData } from './$types';
	import Form from '$lib/components/ui/Form.svelte';

	let { form }: { form: ActionData } = $props();

	const fields = [
		{ inputName: 'patientName', labelName: 'Nom', inputType: 'text' },
		{ inputName: 'phoneNumber', labelName: 'Numero Telephone', inputType: 'text' },
		{ inputName: 'age', labelName: 'Age', inputType: 'text' },
		{ inputName: 'email', labelName: 'Email', inputType: 'email' },
		{ inputName: 'adress', labelName: 'Adresse', inputType: 'text' },
		{ inputName: 'postal_code', labelName: 'Code Postal', inputType: 'text' },
		{ inputName: 'city', labelName: 'Ville', inputType: 'text' },
		{ inputName: 'country', labelName: 'Pays', inputType: 'text' }
	];

	const buttons = [
		{
			type: 'submit' as const,
			name: 'Enregistrer',
			class: ''
		}
	];
</script>

<div>
	<Form {fields} {buttons} action="?/patients"></Form>
</div>
