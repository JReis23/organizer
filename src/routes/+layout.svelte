<script lang="ts">
	import { goto } from '$app/navigation';
	import '../app.css';
	import { browser } from '$app/environment';
	import type { Snippet } from 'svelte';
	import type { LayoutServerData } from './$types';
	import Button from '$lib/components/ui/Button.svelte';

	interface Props {
		children: Snippet;
		data: LayoutServerData;
	}

	let { children, data }: Props = $props();

	$effect(() => {
		if (browser && !data?.session) {
			goto('/login');
		}
	});
</script>

{#if data.session}
	<nav
		class="fixed flex min-h-screen w-40 flex-col items-center overflow-hidden rounded bg-indigo-900 text-indigo-300"
	>
		<Button
			className="mt-3 flex w-full items-center justify-center"
			href="/"
			svg={{
				class: 'h-8 w-8 fill-current',
				xmlns: 'http://www.w3.org/2000/svg',
				fill: 'currentColor',
				viewBox: '0 0 20 20',
				path: [
					{
						d: 'M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z'
					}
				]
			}}
		>
			{#snippet buttonText()}
				<span class="ml-2 text-sm font-bold">The App</span>
			{/snippet}
		</Button>
		<div class="w-full px-2">
			<div class="mt-3 flex w-full flex-col items-center justify-center border-t border-gray-600">
				<Button
					className="mt-2 flex h-12 w-full items-center justify-center rounded px-3 hover:bg-indigo-700"
					href="/patients"
					svg={{
						class: 'h-6 w-6 stroke-current',
						xmlns: 'http://www.w3.org/2000/svg',
						fill: 'currentColor',
						viewBox: '0 0 24 24',
						stroke: 'currentColor',
						path: [
							{
								d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
								stroke_linecap: 'round',
								stroke_linejoin: 'round',
								stroke_width: '2'
							}
						]
					}}
				>
					{#snippet buttonText()}
						<span class="ml-2 text-sm font-medium">Patients</span>
					{/snippet}
				</Button>
			</div>
		</div>
		<Button
			className="mt-auto flex h-16 w-full items-center justify-center bg-indigo-800 hover:bg-indigo-700"
			href="./logout"
			svg={{
				class: 'h-6 w-6 stroke-current',
				xmlns: 'http://www.w3.org/2000/svg',
				fill: 'none',
				viewBox: '0 0 24 24',
				stroke: 'currentColor',
				path: [
					{
						d: 'M15 12H3m12 0l-4-4m4 4l-4 4m6-12h-2a2 2 0 00-2-2H7a2 2 0 00-2 2v16a2 2 0 002 2h6a2 2 0 002-2h2',
						stroke_linecap: 'round',
						stroke_linejoin: 'round',
						stroke_width: '2'
					}
				]
			}}
		>
			{#snippet buttonText()}
				<span class="ml-2 text-sm font-medium">Deconnecter</span>
			{/snippet}
		</Button>
	</nav>
	<main class="ml-40 h-screen min-h-screen">
		{@render children()}
	</main>
{:else}
	<div class="grid">
		<div class="grid place-items-center">
			{@render children()}
		</div>
	</div>
{/if}

<!-- <body class="flex h-screen w-screen items-center justify-center space-x-6 bg-gray-300 p-10"> -->
<!-- Component Start -->
<!-- <div
		class="flex h-full w-16 flex-col items-center overflow-hidden rounded bg-indigo-900 text-indigo-300"
	>
		<a aria-label="start" class="mt-3 flex items-center justify-center" href="/">
			<svg
				class="h-8 w-8 fill-current"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
				/>
			</svg>
		</a>
		<div class="mt-3 flex flex-col items-center border-t border-gray-700">
			<a
				aria-label="start"
				class="mt-2 flex h-12 w-12 items-center justify-center rounded hover:bg-indigo-700"
				href="/"
			>
				<svg
					class="h-6 w-6 stroke-current"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
					/>
				</svg>
			</a>
			<a
				aria-label="start"
				class="mt-2 flex h-12 w-12 items-center justify-center rounded hover:bg-indigo-700"
				href="/"
			>
				<svg
					class="h-6 w-6 stroke-current"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</a>
			<a
				aria-label="start"
				class="mt-2 flex h-12 w-12 items-center justify-center rounded bg-indigo-700 text-indigo-100"
				href="/"
			>
				<svg
					class="h-6 w-6 stroke-current"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
			</a>
			<a
				aria-label="start"
				class="mt-2 flex h-12 w-12 items-center justify-center rounded hover:bg-indigo-700"
				href="/"
			>
				<svg
					class="h-6 w-6 stroke-current"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
					/>
				</svg>
			</a>
		</div>
		<div class="mt-2 flex flex-col items-center border-t border-gray-700">
			<a
				aria-label="start"
				class="mt-2 flex h-12 w-12 items-center justify-center rounded hover:bg-indigo-700"
				href="/"
			>
				<svg
					class="h-6 w-6 stroke-current"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
					/>
				</svg>
			</a>
			<a
				aria-label="start"
				class="mt-2 flex h-12 w-12 items-center justify-center rounded hover:bg-indigo-700"
				href="/"
			>
				<svg
					class="h-6 w-6 stroke-current"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
					/>
				</svg>
			</a>
			<a
				aria-label="start"
				class="relative mt-2 flex h-12 w-12 items-center justify-center rounded hover:bg-indigo-700"
				href="/"
			>
				<svg
					class="h-6 w-6 stroke-current"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
					/>
				</svg>
				<span class="absolute left-0 top-0 ml-2 mt-2 h-2 w-2 rounded-full bg-indigo-500"></span>
			</a>
		</div>
		<a
			aria-label="start"
			class="mt-auto flex h-16 w-16 items-center justify-center bg-indigo-800 hover:bg-indigo-700"
			href="/"
		>
			<svg
				class="h-6 w-6 stroke-current"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		</a>
	</div> -->
<!-- Component End  -->

<!-- Component Start -->

<!-- Component End  -->
<!-- </body> -->
