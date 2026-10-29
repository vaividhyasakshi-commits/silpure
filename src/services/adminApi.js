async function request(path, options = {}) {
  const response = await fetch(`/api/${path}`, { credentials: "same-origin", cache: "no-store", ...options });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
}
export const checkAdminSession = () => request("session.php");
export const loginAdmin = (username, password) => request("login.php", {
  method: "POST", headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username, password }),
});
export const logoutAdmin = (csrfToken) => request("logout.php", {
  method: "POST", headers: { "X-CSRF-Token": csrfToken },
});

export const saveProduct = (product, csrfToken) => request('save-product.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
  body: JSON.stringify(product),
});
export const deleteProduct = (id, csrfToken) => request('delete-product.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfToken },
  body: JSON.stringify({ id }),
});
export const uploadProductImage = (image, csrfToken) => {
  const form = new FormData();
  form.append('image', image);
  return request('upload-image.php', {
    method: 'POST', headers: { 'X-CSRF-Token': csrfToken }, body: form,
  });
};
