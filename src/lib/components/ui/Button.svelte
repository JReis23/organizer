<script lang="ts">
	import type { Snippet } from 'svelte';

	interface SvgPath {
		d?: string;
		stroke_linecap?: 'round' | 'inherit' | 'butt' | 'square';
		stroke_linejoin?: 'round' | 'inherit' | 'arcs' | 'miter-clip' | 'miter' | 'bevel';
		stroke_width?: string;
	}

	interface SvgProps {
		class?: string;
		xmlns?: string;
		viewBox?: string;
		fill?: string;
		stroke?: string;
		path?: SvgPath[];
	}

	interface Props {
		type?: 'button' | 'reset' | 'submit';
		className?: string;
		formaction?: string;
		href?: string;
		svg?: SvgProps;
		buttonText: Snippet;
	}

	let { type, className, formaction, href, buttonText, svg }: Props = $props();
</script>

{#if type}
	<button {type} class="btn {className}">{@render buttonText()}</button>
{:else if formaction}
	<button class="btn {className}" {formaction}>{@render buttonText()}</button>
{:else if href}
	<a {href} class={className}>
		<svg
			class={svg?.class}
			xmlns={svg?.xmlns}
			fill={svg?.fill}
			viewBox={svg?.viewBox}
			stroke={svg?.stroke}
		>
			{#if svg?.path}
				{#each svg.path as path}
					<path
						stroke-linecap={path.stroke_linecap}
						stroke-linejoin={path.stroke_linejoin}
						stroke-width={path.stroke_width}
						d={path.d}
					/>
				{/each}
			{/if}
		</svg>{@render buttonText()}</a
	>
{:else}
	<button class="btn {className}">{@render buttonText()}</button>
{/if}
