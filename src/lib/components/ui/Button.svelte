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
		onclick?: (event: MouseEvent) => void;
	}

	let { type, className, formaction, href, buttonText, svg, onclick }: Props = $props();
</script>

{#if type}
	<button {type} class={className}>{@render buttonText()}</button>
{:else if formaction}
	<button class={className} {formaction}>{@render buttonText()}</button>
{:else if href}
	<a {href} class={className}>
		{#if svg}
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
			</svg>
		{/if}

		{@render buttonText()}</a
	>
{:else}
	<button {onclick} class={className}>{@render buttonText()}</button>
{/if}

<!-- <script lang="ts">
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
		onclick?: (event: MouseEvent) => void;
	}

	let { type, className, formaction, href, buttonText, svg, onclick }: Props = $props();

	const baseClass =
		'inline-flex items-center justify-center px-4 py-2 rounded-md transition-colors';
	className = className ? className : `${baseClass} ${className || ''}`.trim();
</script>

{#if type}
	<button {type} class='button{className}>{@render buttonText()}</button>
{:else if formaction}
	<button class={className} {formaction}>{@render buttonText()}</button>
{:else if href}
	<a {href} class={className}>
		{#if svg}
			<svg
				class={svg?.class}
				xmlns={svg?.xmlns || 'http://www.w3.org/2000/svg'}
				fill={svg?.fill || 'none'}
				viewBox={svg?.viewBox || '0 0 24 24'}
				stroke={svg?.stroke || 'currentColor'}
			>
				{#if svg?.path}
					{#each svg.path as path}
						<path
							stroke-linecap={path.stroke_linecap || 'round'}
							stroke-linejoin={path.stroke_linejoin || 'round'}
							stroke-width={path.stroke_width || '2'}
							d={path.d}
						/>
					{/each}
				{/if}
			</svg>
		{/if}
		{@render buttonText()}
	</a>
{:else}
	<button class={className} {onclick}>{@render buttonText()}</button>
{/if}

<style>
	:global(.btn) {
		@apply bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300;
	}

	svg {
		@apply mr-2 h-5 w-5;
	}
</style> -->
