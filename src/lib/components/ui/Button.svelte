<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		type?: 'button' | 'reset' | 'submit' | null | undefined;
		className?: string;
		formaction?: string;
		name?: string;
		href?: string;
		buttonText: Snippet;
	}

	let { type, className, formaction, href, buttonText }: Props = $props();
</script>

{#if type}
	<button {type} class="btn {className}">{@render buttonText()}</button>
{:else if formaction}
	<button class="btn {className}" {formaction}>{@render buttonText()}</button>
{:else if href}
	<a {href} class="btn {className}">{@render buttonText()}</a>
{:else}
	<button class="btn {className}">{@render buttonText()}</button>
{/if}
