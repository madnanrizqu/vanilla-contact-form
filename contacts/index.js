const main = () => {
  const id = getIdFromSearchParams();

  renderId(id);

  renderContact(id);
};

const getIdFromSearchParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const contactId = urlParams.get("id");

  return Number(contactId);
};

const renderId = (id) => {
  const label = document.getElementById("contact-id-label");
  label.appendChild(document.createTextNode(id));
};

const renderContact = (id) => {
  const contact = document.getElementById("contact");
  contact.innerHTML = "";

  const contactData = db.getContact(id);
  if (!contactData) {
    contact.appendChild(document.createTextNode("Contact does not exists..."));
  }

  Object.entries(contactData).forEach(([key, value]) => {
    if (key === "id") {
      return;
    }

    const contactProperty = document.createElement("div");

    const label = document
      .createElement("span")
      .appendChild(document.createTextNode(`${upperCaseFirstLetter(key)}: `));
    const valueText = document
      .createElement("span")
      .appendChild(document.createTextNode(value));

    contactProperty.appendChild(label);
    contactProperty.appendChild(valueText);

    contact.appendChild(contactProperty);
  });

  const updateButton = document.createElement("button");
  const updateButtonText = document.createTextNode("Update");
  updateButton.appendChild(updateButtonText);
  updateButton.addEventListener("click", () => showUpdateForm(contactData));

  contact.appendChild(updateButton);
};

const showUpdateForm = (contactData) => {
  const contact = document.getElementById("contact");
  contact.classList.add("hidden");

  const formContainer = document.getElementById("form-container");
  formContainer.classList.remove("hidden");

  const cancelUpdateBtn = document.getElementById("cancel-update");
  cancelUpdateBtn.addEventListener("click", handleCancelUpdate);

  const form = document.getElementById("update-contact-form");
  Object.entries(contactData).forEach(([key, value]) => {
    if (key === "id") {
      return;
    }

    form[key].value = value;
  });

  form.addEventListener("submit", (e) => handleUpdate(e, form));
};

const handleCancelUpdate = () => {
  hideFormShowDetail();
};

const handleUpdate = (e, form) => {
  e.preventDefault();

  const contactData = new FormData(form);

  db.update(getIdFromSearchParams(), {
    name: contactData.get("name"),
    phone: contactData.get("phone"),
    email: contactData.get("email"),
    address: contactData.get("address"),
    age: contactData.get("age"),
  });

  renderContact(getIdFromSearchParams());

  hideFormShowDetail();
};

const hideFormShowDetail = () => {
  const contact = document.getElementById("contact");
  contact.classList.remove("hidden");

  const formContainer = document.getElementById("form-container");
  formContainer.classList.add("hidden");
};

const upperCaseFirstLetter = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1);

document.addEventListener("DOMContentLoaded", main);
