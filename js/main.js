function truncate(str, maxlength) {
  return (str.length <= maxlength) ? true : false
}

truncate("Проверка", 140)
