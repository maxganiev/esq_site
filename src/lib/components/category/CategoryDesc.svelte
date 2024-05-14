<script>
  export let category;
</script>

<div {...$$restProps} class="col-md-12 px-3 d-flex flex-column-gap-1">
  <div
    class="w-45 h-100 rounded-3"
    style="background: url('/assets/images/categories/{category.image}') center center/cover;">
  </div>
  <div class="w-45 h-100 rounded-3 bg-clr-white clr-green-dark p-4">
    <h3 class="fs-body-md fw-semi-bold mb-2">{category.name}</h3>
    {#if category.key_features && category.key_features.length > 0}
      {@const secondaryKeyFeatures = category.key_features.filter(
        (/** @type {{ type_id: Number; }} */ keyFeat) => keyFeat.type_id === 2,
      )}
      {#each secondaryKeyFeatures as categoryFeat, index (categoryFeat.id)}
        <strong class="fs-body-sm">{categoryFeat.label || ''}</strong>

        {#if categoryFeat.text && categoryFeat.text.length > 0}
          <ul
            class="list list-dashed fs-body-sm lh-sm"
            style="padding-left: 10px;">
            {#each categoryFeat.text.split('\n') as text}
              <li>{text}</li>
            {/each}
          </ul>
        {/if}

        {#if index === secondaryKeyFeatures.length - 1 && category.link}
          <a
            href={category.link}
            target="_blank"
            class="btn btn-sm w-35 bg-clr-orange clr-white rounded-pill py-2"
            style="max-width: 200px;">
            Купить
          </a>
        {/if}
      {/each}
    {/if}
  </div>
</div>
