<script>
	/**@type {Object & {id: Number, path: String}}*/
	export let thumbnail,
		/**@type {Object & {id: Number, path: String}}*/
		src;

	$: readyState = 0;
	$: videoLoaded = readyState === 4;

	/**@type {Boolean | undefined}*/
	let cached = undefined;

	$: if (videoLoaded) {
		cached = true;
	}
</script>

<div class="video-wrapper pos-r">
	<video
		class="bg-video w-100 object-fit-contain {!videoLoaded ? 'w-0' : ''}"
		autoplay
		muted
		loop
		playsinline
		src="{src.path}"
		bind:readyState
	></video>

	{#if !videoLoaded && !cached}
		<img class="bg-img z-0 w-100 object-fit-contain" src="{thumbnail.path}" alt="video thumbnail" />
	{/if}
	<slot name="custom-content" />
</div>
