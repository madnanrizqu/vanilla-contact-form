const db = [
  {
    name: "Muhammad Adnan Rizqullah",
    phone: "+6285156562419",
    email: "madnanrizqullah@gmail.com",
    address: "Jl Jatimulya No. 15",
    age: 26,
  },
];

const main = () => {
  renderContactList();
};

const renderContactList = () => {
  const listContainer = document.getElementById("contacts_list");

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
