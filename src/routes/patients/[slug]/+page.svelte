<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	console.log({ data });
</script>

<div class="border">
	<label for="patientName">
		Nom
		<input type="text" placeholder={data.patients[0].patientName} disabled />
	</label>
	<input type="text" placeholder={data.patients[0].adress} disabled />
	<input type="text" placeholder={data.patients[0].phoneNumber} disabled />
	<button tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-200">
		<div class="collapse-title text-xl font-medium">Here</div>
		<div class="collapse-content">
			<p>tabindex="0" attribute is necessary to make the div focusable</p>
		</div>
	</button>
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
			treatmentType
			<input type="text" class="grow" name="treatmentType" />
		</label>
		<label class="input input-bordered flex items-center gap-2">
			treatmentDate
			<input type="date" class="grow" name="treatmentDate" />
		</label>
		<button type="submit" class="btn">Enregistrer</button>
	</form>
</div>
