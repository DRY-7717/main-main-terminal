const fs = require("node:fs");
const chalk = require("chalk");
const validator = require("validator");

const dirPath = "./data";
const filePath = "./data/contacts.js";
if (!fs.existsSync(dirPath) && !fs.existsSync(filePath)) {
  fs.mkdirSync("data");
  fs.writeFileSync("data/contacts.json", "[]", "utf-8");
}

const loadContact = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

const simpanContact = (nama, email, noHp) => {
  const contact = {
    nama,
    email,
    noHp,
  };

  const contacts = loadContact();

  const duplikat = contacts.find((contact) => contact.nama === nama);

  if (duplikat) {
    console.log(chalk.red("Contact sudah terdaftar"));
    return false;
  }
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red("email anda tidak valid"));
      return false;
    }
  }

  if (!validator.isMobilePhone(noHp, "id-ID")) {
    console.log(chalk.red("Nomor handphone anda tidak valid"));
    return false;
  }

  contacts.push(contact);
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

  console.log("Terima kasih sudah mengisi kontak anda");
};

const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.blueBright("List contact user:"));
  contacts.forEach((contact, i) => {
    console.log(
      chalk.blue(`${i + 1}.${contact.nama}-${contact.email}-${contact.noHp}`)
    );
  });
};

// Detail contact

const detailContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  if (!contact) {
    console.log(chalk.red(`Daftar contact ${nama} tidak ditemukan!`));
  } else {
    console.log(chalk.blue(`Daftar contact ${nama} ditemukan: `));
    console.log(
      chalk.blue(
        `nama: ${contact.nama} | email: ${
          contact.email ? contact.email : "-"
        } | noHp: ${contact.noHp}`
      )
    );
  }
};

const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContact = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );

  if (contacts.length === newContact.length) {
    console.log(chalk.red(`Daftar contact ${nama} tidak ditemukan!`));
    return false;
  }
  fs.writeFileSync("data/contacts.json", JSON.stringify(newContact));
  console.log(chalk.blue(`Contact ${nama} berhasil di hapus`));
};

module.exports = {
  simpanContact,
  listContact,
  detailContact,
  deleteContact,
};
