<script lang="ts">
	import type { PageData } from './$types';
	import Button from '$lib/components/ui/Button.svelte';

	let { data }: { data: PageData } = $props();
</script>

<!-- component -->
<div class="w-full sm:px-6">
	<div class="px-4 py-4 md:px-10 md:py-7">
		<div class="flex items-center justify-between">
			<p
				tabindex="-1"
				class="text-base font-bold leading-normal focus:outline-none sm:text-lg md:text-xl lg:text-2xl"
			>
				Tasks
			</p>
			<div
				class="flex cursor-pointer items-center rounded bg-gray-200 px-4 py-3 text-sm font-medium leading-none hover:bg-gray-300"
			>
				<p>Sort By:</p>
				<select
					aria-label="select"
					class="ml-1 bg-transparent focus:text-indigo-600 focus:outline-none"
				>
					<option class="text-sm text-indigo-800">Latest</option>
					<option class="text-sm text-indigo-800">Oldest</option>
					<option class="text-sm text-indigo-800">Latest</option>
				</select>
			</div>
		</div>
	</div>
	<div class="bg-white px-4 py-4 md:px-8 md:py-7 xl:px-10">
		<div class="items-center justify-between sm:flex">
			<div class="flex items-center">
				<a
					class="rounded-full focus:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-800"
					href="/"
				>
					<div class="rounded-full bg-indigo-100 px-8 py-2 text-indigo-700">
						<p>All</p>
					</div>
				</a>
				<a
					class="ml-4 rounded-full focus:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-800 sm:ml-8"
					href="/"
				>
					<div class="rounded-full px-8 py-2 hover:bg-indigo-100 hover:text-indigo-700">
						<p>Done</p>
					</div>
				</a>
				<a
					class="ml-4 rounded-full focus:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-800 sm:ml-8"
					href="/"
				>
					<div class="rounded-full px-8 py-2 hover:bg-indigo-100 hover:text-indigo-700">
						<p>Pending</p>
					</div>
				</a>
			</div>
			<Button
				href="./patients/new"
				className="mt-4 inline-flex items-start justify-start rounded bg-indigo-700 px-6 py-3 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 sm:mt-0"
			>
				{#snippet buttonText()}
					<p class="text-sm font-medium leading-none text-white">Nouveau Patient</p>
				{/snippet}
			</Button>
		</div>
		<div class="mt-7 overflow-x-auto">
			<table class="w-full whitespace-nowrap">
				<thead>
					<tr>
						<th class="pl-5 text-start">Nom</th>
						<th class="pl-5 text-start">Telephone</th>
						<th class="pl-5 text-start">Ville</th>
						<th class="pl-5 text-start">Code Postal</th>
						<th class="pl-5 text-start">Soin a venir</th>
						<th class="pl-5 text-start">Date</th>
						<th class="pl-5 text-start"></th>
					</tr>
				</thead>
				<tbody>
					{#each data.patients as patient}
						<tr tabindex="-1" class="h-16 rounded border border-gray-100 focus:outline-none">
							<td class="">
								<div class="flex items-center pl-5">
									<p class="mr-2 text-base font-medium leading-none">
										{patient.patientName}
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

									<p class="ml-2 text-sm leading-none">{patient.phoneNumber}</p>
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
											d="M10 17.5C10 17.5 14.1667 13.3333 14.1667 9.16667C14.1667 6.1225 12.0442 4.16667 10 4.16667C7.95583 4.16667 5.83333 6.1225 5.83333 9.16667C5.83333 13.3333 10 17.5 10 17.5Z"
											stroke="#52525B"
											stroke-width="1.25"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<circle
											cx="10"
											cy="9.16667"
											r="2.5"
											stroke="#52525B"
											stroke-width="1.25"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>

									<p class="ml-2 text-sm leading-none">{patient.patientCity}</p>
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
											d="M3.33333 4.16667H16.6667C17.1265 4.16667 17.5 4.54017 17.5 5V15C17.5 15.4598 17.1265 15.8333 16.6667 15.8333H3.33333C2.8735 15.8333 2.5 15.4598 2.5 15V5C2.5 4.54017 2.8735 4.16667 3.33333 4.16667Z"
											stroke="#52525B"
											stroke-width="1.25"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M2.5 5L10 10.8333L17.5 5"
											stroke="#52525B"
											stroke-width="1.25"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
									<p class="ml-2 text-sm leading-none">{patient.postal_code}</p>
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
											d="M10 17.1875l-1.45-1.32C4.5 12.8 2.08333 10.7292 2.08333 7.70833 2.08333 5.24792 4.03875 3.33333 6.49917 3.33333c1.5625 0 3.02833.72917 4.00083 1.82292 0.9725-1.09375 2.43833-1.82292 4.00083-1.82292 2.46042 0 4.41583 1.91458 4.41583 4.375 0 3.02083-2.41667 5.09167-6.46667 8.15833L10 17.1875z"
											stroke="#52525B"
											stroke-width="1.25"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<rect
											x="8.33333"
											y="8.33333"
											width="3.33333"
											height="3.33333"
											fill="#52525B"
											rx="0.83333"
											ry="0.83333"
										/>
										<path
											d="M10 9.16667v1.66666M9.16667 10h1.66666"
											stroke="white"
											stroke-width="1.25"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
									<p class="ml-2 text-sm leading-none">{patient.treatmentType}</p>
								</div>
							</td>
							<td class="pl-5">
								{#if patient.treatmentUpcomming}
									{@const dateToCompare = new Date(patient.treatmentUpcomming).getTime()}
								{#if dateToCompare <= Date.now()}
								<Button href="#" className="rounded bg-red-100 px-3 py-3 text-sm leading-none text-red-700 focus:outline-none">
									{#snippet buttonText()}
										{#if patient.treatmentUpcomming}
											{new Date(patient.treatmentUpcomming).toLocaleDateString('fr', {
												weekday: 'long',
												year: 'numeric',
												month: 'long',
												day: 'numeric',
											})}
										{/if}
										{/snippet}
								</Button>
									{:else}
									<Button href="#" className="rounded bg-green-300 px-3 py-3 text-sm leading-none text-green-950 focus:outline-none">
										{#snippet buttonText()}
											{#if patient.treatmentUpcomming}
											{new Date(patient.treatmentUpcomming).toLocaleDateString('fr', {
												weekday: 'long',
												year: 'numeric',
												month: 'long',
												day: 'numeric',
											})}
												{/if}
										{/snippet}
									</Button>
									{/if}
									{/if}
							</td>
							<td class="pl-4">
								<Button className="rounded bg-gray-100 px-5 py-3 text-sm leading-none hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2" href="./patients/{patient.patientId}">{#snippet buttonText()}Détails{/snippet}</Button>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
