<template>
	<div
		ref="graphWrapper"
		class="flex flex-grow items-center justify-center pt-4 pb-3 rounded-xl bg-white shadow"
	>
		<Spinner :active="isLoading" />
		<div ref="graphElement" class="overflow-hidden" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import ForceGraph from 'force-graph';
import Spinner from '@/components/Global/Spinner/Spinner';
import ColorScale from 'color-scales';

export default {
	components: {
		Spinner
	},
	data: function () {
		return {
			isLoading: true,
			colorScale: new ColorScale(0, 1, ['#00FF00', '#FF0000']),
			options: {
				uploadedNodeColor: '#EBC12C',
				defaultNodeColor: '#1699F1'
			}
		};
	},
	computed: {
		...mapGetters('SubmissionStore', ['graph'])
	},
	mounted: function () {
		return new Promise(resolve => {
			// Graph has been previously fetched and is present in SubmissionStore
			if (this.graph) {
				return resolve();
			}

			// Fetch graph
			this.$store
				.dispatch('SubmissionStore/fetchGraph', this.$route.params.submission)
				.then(resolve);
		})
			.then(() => {
				// set node and link colors
				if (this.graph) {
					const graphData = {
						nodes: this.graph.nodes.map(this.nodeColor),
						links: this.graph.links.map(this.linkColor)
					};
					this.initGraph(graphData);
				}
			})
			.finally(() => {
				this.isLoading = false;
			});
	},
	methods: {
		isUploadedDocumentNode(node) {
			return !!node.uploaded;
		},
		initGraph(graphData) {
			try {
				const forceGraph = new ForceGraph()(this.$refs.graphElement);

				forceGraph
					.nodeId('id') // the attribute by which the links are addressed
					.nodeLabel('name') // data shown on node hover
					.onNodeHover(this.onNodeHover)
					.onNodeClick(this.onNodeClick)
					.linkDirectionalArrowLength(4) // size of arrow in directional graph
					.linkLabel(this.linkLabel) // data shown on link hover
					.linkWidth(link =>
						Number(link.value) > 1
							? Number(link.value) / 10
							: Number(link.value)
					)
					.onLinkHover(this.onLinkHover)
					.onLinkClick(this.onLinkClick)
					.height(this.$refs.graphElement.clientHeight)
					.width(this.$refs.graphElement.clientWidth)
					.graphData(graphData)
					.zoom(4);
			} catch (e) {
				console.error(e);
			}
		},
		nodeColor(node) {
			node.color = node.uploaded
				? this.options.uploadedNodeColor
				: this.options.defaultNodeColor;
			return node;
		},
		onNodeClick(node) {
			if (node && this.isUploadedDocumentNode(node)) {
				this.$router.push({
					name: 'document',
					params: { document: node.id }
				});
			}
		},
		onNodeHover(node) {
			if (node && this.isUploadedDocumentNode(node)) {
				this.$refs.graphElement.style.cursor = node ? 'pointer' : null;
			}
		},
		linkColor(link) {
			link.color = this.colorScale.getColor(link.value).toHexString();
			return link;
		},
		linkLabel(link) {
			return `Zhoda: ${this.$filters.roundToTwoDecimals(
				Number(link.value)
			)}%`;
		},
		onLinkClick(link) {
			this.$router.push({
				name: 'compare',
				params: {
					submission: this.$route.params.submission,
					document: link.source.id,
					compare: link.target.id
				}
			});
		},
		onLinkHover(link) {
			this.$refs.graphElement.style.cursor = link ? 'pointer' : null;
		}
	}
};
</script>
