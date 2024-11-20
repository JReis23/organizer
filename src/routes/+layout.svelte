<script lang="ts">
	import { goto } from '$app/navigation';
	import '../app.css';
	import { browser } from '$app/environment';
	import type { Snippet } from 'svelte';
	import type { LayoutServerData } from './$types';

	interface Props {
		menuItems: { label: string; url: string }[];
		children: Snippet;
		data: LayoutServerData;
	}

	let { children, menuItems, data }: Props = $props();

	menuItems = [
		{ label: 'Settings', url: '/settings' },
		{ label: 'Logout', url: '/logout' },
		{ label: 'Patients', url: '/patients' }
	];

	$effect(() => {
		if (browser && !data?.session) {
			goto('/login');
		}
	});
</script>

{#if data.session}
	<div class="flex min-h-screen">
		<!-- Fixed Sidebar -->
		<div
			class="fixed left-0 top-0 flex h-screen w-56 flex-col border-r border-base-300 bg-base-200"
		>
			<!-- Logo/Brand -->
			<div class="border-b border-base-300 p-4">
				<a class="btn btn-ghost text-xl" href="./">daisyUI</a>
			</div>

			<!-- User Profile -->
			<div class="flex items-center gap-4 border-b border-base-300 p-4">
				<div class="h-10 w-10 overflow-hidden rounded-full">
					<img
						alt="Avatar"
						src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
						class="h-full w-full object-cover"
					/>
				</div>
			</div>

			<!-- Search -->
			<div class="border-b border-base-300 p-4">
				<div class="form-control">
					<input type="text" placeholder="Search" class="input input-bordered w-full" />
				</div>
			</div>

			<!-- Navigation Menu -->
			<ul class="menu flex-1 overflow-y-auto p-4">
				{#each menuItems as item}
					<li><a href={item.url}>{item.label}</a></li>
				{/each}
			</ul>
		</div>

		<!-- Main Content -->
		<div class="ml-80 flex-1 p-8">
			<!-- Mobile Menu Button - Only visible on small screens -->
			<div class="mb-4 lg:hidden">
				<label for="my-drawer-2" class="btn btn-primary drawer-button"> Open Menu </label>
			</div>
			{@render children()}
		</div>
	</div>
{:else}
	<div class="grid h-screen">
		<div class="grid place-items-center">
			{@render children()}
		</div>
	</div>
{/if}
