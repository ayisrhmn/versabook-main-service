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
