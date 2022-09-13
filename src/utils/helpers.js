export function getPaginatedRecordNumber({
  page = 1,
  index = 0,
  per_page = 10,
}) {
  return per_page * page - per_page + index + 1;
}
