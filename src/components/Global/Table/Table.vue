<template>
	<table class="flex flex-col pt-4 pb-3 rounded-xl bg-white shadow">
		<thead>
			<tr
				class="flex justify-start mb-4 md:mx-0 px-1 pl-4 md:mr-4 text-sm font-bold text-gray-400 uppercase"
			>
				<th
					v-for="(item, index) in header.items"
					:key="index"
					:class="[item.classes, options.layout[index]]"
				>
					{{ item.name }}
				</th>
			</tr>
		</thead>

		<tbody>
			<!-- Empty message -->
			<tr
				v-if="!data.items || !data.items.length"
				class="flex text-gray-600 p-3 pl-4 md:mr-4 text-left border-t border-gray-200"
			>
				<td :colspan="header.items.length">
					{{ data.empty }}
				</td>
			</tr>

			<!-- items -->
			<tr
				v-for="item in data.items"
				:key="item.id"
				class="flex items-center p-3 pl-4 md:pr-4 text-lg hover:bg-gray-100 border-t border-gray-200 cursor-pointer group"
				@click="options.onClick ? options.onClick(item) : undefined"
			>
				<slot name="tableItemTemplate" :tableItem="item" />
			</tr>
		</tbody>

		<tfoot
			class="flex justify-between pt-3 pl-4 text-gray-400 text-sm md:text-md border-t border-gray-200"
		>
			<tr>
				<td :colspan="header.items.length">
					<span class="font-bold">
						{{ data.items.length }} {{ options.itemName }}
					</span>
					{{ $t('of') }} {{ data.items.length }}
				</td>
			</tr>
		</tfoot>
	</table>
</template>

<script>
export default {
	props: {
		header: {
			type: Object,
			required: true
		},
		data: {
			type: Object,
			required: true
		},
		options: {
			type: Object,
			required: true
		}
	}
};
</script>
