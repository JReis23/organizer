<script lang="ts">
	import { enhance } from '$app/forms';

	interface Path {
		d: string;
		fillRule?: 'inherit' | 'nonzero' | 'evenodd';
		clipRule?: 'inherit' | 'nonzero' | 'evenodd';
	}

	interface Field {
		inputType: string;
		inputName: string;
		labelName?: string;
		placeholder?: string;
		icon?: Boolean;
		svg?: { xmlns?: string; viewBox?: string; fill?: string; class?: string };
		paths?: Path[];
	}
	interface Buttons {
		type?: 'button' | 'reset' | 'submit' | null | undefined;
		class?: string;
		formaction?: string;
		name?: string;
	}

	interface Props {
		action: string;
		fields: Field[];
		buttons: Buttons[];
	}

	let data: Props = $props();
</script>

<form action={data.action} method="post" class="flex flex-col" use:enhance>
	{#each data.fields as field}
		<label class="input input-bordered flex items-center gap-2">
			{#if field.icon && field.svg && field.paths}
				<svg
					xmlns={field.svg.xmlns}
					viewBox={field.svg.viewBox}
					fill={field.svg.fill}
					class={field.svg.class}
				>
					{#each field.paths as path}
						<path d={path.d} fill-rule={path.fillRule} clip-rule={path.clipRule}></path>
					{/each}
				</svg>
			{:else}
				{field.labelName}
			{/if}
			<input
				type={field.inputType}
				class="grow"
				name={field.inputName}
				placeholder={field.placeholder}
			/>
		</label>
	{/each}
	{#each data.buttons as button}
		{#if button.type}
			<button type={button.type} class="btn {button.class}">{button.name}</button>
		{:else if button.formaction}
			<button class="btn {button.class}" formaction={button.formaction}>{button.name}</button>
		{:else}
			<button class="btn {button.class}">{button.name}</button>
		{/if}
	{/each}
</form>
