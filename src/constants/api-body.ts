export const REGISTER_BODY = {
  fullname: 'John Doe',
  email: 'johndoe@example.com',
  password: 'P@ssw0rd123',
};

export const LOGIN_BODY = {
  email: 'johndoe@example.com',
  password: 'P@ssw0rd123',
};

export const USER_BODY = {
  fullname: 'John Doe',
  email: 'johndoe@example.com',
  password: 'P@ssw0rd123',
  business: {
    name: 'XYZ Company',
    description: 'Lorem ipsum dolor sit amet.',
    tagline: 'Lorem ipsum dolor sit amet.',
    email: 'xyz@example.com',
    website: 'http://xyz-company.com',
    phone: '+6285123456789',
    address: 'XYZ Street',
  },
};

export const FORM_BODY = {
  fields: [
    {
      label: 'Name',
      type: 'text',
      required: true,
      options: [],
      order: 1,
    },
  ],
};

export const BOOK_BODY = {
  formData: [
    {
      label: 'Nama',
      value: 'John Doe',
      type: 'text',
    },
    {
      label: 'Tanggal',
      value: '2025-01-29T05:39:57.553Z',
      type: 'date',
    },
    {
      label: 'Pembayaran',
      value: 'Transfer',
      type: 'select',
    },
  ],
};
