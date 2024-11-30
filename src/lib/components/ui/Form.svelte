<script lang="ts">
	import { enhance } from '$app/forms';

	interface Path {
		d: string;
		fill_rule?: 'inherit' | 'nonzero' | 'evenodd';
		clip_rule?: 'inherit' | 'nonzero' | 'evenodd';
	}

	interface Field {
		input_type: string;
		input_name: string;
		label_name?: string;
		placeholder?: string;
		icon?: boolean;
		svg?: {
			xmlns?: string;
			view_box?: string;
			fill?: string;
			class_name?: string;
		};
		paths?: Path[];
	}

	interface Button {
		type?: 'button' | 'reset' | 'submit' | null | undefined;
		class_name?: string;
		form_action?: string;
		name?: string;
	}

	interface Props {
		action: string;
		fields: Field[];
		buttons: Button[];
	}

	let data: Props = $props();
</script>

<form action={data.action} method="post" class="flex flex-col" use:enhance>
	{#each data.fields as field}
		<label class="input input-bordered flex items-center gap-2">
			{#if field.icon && field.svg && field.paths}
				<svg
					xmlns={field.svg.xmlns}
					viewBox={field.svg.view_box}
					fill={field.svg.fill}
					class={field.svg.class_name}
				>
					{#each field.paths as path}
						<path d={path.d} fill-rule={path.fill_rule} clip-rule={path.clip_rule} />
					{/each}
				</svg>
			{:else}
				{field.label_name}
			{/if}
			<input
				type={field.input_type}
				class="grow"
				name={field.input_name}
				placeholder={field.placeholder}
			/>
		</label>
	{/each}

	{#each data.buttons as button}
		{#if button.type}
			<button type={button.type} class="btn {button.class_name}">
				{button.name}
			</button>
		{:else if button.form_action}
			<button class="btn {button.class_name}" formaction={button.form_action}>
				{button.name}
			</button>
		{:else}
			<button class="btn {button.class_name}">
				{button.name}
			</button>
		{/if}
	{/each}
</form>
