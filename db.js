const db = {
  data: [
    {
      id: 1,
      name: "Muhammad Adnan Rizqullah",
      phone: "+6285156562419",
      email: "madnanrizqullah@gmail.com",
      address: "Jl Jatimulya No. 15",
      age: 26,
    },
  ],
  getContact(id) {
    return this.data.find((v) => {
      console.log(v);
      console.log(v.id === id);
      return v.id === id;
    });
  },
  getAll() {
    return this.data;
  },
  count() {
    return this.data.length;
  },
  newId() {
    return this.data.length + 1;
  },
  append(contact) {
    this.data = [...this.data, contact];
  },
  update(id, newContact) {
    this.data = this.data.map((v) => {
      if (v.id === id) {
        return {
          id,
          ...newContact,
        };
      } else {
        return v;
      }
    });
  },
};
