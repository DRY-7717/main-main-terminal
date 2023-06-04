// mengambil argumen dari command line
const {
  simpanContact,
  listContact,
  detailContact,
  deleteContact,
} = require("./contacts");


const yargs = require("yargs");

yargs
  .command({
    command: "add",
    describe: "menambahkan contact baru",
    builder: {
      nama: {
        describe: "Nama lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
      noHp: {
        describe: "Nomor Handphone",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      simpanContact(argv.nama, argv.email, argv.noHp);
    },
  })
  .demandCommand();

yargs.command({
  command: "list",
  describe: "menampilkan semua list contact",
  handler() {
    listContact();
  },
});

// Detail contact

yargs.command({
  command: "detail",
  describe: "menampilkan semua detail contact user berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    detailContact(argv.nama);
  },
});

// delete contact

yargs.command({
  command: "delete",
  describe: "menghapus contact user berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    deleteContact(argv.nama);
  },
});

yargs.parse();
