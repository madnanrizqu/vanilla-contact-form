const db = {
  data: (newData) => {
    if (newData) {
      localStorage.setItem("data", JSON.stringify(newData));
      return newData;
    }

    return localStorage.getItem("data")
      ? JSON.parse(localStorage.getItem("data"))
      : [];
  },
  searchByName(name) {
    return this.data().filter((v) => {
      return v.name.toUpperCase().indexOf(name.toUpperCase()) > -1;
    });
  },
  getContact(id) {
    return this.data().find((v) => {
      return v.id === id;
    });
  },
  getAll() {
    return this.data();
  },
  count() {
    return this.data().length;
  },
  newId() {
    return this.data().length + 1;
  },
  append(contact) {
    this.data([...this.data(), contact]);
  },
  update(id, newContact) {
    this.data(
      this.data().map((v) => {
        if (v.id === id) {
          return {
            id,
            ...newContact,
          };
        } else {
          return v;
        }
      })
    );
  },
  delete(id) {
    const data = [...this.data()];
    const index = data.findIndex((v) => v.id === id);
    data.splice(index, 1);

    this.data(data);
  },
};
