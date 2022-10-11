export function getPaginatedRecordNumber({
  page = 1,
  index = 0,
  per_page = 10,
}) {
  return per_page * page - per_page + index + 1;
}


export const resetFormOptions = {
  shouldDirty: true,
  shouldTouch: true,
  shouldValidate: true
}

export function resetReactHookFormValues(values = {}, setValue = () => { }) {
  Object.entries(values).forEach(([key, value]) => {
    setValue(key, value, resetFormOptions)
  })
}

export const getUndefinedText = text => text || 'N/A';