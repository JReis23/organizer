<script lang="ts">
	import type { PageData } from './$types';
	import Button from '$lib/components/ui/Button.svelte';

	let { data }: { data: PageData } = $props();
</script>

<div class="overflow-x-auto pt-36">
	<div class="flex h-10 items-center justify-between bg-slate-100 px-1">
		<div class="form-control">
			<input type="text" placeholder="Search" class="input input-bordered h-8 w-24 md:w-auto" />
		</div>
		<Button href="./patients/new" className="btn-sm btn-outline btn-success rounded-full"
			>{#snippet buttonText()}
				Ajouter
			{/snippet}</Button
		>
	</div>
	<table class="table-zebra glass table-lg shadow-xl">
		<thead class="bg-blue-200">
			<tr>
				<th></th>
				<th>Nom</th>
				<th>Adresse</th>
				<th>Code Postal</th>
				<th>Numero Telephone</th>
				<th>Details</th>
			</tr>
		</thead>
		<tbody>
			{#each data.patients as patient, i}
				<tr class="hover">
					<th>{i + 1}</th>
					<td>{patient.patientName}</td>
					<td>{patient.adress}</td>
					<td>{patient.postal_code}</td>
					<td>{patient.phoneNumber}</td>
					<td
						><a href="./patients/{patient.patientId}" aria-label="Details"
							><svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M3 6H10L12 8H21V20H3V6Z" fill="currentColor" />
								<path
									d="M3 6C3 4.89543 3.89543 4 5 4H10L12 6H21C22.1046 6 23 6.89543 23 8V20C23 21.1046 22.1046 22 21 22H3C1.89543 22 1 21.1046 1 20V8C1 6.89543 1.89543 6 3 6Z"
									stroke="currentColor"
									stroke-width="2"
								/>
							</svg>
						</a></td
					>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
