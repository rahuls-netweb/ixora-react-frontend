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
  const phone = /^[0-9]+$/;
  return phone;
}
