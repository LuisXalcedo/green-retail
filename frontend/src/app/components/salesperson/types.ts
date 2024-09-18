type NameCell = {
  label: string;
};

type Name2Cell = {
  label: string;
};

type IdEmployeeCell = {
  label: string;
};

type PhoneCell = {
  label: string;
};

type EmailCell = {
  label: string;
};

export type Item = {
  id: string;
  name: NameCell;
  name2: Name2Cell;
  idEmployee: IdEmployeeCell;
  phone: PhoneCell;
  email: EmailCell;
  id_employee: string;
  index: number;
};

const baseItems = [
  {
    name: { label: "Luis" },
    name2: { label: "Salcedo" },
    idEmployee: { label: "123" },
    phone: { label: "3219895819" },
    email: { label: "luis.e.ss@gmail.com" },
  },
  {
    name: { label: "Ximena" },
    name2: { label: "Salcedo" },
    idEmployee: { label: "678" },
    phone: { label: "3219895819" },
    email: { label: "ximena@gmail.com" },
  },
  {
    name: { label: "Gabriel" },
    name2: { label: "Salcedo" },
    idEmployee: { label: "234" },
    phone: { label: "3219895819" },
    email: { label: "gabriel@gmail.com" },
  },
  {
    name: { label: "Juan" },
    name2: { label: "Salcedo" },
    idEmployee: { label: "345" },
    phone: { label: "3219895819" },
    email: { label: "juan@gmail.com" },
  },
];

export const itemsSample = new Array(1500)
  .fill(0)
  .map((_, i) => ({ ...baseItems[i % baseItems.length], index: i }));
