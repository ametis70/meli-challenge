const getCategories = (data: MLItemsQuery): string[] =>
  data?.filters
    .find((filter) => filter.id === 'category')
    ?.values[0].path_from_root.map(
      (breadcrumb: { id: string; name: string }) => breadcrumb.name,
    ) ?? []

export default getCategories
