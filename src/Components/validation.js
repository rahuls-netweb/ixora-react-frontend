export function EmailPattern() {
  const email =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email;
}
export function NamePattern() {
  const name = /^[a-zA-Z]/;
  return name;
}
export function PhonePattern() {
  const phone = /^[\+]?[(]?[0-9]{2}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}$/;
  return phone;
}
