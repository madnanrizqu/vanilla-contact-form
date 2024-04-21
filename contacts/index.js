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
};

const upperCaseFirstLetter = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1);

document.addEventListener("DOMContentLoaded", main);
