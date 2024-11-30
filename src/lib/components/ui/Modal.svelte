<script lang="ts">
	import Button from './Button.svelte';
	import type { Snippet } from 'svelte';
	// Define the props interface
	// Use the interface with $props
	let {
		open = false,
		onClose,
		modalText
	}: {
		open?: boolean;
		onClose: () => void;
		modalText: Snippet;
	} = $props();

	// Type the event parameter
	function handleKeydown(e: KeyboardEvent): void {
		if (e.key === 'Escape') {
			onClose();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />
{#if open}
	<div
		role="dialog"
		aria-modal="true"
		class="fixed z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
	>
		<Button
			className="absolute inset-0 h-full w-full cursor-default"
			onclick={onClose}
			arialabel="Close modal overlay"
			>{#snippet buttonText()}
				Open
			{/snippet}</Button
		>
		<div class="p-6">
			{@render modalText()}
		</div>
	</div>
{/if}
