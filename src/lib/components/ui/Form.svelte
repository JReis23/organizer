<script lang="ts">
	export let fields: Array<{
		input_name: string;
		label_name: string;
		input_type: string;
		value?: string;
		onInput?: (event: Event) => void;
	}>;
	export let buttons: Array<{
		type: 'submit' | 'button';
		name: string;
		class_name: string;
	}>;
	export let action: string;
</script>

<form method="POST" {action} class="space-y-6">
	{#each fields as field}
		<div class="space-y-2">
			<label for={field.input_name} class="block text-sm font-medium text-gray-700">
				{field.label_name}
			</label>
			<input
				type={field.input_type}
				name={field.input_name}
				id={field.input_name}
				value={field.value || ''}
				on:input={field.onInput}
				class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>
	{/each}

	<div class="flex justify-end space-x-4 pt-4">
		{#each buttons as button}
			<button type={button.type} class={button.class_name}>
				{button.name}
			</button>
		{/each}
	</div>
</form>
