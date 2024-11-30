<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';
	import Modal from '$lib/components/ui/Modal.svelte';

	let { data }: { data: PageData; form: ActionData } = $props();
	let patient_data = $state(data.patients) as PageData['patients'];
	let patient = $state(firstElement());

	function firstElement() {
		if (!patient_data[0].patient_name) return;
		const name_parts = patient_data[0].patient_name.split(' ');

		if (name_parts.length === 1) {
			return {
				...patient_data[0],
				formatted_name: name_parts[0]
			};
		}

		const first_name = name_parts[0];
		const last_name = name_parts[name_parts.length - 1];

		return {
			...patient_data[0],
			formatted_name: `${first_name} ${last_name}`
		};
	}

	let is_open = $state(false);

	function handleClose(): void {
		is_open = false;
	}
</script>

<Modal open={is_open} onClose={handleClose}>
	{#snippet modalText()}
		<h2>Modal Content</h2>
	{/snippet}
</Modal>

<div class="border">
	<form
		action="?/treatment"
		method="post"
		class="flex flex-col"
		use:enhance={({ formElement }) => {
			return async ({ result }) => {
				if (result.type === 'success') {
					formElement.reset();
				}
			};
		}}
	>
		<label class="input input-bordered flex items-center gap-2">
			Type de traitement
			<input type="text" class="grow" name="treatment_type" />
		</label>
		<label class="input input-bordered flex items-center gap-2">
			Date de traitement
			<input type="date" class="grow" name="treatment_date" />
		</label>
		<button type="submit" class="btn">Enregistrer</button>
	</form>

	<form
		action="?/updatePatient"
		method="post"
		class="flex flex-col"
		use:enhance={({ formElement }) => {
			return async ({ result }) => {
				if (result.type === 'success') {
					formElement.reset();
				}
			};
		}}
	>
		<label class="input input-bordered flex items-center gap-2">
			Nom du patient
			<input type="text" class="grow" name="patient_name" />
		</label>
		<label class="input input-bordered flex items-center gap-2">
			Numéro de téléphone
			<input type="text" class="grow" name="patient_phone_number" />
		</label>
		<label class="input input-bordered flex items-center gap-2">
			Rue
			<input type="text" class="grow" name="street" />
		</label>
		<label class="input input-bordered flex items-center gap-2">
			Code postal
			<input type="text" class="grow" name="postal_code" />
		</label>
		<label class="input input-bordered flex items-center gap-2">
			Ville
			<input type="text" class="grow" name="city" />
		</label>
		<label class="input input-bordered flex items-center gap-2">
			Pays
			<input type="text" class="grow" name="country" />
		</label>
		<label class="input input-bordered flex items-center gap-2">
			Email
			<input type="text" class="grow" name="patient_email" />
		</label>
		<button type="submit" class="btn">Enregistrer</button>
	</form>

	<div class="container mx-auto py-8">
		<div class="grid grid-cols-4 gap-6 px-4 sm:grid-cols-12">
			<div class="col-span-4 sm:col-span-3">
				<div class="rounded-lg bg-white p-6 shadow">
					<div class="flex flex-col items-center">
						<img
							alt="test"
							src="https://randomuser.me/api/portraits/men/94.jpg"
							class="mb-4 h-32 w-32 shrink-0 rounded-full bg-gray-300"
						/>
						<h1 class="text-xl font-bold">{patient?.formatted_name}</h1>
						<p class="text-gray-700">{patient?.patient_phone_number}</p>
					</div>
					<hr class="my-6 border-t border-gray-300" />
					<div class="flex flex-col">
						<span class="mb-2 font-bold uppercase tracking-wider text-gray-700">Adresse</span>
						<ul>
							<li class="mb-2">{patient?.street}</li>
							<li class="mb-2">{patient?.postal_code}</li>
							<li class="mb-2">{patient?.city}</li>
							<li class="mb-2">{patient?.country}</li>
							<li class="mb-2">{patient?.patient_email}</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="col-span-4 sm:col-span-9">
				<div class="mt-7 overflow-x-auto">
					<table class="w-full whitespace-nowrap">
						<thead>
							<tr>
								<th class="pl-5 text-start">Type de traitement</th>
								<th class="pl-5 text-start">Date</th>
							</tr>
						</thead>
						<tbody>
							{#each patient_data as patient}
								<tr
									class="h-16 rounded border border-gray-100 hover:bg-indigo-50 focus:outline-none"
								>
									<td>
										<div class="flex items-center pl-5">
											<p class="mr-2 text-base font-medium leading-none">
												{patient.treatment_type}
											</p>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												viewBox="0 0 16 16"
												fill="none"
											>
												<path
													d="M6.66669 9.33342C6.88394 9.55515 7.14325 9.73131 7.42944 9.85156C7.71562 9.97182 8.02293 10.0338 8.33335 10.0338C8.64378 10.0338 8.95108 9.97182 9.23727 9.85156C9.52345 9.73131 9.78277 9.55515 10 9.33342L12.6667 6.66676C13.1087 6.22473 13.357 5.62521 13.357 5.00009C13.357 4.37497 13.1087 3.77545 12.6667 3.33342C12.2247 2.89139 11.6251 2.64307 11 2.64307C10.3749 2.64307 9.77538 2.89139 9.33335 3.33342L9.00002 3.66676"
													stroke="#3B82F6"
													stroke-linecap="round"
													stroke-linejoin="round"
												></path>
												<path
													d="M9.33336 6.66665C9.11611 6.44492 8.8568 6.26876 8.57061 6.14851C8.28442 6.02825 7.97712 5.96631 7.66669 5.96631C7.35627 5.96631 7.04897 6.02825 6.76278 6.14851C6.47659 6.26876 6.21728 6.44492 6.00003 6.66665L3.33336 9.33332C2.89133 9.77534 2.64301 10.3749 2.64301 11C2.64301 11.6251 2.89133 12.2246 3.33336 12.6666C3.77539 13.1087 4.37491 13.357 5.00003 13.357C5.62515 13.357 6.22467 13.1087 6.66669 12.6666L7.00003 12.3333"
													stroke="#3B82F6"
													stroke-linecap="round"
													stroke-linejoin="round"
												></path>
											</svg>
										</div>
									</td>
									<td class="pl-5">
										<div class="flex items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="20"
												height="20"
												viewBox="0 0 20 20"
												fill="none"
											>
												<path
													d="M15.8333 13.3333C14.7217 13.3333 13.6392 13.1026 12.6383 12.655C12.2358 12.4717 11.735 12.5967 11.4217 12.91L10.1025 14.23C7.6825 12.9967 5.67167 10.9858 4.43833 8.56583L5.75833 7.245C6.07167 6.93167 6.19667 6.43083 6.01333 6.02833C5.56583 5.0275 5.33333 3.945 5.33333 2.83333C5.33333 2.3725 4.96083 2 4.5 2H2.83333C2.3725 2 2 2.3725 2 2.83333C2 12.2 7.8 18 17.1667 18C17.6275 18 18 17.6275 18 17.1667V15.5C18 15.0392 17.6275 14.6667 17.1667 14.6667H15.8333Z"
													stroke="#52525B"
													stroke-width="1.25"
													stroke-linecap="round"
													stroke-linejoin="round"
												/>
											</svg>
											<p class="ml-2 text-sm leading-none">
												{patient.treatment_date}
											</p>
										</div>
									</td>
								</tr>
								<tr class="h-2"></tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
