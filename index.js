let db = [
  {
    id: 0,
    name: "Muhammad Adnan Rizqullah",
    phone: "+6285156562419",
    email: "madnanrizqullah@gmail.com",
    address: "Jl Jatimulya No. 15",
    age: 26,
  },
];

const main = () => {
  setupEventListeners();
  renderContactList();
};

const setupEventListeners = () => {
  const addForm = document.getElementById("add-contact-form");
  addForm.addEventListener("submit", addContact);
};

const addContact = (e) => {
  e.preventDefault();

  const addForm = document.getElementById("add-contact-form");

  const contactData = new FormData(addForm);

  db = [
    ...db,
    {
      id: db.length + 1,
      name: contactData.get("name"),
      phone: contactData.get("phone"),
      email: contactData.get("email"),
      address: contactData.get("address"),
      age: contactData.get("age"),
    },
  ];

  addForm.reset();

  renderContactList();
};

const renderContactList = () => {
  const listContainer = document.getElementById("contacts_list");
  listContainer.innerHTML = "";

  if (db.length === 0) {
    listContainer.appendChild(
      document
        .createElement("p")
        .appendChild(document.createTextNode("No contacts yet..."))
    );
  }

  const list = document.createElement("ol");

  db.forEach((row) => {
    const contact = document.createElement("li");
    const contactInfo = document.createElement("ul");

    Object.entries(row).forEach(([key, value]) => {
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

      contactInfo.appendChild(contactProperty);
    });

    list.appendChild(contact.appendChild(contactInfo));
  });

  listContainer.appendChild(list);
};

const upperCaseFirstLetter = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1);

document.addEventListener("DOMContentLoaded", main);
