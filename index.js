const main = () => {
  setupEventListeners();
  renderContactList(db.getAll());
};

const setupEventListeners = () => {
  const addForm = document.getElementById("add-contact-form");
  addForm.addEventListener("submit", addContact);

  const searchForm = document.getElementById("search-form");
  searchForm.addEventListener("submit", handleSearch);

  const resetSearchBtn = document.getElementById("reset-search");
  resetSearchBtn.addEventListener("click", handleResetSearch);
};

const addContact = (e) => {
  e.preventDefault();

  const addForm = document.getElementById("add-contact-form");

  const contactData = new FormData(addForm);

  db.append({
    id: db.newId(),
    name: contactData.get("name"),
    phone: contactData.get("phone"),
    email: contactData.get("email"),
    address: contactData.get("address"),
    age: contactData.get("age"),
  });

  addForm.reset();

  renderContactList(db.getAll());
};

const handleSearch = (e) => {
  e.preventDefault();

  const searchForm = document.getElementById("search-form");

  const searchData = new FormData(searchForm);

  renderContactList(db.searchByName(searchData.get("name")));
};

const handleResetSearch = () => {
  const searchForm = document.getElementById("search-form");
  searchForm.name.value = "";

  renderContactList(db.getAll());
};

const renderContactList = (contactList) => {
  const listContainer = document.getElementById("contacts_list");
  listContainer.innerHTML = "";

  if (contactList.length === 0) {
    listContainer.appendChild(
      document
        .createElement("p")
        .appendChild(document.createTextNode("No contacts yet..."))
    );
  }

  const list = document.createElement("ol");
  list.classList.add("flex");
  list.classList.add("flex-col");
  list.classList.add("gap-4");

  const hiddenProperties = ["id", "email", "address", "age"];
  contactList.forEach((row) => {
    const contact = document.createElement("li");
    const contactInfo = document.createElement("ul");

    Object.entries(row).forEach(([key, value]) => {
      if (hiddenProperties.includes(key)) {
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

      contactInfo.appendChild(contactProperty);
    });

    const detailLink = document.createElement("a");
    const detailLinkText = document.createTextNode("Detail");
    detailLink.appendChild(detailLinkText);
    detailLink.href = `/contacts/?id=${row.id}`;
    detailLink.className = "hover:underline";

    const deleteButton = document.createElement("button");
    const deleteButtonText = document.createTextNode("Delete");
    deleteButton.appendChild(deleteButtonText);
    deleteButton.className = "hover:underline";
    deleteButton.addEventListener("click", () => handleDelete(row.id));

    const footer = document.createElement("footer");
    footer.appendChild(detailLink);
    footer.appendChild(deleteButton);
    footer.className = "flex gap-2 items-center";

    contactInfo.appendChild(footer);

    list.appendChild(contact.appendChild(contactInfo));
  });

  listContainer.appendChild(list);
};

const upperCaseFirstLetter = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1);

const handleDelete = (id) => {
  db.delete(id);
  renderContactList(db.getAll());
};

document.addEventListener("DOMContentLoaded", main);
